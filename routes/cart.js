const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { getCart, clearCart, updateCart } = require('../storage');

// Get cart
router.get('/', (req, res) => {
  const sessionId = req.headers['session-id'] || 'default';
  res.json(getCart(sessionId));
});

// Add item to cart
router.post('/add', async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const sessionId = req.headers['session-id'] || 'default';
    
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }
    
    // Fetch product details
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    if (!product.isAvailable || product.stock < quantity) {
      return res.status(400).json({ message: 'Product not available in requested quantity' });
    }
    
    // Get current cart
    const cart = getCart(sessionId);
    
    // Check if product already in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.product._id.toString() === productId
    );
    
    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].subtotal = 
        cart.items[existingItemIndex].quantity * product.price;
    } else {
      // Add new item
      cart.items.push({
        product: {
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.image
        },
        quantity,
        subtotal: product.price * quantity
      });
    }
    
    // Calculate total
    cart.total = cart.items.reduce(
      (sum, item) => sum + item.subtotal, 0
    );
    
    // Update cart in storage
    updateCart(sessionId, cart);
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update cart item quantity
router.put('/update', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const sessionId = req.headers['session-id'] || 'default';
    
    if (!productId || quantity === undefined) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }
    
    const cart = getCart(sessionId);
    
    const itemIndex = cart.items.findIndex(
      item => item.product._id.toString() === productId
    );
    
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    
    if (quantity <= 0) {
      // Remove item
      cart.items.splice(itemIndex, 1);
    } else {
      // Update quantity
      cart.items[itemIndex].quantity = quantity;
      cart.items[itemIndex].subtotal = 
        quantity * cart.items[itemIndex].product.price;
    }
    
    // Recalculate total
    cart.total = cart.items.reduce(
      (sum, item) => sum + item.subtotal, 0
    );
    
    // Update cart in storage
    updateCart(sessionId, cart);
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Remove item from cart
router.delete('/remove/:productId', (req, res) => {
  try {
    const { productId } = req.params;
    const sessionId = req.headers['session-id'] || 'default';
    
    const cart = getCart(sessionId);
    
    const itemIndex = cart.items.findIndex(
      item => item.product._id.toString() === productId
    );
    
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    
    cart.items.splice(itemIndex, 1);
    
    // Recalculate total
    cart.total = cart.items.reduce(
      (sum, item) => sum + item.subtotal, 0
    );
    
    // Update cart in storage
    updateCart(sessionId, cart);
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Clear cart
router.delete('/clear', (req, res) => {
  const sessionId = req.headers['session-id'] || 'default';
  clearCart(sessionId);
  res.json({ message: 'Cart cleared successfully' });
});

module.exports = { router, getCart, clearCart }; 