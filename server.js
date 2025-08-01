const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { execSync } = require('child_process');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection with better error handling
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://admin:admin123456@cluster0.va2y2ff.mongodb.net/garden-cicekcilik?retryWrites=true&w=majority&appName=Cluster0';
    console.log('Attempting to connect to MongoDB...');
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    // Don't exit in production, let the app continue
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }
};

// Set default environment variables for mock values
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'mock-jwt-secret-key-2024';
  console.log('Using mock JWT_SECRET');
}

if (!process.env.IYZICO_API_KEY) {
  process.env.IYZICO_API_KEY = 'sandbox-afXhZPW0MQlE4dCUUlHcEopnMBgXnAZI';
  console.log('Using mock IYZICO_API_KEY');
}

if (!process.env.IYZICO_SECRET_KEY) {
  process.env.IYZICO_SECRET_KEY = 'sandbox-wbwpzKJDmlBmGdO6JYXrlIYHqYJqbU1q';
  console.log('Using mock IYZICO_SECRET_KEY');
}

// Initialize database connection
connectDB();

const db = mongoose.connection;
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});
db.once('open', () => {
  console.log('MongoDB connection established');
});

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/cart', require('./routes/cart').router);
app.use('/api/orders', require('./routes/orders'));
app.use('/api/auth', require('./routes/auth').router);
app.use('/api/payment', require('./routes/payment'));

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Serve static assets if in production
if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
  console.log('Running in production/Vercel mode');
  
  // Build React app if build doesn't exist
  try {
    const buildPath = path.join(__dirname, 'client/build');
    if (!require('fs').existsSync(buildPath)) {
      console.log('Building React app...');
      execSync('cd client && npm install && npm run build', { stdio: 'inherit' });
    }
  } catch (error) {
    console.error('Build error:', error);
  }
  
  // Serve static files from React build
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
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