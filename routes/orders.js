const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { body, validationResult } = require('express-validator');
const { getCart, clearCart } = require('../storage');

// Create order
router.post('/', [
  body('customerInfo.name').notEmpty().withMessage('Customer name is required'),
  body('customerInfo.email').isEmail().withMessage('Valid email is required'),
  body('customerInfo.phone').notEmpty().withMessage('Phone number is required'),
  body('paymentMethod').notEmpty().withMessage('Payment method is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { customerInfo, paymentMethod, notes } = req.body;
    const sessionId = req.headers['session-id'] || 'default';
    
    // Get cart from storage
    const cartData = getCart(sessionId);
    
    if (!cartData || cartData.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }
    
    // Validate stock availability
    for (const item of cartData.items) {
      const product = await Product.findById(item.product._id);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${product ? product.name : 'product'}` 
        });
      }
    }
    
    // Generate order number
    const orderNumber = 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
    
    // Create order
    const order = new Order({
      orderNumber,
      customerInfo,
      items: cartData.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price
      })),
      totalAmount: cartData.total,
      paymentMethod,
      notes
    });
    
    await order.save();
    
    // Update product stock
    for (const item of cartData.items) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { stock: -item.quantity }
      });
    }
    
    // Clear cart
    clearCart(sessionId);
    
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all orders (Admin only)
router.get('/', async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    let query = {};
    if (status) {
      query.status = status;
    }
    
    const skip = (page - 1) * limit;
    
    const orders = await Order.find(query)
      .populate('items.product', 'name image')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Order.countDocuments(query);
    
    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Track order by order number or ID
router.get('/track/:orderNumber', async (req, res) => {
  try {
    const { orderNumber } = req.params;
    
    // Try to find by orderNumber first
    let order = await Order.findOne({ orderNumber })
      .populate('items.product', 'name image price');
    
    // If not found by orderNumber, try to find by _id
    if (!order) {
      order = await Order.findById(orderNumber)
        .populate('items.product', 'name image price');
    }
    
    if (!order) {
      return res.status(404).json({ message: 'Sipariş bulunamadı' });
    }
    
    // Format order for tracking
    const trackingOrder = {
      orderNumber: order.orderNumber || order._id.toString(),
      createdAt: order.createdAt,
      total: order.totalAmount,
      status: order.status,
      items: order.items.map(item => ({
        product: {
          name: item.product.name,
          image: item.product.image,
          price: item.product.price
        },
        quantity: item.quantity,
        price: item.price
      })),
      shippingAddress: {
        name: order.customerInfo.name,
        phone: order.customerInfo.phone,
        address: order.customerInfo.address?.street || '',
        city: order.customerInfo.address?.city || ''
      }
    };
    
    res.json(trackingOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name image price');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update order status (Admin only)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('items.product', 'name image price');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete order (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Restore product stock if order is not cancelled
    if (order.status !== 'cancelled') {
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: item.quantity }
        });
      }
    }
    
    await Order.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update payment status (Admin only)
router.put('/:id/payment', async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    
    if (!['pending', 'completed', 'failed'].includes(paymentStatus)) {
      return res.status(400).json({ message: 'Invalid payment status' });
    }
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 