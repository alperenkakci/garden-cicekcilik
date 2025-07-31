import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaCreditCard, FaMoneyBillWave, FaTruck, FaLock } from 'react-icons/fa';

const Checkout = ({ cart, clearCart }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Türkiye'
    },
    paymentMethod: 'credit_card',
    notes: ''
  });

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Lütfen tüm zorunlu alanları doldurun');
      return;
    }

    if (cart.items.length === 0) {
      toast.error('Sepetiniz boş');
      return;
    }

    setLoading(true);
    try {
      const sessionId = localStorage.getItem('sessionId');
      
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'session-id': sessionId
        },
        body: JSON.stringify({
          customerInfo: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address
          },
          paymentMethod: formData.paymentMethod,
          notes: formData.notes
        })
      });

      if (response.ok) {
        const order = await response.json();
        // Ödeme sayfasına yönlendir
        navigate(`/payment?orderId=${order._id}`);
      } else {
        const error = await response.json();
        toast.error(error.message || 'Sipariş oluşturulurken hata oluştu');
      }
    } catch (error) {
      toast.error('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  if (cart.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#333' }}>
            Ödeme
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            Siparişinizi tamamlamak için bilgilerinizi girin
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px'
        }}>
          {/* Checkout Form */}
          <div>
            <div style={{ 
              background: 'white', 
              padding: '30px', 
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <form onSubmit={handleSubmit}>
                {/* Customer Information */}
                <h3 style={{ marginBottom: '20px', color: '#333' }}>Müşteri Bilgileri</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Ad Soyad *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">E-posta *</label>
                    <input
                      type="email"
                      className="form-input"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Telefon *</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>

                {/* Address Information */}
                <h3 style={{ marginBottom: '20px', color: '#333', marginTop: '30px' }}>Teslimat Adresi</h3>
                
                <div className="form-group">
                  <label className="form-label">Adres</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.address.street}
                    onChange={(e) => handleInputChange('address.street', e.target.value)}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Şehir</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.address.city}
                      onChange={(e) => handleInputChange('address.city', e.target.value)}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">İlçe</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.address.state}
                      onChange={(e) => handleInputChange('address.state', e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Posta Kodu</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.address.zipCode}
                      onChange={(e) => handleInputChange('address.zipCode', e.target.value)}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Ülke</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.address.country}
                      onChange={(e) => handleInputChange('address.country', e.target.value)}
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <h3 style={{ marginBottom: '20px', color: '#333', marginTop: '30px' }}>Ödeme Yöntemi</h3>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit_card"
                      checked={formData.paymentMethod === 'credit_card'}
                      onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                      style={{ marginRight: '10px' }}
                    />
                    <FaCreditCard style={{ marginRight: '8px', color: '#4CAF50' }} />
                    Kredi Kartı
                  </label>
                  
                  <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash_on_delivery"
                      checked={formData.paymentMethod === 'cash_on_delivery'}
                      onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                      style={{ marginRight: '10px' }}
                    />
                    <FaMoneyBillWave style={{ marginRight: '8px', color: '#4CAF50' }} />
                    Kapıda Ödeme
                  </label>
                </div>

                {/* Notes */}
                <div className="form-group">
                  <label className="form-label">Sipariş Notları</label>
                  <textarea
                    className="form-input form-textarea"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Özel istekleriniz varsa buraya yazabilirsiniz..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                  style={{ 
                    width: '100%', 
                    padding: '15px',
                    fontSize: '1.1rem',
                    marginTop: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  {loading ? (
                    <>
                      <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
                      Sipariş Oluşturuluyor...
                    </>
                  ) : (
                    <>
                      <FaLock />
                      Siparişi Tamamla
                    </>
                  )}
                </button>
              </form>
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
              
              {/* Cart Items */}
              <div style={{ marginBottom: '20px' }}>
                {cart.items.map((item) => (
                  <div key={item.product._id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 0',
                    borderBottom: '1px solid #eee'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                      <div>
                        <p style={{ fontWeight: '500', margin: '0' }}>{item.product.name}</p>
                        <p style={{ fontSize: '0.9rem', color: '#666', margin: '0' }}>
                          {item.quantity} adet
                        </p>
                      </div>
                    </div>
                    <span style={{ fontWeight: '600', color: '#4CAF50' }}>
                      ₺{item.subtotal.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Summary */}
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

              {/* Security Info */}
              <div style={{ 
                padding: '15px', 
                background: '#f8f9fa', 
                borderRadius: '8px',
                fontSize: '0.9rem',
                color: '#666'
              }}>
                <p style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <FaLock style={{ marginRight: '8px', color: '#4CAF50' }} />
                  Güvenli ödeme
                </p>
                <p style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <FaTruck style={{ marginRight: '8px', color: '#4CAF50' }} />
                  Hızlı teslimat
                </p>
                <p style={{ display: 'flex', alignItems: 'center' }}>
                  <FaCreditCard style={{ marginRight: '8px', color: '#4CAF50' }} />
                  SSL korumalı
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 