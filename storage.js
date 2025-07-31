// In-memory storage for cart and orders (production'da Redis kullanılmalı)
let carts = {};
let orders = [];

// Helper functions for cart operations
const getCart = (sessionId) => {
  if (!carts[sessionId]) {
    carts[sessionId] = { items: [], total: 0 };
  }
  return carts[sessionId];
};

const clearCart = (sessionId) => {
  carts[sessionId] = { items: [], total: 0 };
};

const updateCart = (sessionId, cartData) => {
  carts[sessionId] = cartData;
};

module.exports = { 
  carts, 
  orders, 
  getCart, 
  clearCart, 
  updateCart 
}; 