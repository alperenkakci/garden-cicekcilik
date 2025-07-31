const mongoose = require('mongoose');
const Order = require('./models/Order');
const Product = require('./models/Product');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/garden-cicekcilik', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const createTestOrder = async () => {
  try {
    console.log('Creating test order...');
    
    // Get a product for the test order
    const product = await Product.findOne();
    
    if (!product) {
      console.log('No products found. Please add products first.');
      process.exit(1);
    }
    
    const orderNumber = 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
    
    const testOrder = new Order({
      orderNumber: orderNumber,
      customerInfo: {
        name: 'Test Müşteri',
        email: 'test@example.com',
        phone: '0555 123 45 67',
        address: {
          street: 'Test Sokak No:1',
          city: 'İstanbul',
          state: 'İstanbul',
          zipCode: '34000',
          country: 'Türkiye'
        }
      },
      items: [{
        product: product._id,
        quantity: 2,
        price: product.price
      }],
      totalAmount: product.price * 2,
      paymentMethod: 'credit_card',
      status: 'processing',
      paymentStatus: 'completed',
      notes: 'Test siparişi'
    });
    
    await testOrder.save();
    
    console.log('Test order created successfully!');
    console.log('Order Number:', orderNumber);
    console.log('Order ID:', testOrder._id);
    console.log('You can use this order number to test the tracking feature.');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating test order:', error);
    process.exit(1);
  }
};

createTestOrder(); 