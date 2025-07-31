import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import Header from './components/Header';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderTracking from './pages/OrderTracking';
import Admin from './pages/Admin';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Payment from './pages/Payment';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
import './App.css';

function App() {
  const [cart, setCart] = useState({ items: [], total: 0 });

  // Generate session ID for cart
  const sessionId = localStorage.getItem('sessionId') || 
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  
  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart', {
        headers: {
          'session-id': sessionId
        }
      });
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };
  
  useEffect(() => {
    localStorage.setItem('sessionId', sessionId);
    fetchCart();
  }, [sessionId]);

  const addToCart = async (productId, quantity = 1) => {
    try {
      setLoading(true);
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'session-id': sessionId
        },
        body: JSON.stringify({ productId, quantity })
      });

      if (response.ok) {
        const updatedCart = await response.json();
        setCart(updatedCart);
        toast.success('Ürün sepete eklendi!');
      } else {
        const error = await response.json();
        toast.error(error.message || 'Ürün sepete eklenirken hata oluştu');
      }
    } catch (error) {
      toast.error('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      const response = await fetch('/api/cart/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'session-id': sessionId
        },
        body: JSON.stringify({ productId, quantity })
      });

      if (response.ok) {
        const updatedCart = await response.json();
        setCart(updatedCart);
        if (quantity <= 0) {
          toast.success('Ürün sepetten kaldırıldı');
        } else {
          toast.success('Sepet güncellendi');
        }
      } else {
        const error = await response.json();
        toast.error(error.message || 'Sepet güncellenirken hata oluştu');
      }
    } catch (error) {
      toast.error('Bir hata oluştu');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`/api/cart/remove/${productId}`, {
        method: 'DELETE',
        headers: {
          'session-id': sessionId
        }
      });

      if (response.ok) {
        const updatedCart = await response.json();
        setCart(updatedCart);
        toast.success('Ürün sepetten kaldırıldı');
      } else {
        const error = await response.json();
        toast.error(error.message || 'Ürün kaldırılırken hata oluştu');
      }
    } catch (error) {
      toast.error('Bir hata oluştu');
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch('/api/cart/clear', {
        method: 'DELETE',
        headers: {
          'session-id': sessionId
        }
      });

      if (response.ok) {
        setCart({ items: [], total: 0 });
        toast.success('Sepet temizlendi');
      } else {
        toast.error('Sepet temizlenirken hata oluştu');
      }
    } catch (error) {
      toast.error('Bir hata oluştu');
    }
  };

  // Cart context removed as it's not being used

  return (
    <div className="App">
      <Header cart={cart} />
      <TopBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
          <Route path="/cart" element={
            <Cart 
              cart={cart}
              updateCartItem={updateCartItem}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
          } />
          <Route path="/checkout" element={
            <Checkout 
              cart={cart}
              clearCart={clearCart}
            />
          } />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
          <Route path="/order-tracking" element={<OrderTracking />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/failed" element={<PaymentFailed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      
      {/* Fixed Order Tracking Button */}
      <Link to="/order-tracking" className="fixed-order-tracking-btn">
        <FaSearch />
        <span>Sipariş Takibi</span>
      </Link>
    </div>
  );
}

export default App; 