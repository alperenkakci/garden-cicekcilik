const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://admin:admin123456@cluster0.va2y2ff.mongodb.net/garden-cicekcilik?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB connected successfully');
});

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/cart', require('./routes/cart').router);
app.use('/api/orders', require('./routes/orders'));
app.use('/api/auth', require('./routes/auth').router);
app.use('/api/payment', require('./routes/payment'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
  // In Vercel, static files are served automatically
  // We only need to handle API routes
  console.log('Running in production/Vercel mode');
}

const PORT = process.env.PORT || 5000;

// For Vercel, export the app
if (process.env.VERCEL) {
  module.exports = app;
} else {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Database connected successfully!');
  });
} 