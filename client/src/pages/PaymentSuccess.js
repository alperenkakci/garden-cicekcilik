import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaDownload, FaEnvelope, FaHome, FaShoppingBag } from 'react-icons/fa';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const orderId = params.get('orderId');
    
    if (orderId) {
      fetchOrderData(orderId);
    }
  }, [location]);

  const fetchOrderData = async (orderId) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`);
      if (response.ok) {
        const data = await response.json();
        setOrderData(data);
      }
    } catch (error) {
      console.error('Order fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadInvoice = () => {
    // Fatura indirme fonksiyonu (gelecekte implement edilebilir)
    alert('Fatura indirme özelliği yakında eklenecek!');
  };

  const sendEmail = () => {
    // E-posta gönderme fonksiyonu (gelecekte implement edilebilir)
    alert('E-posta gönderme özelliği yakında eklenecek!');
  };

  if (loading) {
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
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          
          {/* Success Icon */}
          <div style={{ marginBottom: '30px' }}>
            <FaCheckCircle style={{ 
              fontSize: '5rem', 
              color: '#4CAF50',
              marginBottom: '20px'
            }} />
            <h1 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '10px' }}>
              Ödeme Başarılı! 🎉
            </h1>
            <p style={{ color: '#666', fontSize: '1.1rem' }}>
              Siparişiniz başarıyla alındı ve ödemeniz tamamlandı
            </p>
          </div>

          {/* Order Details */}
          {orderData && (
            <div style={{ 
              background: 'white', 
              borderRadius: '20px', 
              padding: '30px', 
              marginBottom: '30px',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
              textAlign: 'left'
            }}>
              <h2 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>
                Sipariş Detayları
              </h2>
              
              <div style={{ marginBottom: '20px' }}>
                <p><strong>Sipariş Numarası:</strong> #{orderData.orderNumber}</p>
                <p><strong>Toplam Tutar:</strong> ₺{orderData.totalAmount.toFixed(2)}</p>
                <p><strong>Ödeme Durumu:</strong> 
                  <span style={{ color: '#4CAF50', fontWeight: '600', marginLeft: '5px' }}>
                    ✅ Tamamlandı
                  </span>
                </p>
                {orderData.transactionId && (
                  <p><strong>İşlem Numarası:</strong> {orderData.transactionId}</p>
                )}
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ color: '#666', fontSize: '1rem', marginBottom: '10px' }}>Teslimat Adresi</h3>
                <p>{orderData.customerInfo.name}</p>
                <p>{orderData.customerInfo.address.street}</p>
                <p>{orderData.customerInfo.address.city}, {orderData.customerInfo.address.zipCode}</p>
              </div>

              <div style={{ 
                borderTop: '1px solid #f0f0f0', 
                paddingTop: '20px',
                textAlign: 'center'
              }}>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>
                  Siparişiniz en kısa sürede hazırlanıp kargoya verilecektir.
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={downloadInvoice}
              className="btn btn-outline"
              style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '1rem',
                padding: '12px 20px'
              }}
            >
              <FaDownload />
              Fatura İndir
            </button>
            
            <button
              onClick={sendEmail}
              className="btn btn-outline"
              style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '1rem',
                padding: '12px 20px'
              }}
            >
              <FaEnvelope />
              E-posta Gönder
            </button>
          </div>

          {/* Navigation Buttons */}
          <div style={{ 
            marginTop: '40px', 
            display: 'flex', 
            gap: '15px', 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => navigate('/')}
              className="btn btn-primary"
              style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '1.1rem',
                padding: '15px 25px'
              }}
            >
              <FaHome />
              Ana Sayfa
            </button>
            
            <button
              onClick={() => navigate('/products')}
              className="btn btn-outline"
              style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '1.1rem',
                padding: '15px 25px'
              }}
            >
              <FaShoppingBag />
              Alışverişe Devam
            </button>
          </div>

          {/* Additional Info */}
          <div style={{ 
            marginTop: '40px', 
            padding: '20px',
            background: 'rgba(76, 175, 80, 0.1)',
            borderRadius: '15px',
            color: '#2E7D32'
          }}>
            <h3 style={{ marginBottom: '10px' }}>📧 E-posta Bildirimi</h3>
            <p style={{ fontSize: '0.9rem', margin: '0' }}>
              Sipariş durumu hakkında bilgilendirme e-postası gönderilecektir.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess; 