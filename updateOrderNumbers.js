const mongoose = require('mongoose');
const Order = require('./models/Order');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/garden-cicekcilik', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const updateOrderNumbers = async () => {
  try {
    console.log('Updating order numbers...');
    
    // Find orders without orderNumber
    const orders = await Order.find({ orderNumber: { $exists: false } });
    
    console.log(`Found ${orders.length} orders without order numbers`);
    
    for (const order of orders) {
      const orderNumber = 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
      
      await Order.findByIdAndUpdate(order._id, {
        orderNumber: orderNumber
      });
      
      console.log(`Updated order ${order._id} with order number: ${orderNumber}`);
    }
    
    console.log('Order numbers updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating order numbers:', error);
    process.exit(1);
  }
};

updateOrderNumbers(); 