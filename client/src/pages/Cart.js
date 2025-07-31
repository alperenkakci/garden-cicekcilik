import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';

const Cart = ({ cart, updateCartItem, removeFromCart, clearCart }) => {
  const handleQuantityChange = (productId, newQuantity) => {
    updateCartItem(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleClearCart = () => {
    if (window.confirm('Sepeti temizlemek istediğinizden emin misiniz?')) {
      clearCart();
    }
  };

  if (cart.items.length === 0) {
    return (
      <div style={{ padding: '40px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <FaShoppingCart style={{ 
              fontSize: '4rem', 
              color: '#ddd', 
              marginBottom: '20px' 
            }} />
            <h2 style={{ color: '#666', marginBottom: '20px' }}>Sepetiniz Boş</h2>
            <p style={{ color: '#999', marginBottom: '30px' }}>
              Sepetinizde henüz ürün bulunmuyor. Ürünlerimizi keşfetmeye başlayın!
            </p>
            <Link to="/products" className="btn btn-primary">
              Ürünlere Göz At
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#333' }}>
            Sepetim
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            {cart.items.length} ürün sepetinizde
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '40px'
        }}>
          {/* Cart Items */}
          <div>
            <div style={{ 
              background: 'white', 
              borderRadius: '12px', 
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }}>
              {cart.items.map((item) => (
                <div key={item.product._id} className="cart-item">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    className="cart-item-image"
                  />
                  
                  <div className="cart-item-info">
                    <h3 className="cart-item-title">{item.product.name}</h3>
                    <p className="cart-item-price">₺{item.product.price.toFixed(2)}</p>
                  </div>

                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="quantity-input"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.product._id, parseInt(e.target.value) || 1)}
                      min="1"
                    />
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <div style={{ textAlign: 'right', minWidth: '100px' }}>
                    <p style={{ fontWeight: '600', color: '#4CAF50', marginBottom: '5px' }}>
                      ₺{item.subtotal.toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleRemoveItem(item.product._id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#f44336',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <FaTrash />
                      Kaldır
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Actions */}
            <div style={{ 
              marginTop: '20px', 
              display: 'flex', 
              gap: '15px',
              justifyContent: 'space-between'
            }}>
              <Link to="/products" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaArrowLeft />
                Alışverişe Devam Et
              </Link>
              
              <button 
                onClick={handleClearCart}
                className="btn btn-secondary"
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <FaTrash />
                Sepeti Temizle
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div style={{ 
              background: 'white', 
              padding: '30px', 
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              position: 'sticky',
              top: '100px'
            }}>
              <h3 style={{ marginBottom: '20px', color: '#333' }}>Sipariş Özeti</h3>
              
              <div style={{ marginBottom: '20px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '10px' 
                }}>
                  <span>Ara Toplam:</span>
                  <span>₺{cart.total.toFixed(2)}</span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '10px' 
                }}>
                  <span>Kargo:</span>
                  <span style={{ color: '#4CAF50' }}>Ücretsiz</span>
                </div>
                <hr style={{ margin: '15px 0', border: 'none', borderTop: '1px solid #eee' }} />
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  color: '#4CAF50'
                }}>
                  <span>Toplam:</span>
                  <span>₺{cart.total.toFixed(2)}</span>
                </div>
              </div>

              <Link 
                to="/checkout" 
                className="btn btn-primary"
                style={{ 
                  width: '100%', 
                  padding: '15px',
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <FaShoppingCart />
                Ödemeye Geç
              </Link>

              <div style={{ 
                marginTop: '20px', 
                padding: '15px', 
                background: '#f8f9fa', 
                borderRadius: '8px',
                fontSize: '0.9rem',
                color: '#666'
              }}>
                <p style={{ marginBottom: '8px' }}>✓ Güvenli ödeme</p>
                <p style={{ marginBottom: '8px' }}>✓ Hızlı teslimat</p>
                <p>✓ 7/24 müşteri desteği</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 