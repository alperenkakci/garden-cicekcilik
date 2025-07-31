import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCreditCard, FaLock, FaShieldAlt, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentUrl, setPaymentUrl] = useState('');
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // URL'den sipariş verilerini al
    const params = new URLSearchParams(location.search);
    const orderId = params.get('orderId');
    
    if (orderId) {
      fetchOrderData(orderId);
    } else {
      setError('Sipariş bilgisi bulunamadı');
    }
  }, [location]);

  const fetchOrderData = async (orderId) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`);
      if (response.ok) {
        const data = await response.json();
        setOrderData(data);
      } else {
        setError('Sipariş bulunamadı');
      }
    } catch (error) {
      setError('Sipariş bilgileri yüklenirken hata oluştu');
    }
  };

  const initiatePayment = async () => {
    if (!orderData) return;

    setLoading(true);
    setError('');

    try {
      const paymentData = {
        orderId: orderData._id,
        totalAmount: orderData.totalAmount,
        customerName: orderData.customerInfo.name,
        customerEmail: orderData.customerInfo.email,
        customerPhone: orderData.customerInfo.phone,
        shippingAddress: `${orderData.customerInfo.address.street}, ${orderData.customerInfo.address.city}`,
        items: orderData.items.map(item => ({
          _id: item.product._id,
          name: item.product.name,
          price: item.price,
          quantity: item.quantity
        }))
      };

      const response = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });

      const result = await response.json();

      if (result.success) {
        // iyzico ödeme sayfasına yönlendir
        window.location.href = result.paymentPageUrl;
      } else {
        setError(result.message || 'Ödeme başlatılamadı');
      }
    } catch (error) {
      setError('Ödeme başlatılırken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (!orderData) {
    return (
      <div style={{ padding: '40px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <div className="spinner"></div>
            <p className="loading-text">Sipariş bilgileri yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 0', background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)' }}>
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '10px' }}>
              💳 Ödeme
            </h1>
            <p style={{ color: '#666', fontSize: '1.1rem' }}>
              Siparişinizi tamamlamak için güvenli ödeme sayfasına yönlendirileceksiniz
            </p>
          </div>

          {/* Order Summary */}
          <div style={{ 
            background: 'white', 
            borderRadius: '20px', 
            padding: '30px', 
            marginBottom: '30px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)'
          }}>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>Sipariş Özeti</h2>
            
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#666', fontSize: '1rem', marginBottom: '10px' }}>Müşteri Bilgileri</h3>
              <p><strong>Ad Soyad:</strong> {orderData.customerInfo.name}</p>
              <p><strong>E-posta:</strong> {orderData.customerInfo.email}</p>
              <p><strong>Telefon:</strong> {orderData.customerInfo.phone}</p>
              <p><strong>Adres:</strong> {orderData.customerInfo.address.street}, {orderData.customerInfo.address.city}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#666', fontSize: '1rem', marginBottom: '10px' }}>Sipariş Ürünleri</h3>
              {orderData.items.map((item, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: '1px solid #f0f0f0'
                }}>
                  <div>
                    <p style={{ fontWeight: '600', margin: '0' }}>{item.product.name}</p>
                    <p style={{ color: '#666', fontSize: '0.9rem', margin: '0' }}>
                      Adet: {item.quantity}
                    </p>
                  </div>
                  <p style={{ fontWeight: '600', color: '#4CAF50' }}>
                    ₺{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ 
              borderTop: '2px solid #4CAF50', 
              paddingTop: '20px',
              textAlign: 'right'
            }}>
              <h2 style={{ color: '#4CAF50', margin: '0' }}>
                Toplam: ₺{calculateTotal(orderData.items).toFixed(2)}
              </h2>
            </div>
          </div>

          {/* Payment Security Info */}
          <div style={{ 
            background: 'white', 
            borderRadius: '20px', 
            padding: '30px', 
            marginBottom: '30px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)'
          }}>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>Güvenli Ödeme</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <FaShieldAlt style={{ fontSize: '2rem', color: '#4CAF50', marginBottom: '10px' }} />
                <h4>SSL Güvenlik</h4>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                  256-bit SSL şifreleme ile korunur
                </p>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <FaLock style={{ fontSize: '2rem', color: '#4CAF50', marginBottom: '10px' }} />
                <h4>Güvenli Ödeme</h4>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                  iyzico ile güvenli ödeme
                </p>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <FaCreditCard style={{ fontSize: '2rem', color: '#4CAF50', marginBottom: '10px' }} />
                <h4>Kart Bilgileri</h4>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                  Kart bilgileriniz saklanmaz
                </p>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div style={{ 
              background: '#f8d7da', 
              color: '#721c24', 
              padding: '15px', 
              borderRadius: '10px', 
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <FaTimesCircle />
              {error}
            </div>
          )}

          {/* Payment Button */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={initiatePayment}
              disabled={loading}
              className="btn btn-primary"
              style={{ 
                fontSize: '1.2rem', 
                padding: '18px 40px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              {loading ? (
                <>
                  <FaSpinner className="spinner" style={{ width: '20px', height: '20px' }} />
                  Ödeme Hazırlanıyor...
                </>
              ) : (
                <>
                  <FaCreditCard />
                  Güvenli Ödeme Yap
                </>
              )}
            </button>
            
            <button
              onClick={() => navigate('/cart')}
              className="btn btn-outline"
              style={{ 
                marginLeft: '15px',
                fontSize: '1.1rem', 
                padding: '15px 30px'
              }}
            >
              Sepete Dön
            </button>
          </div>

          {/* Payment Methods Info */}
          <div style={{ 
            marginTop: '40px', 
            textAlign: 'center',
            color: '#666',
            fontSize: '0.9rem'
          }}>
            <p>
              <strong>Kabul Edilen Ödeme Yöntemleri:</strong><br />
              Kredi Kartı, Banka Kartı, Taksitli Ödeme
            </p>
            <p style={{ marginTop: '10px', opacity: 0.7 }}>
              Ödeme işlemi iyzico güvenlik altyapısı ile gerçekleştirilir
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment; 