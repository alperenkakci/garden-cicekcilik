import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaTimesCircle, FaExclamationTriangle, FaCreditCard, FaHome, FaShoppingBag } from 'react-icons/fa';

const PaymentFailed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorCode, setErrorCode] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const orderId = params.get('orderId');
    const error = params.get('error');
    
    setErrorCode(error);
    
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

  const getErrorMessage = (code) => {
    const errorMessages = {
      '5001': 'Kart bilgileri hatalı. Lütfen kart bilgilerinizi kontrol edin.',
      '5002': 'Yetersiz bakiye. Lütfen kartınızın bakiyesini kontrol edin.',
      '5003': 'Kart limiti aşıldı. Lütfen kart limitinizi kontrol edin.',
      '5004': 'Kart geçersiz. Lütfen geçerli bir kart kullanın.',
      '5005': 'İşlem reddedildi. Lütfen daha sonra tekrar deneyin.',
      '5006': 'Banka hatası. Lütfen daha sonra tekrar deneyin.',
      '5007': 'Sistem hatası. Lütfen daha sonra tekrar deneyin.',
      '5008': 'Zaman aşımı. Lütfen işlemi tekrar deneyin.',
      '5009': 'Geçersiz işlem. Lütfen tekrar deneyin.',
      '5010': 'Kart blokeli. Lütfen bankanızla iletişime geçin.',
      'system': 'Sistem hatası oluştu. Lütfen daha sonra tekrar deneyin.',
      'cancelled': 'Ödeme işlemi iptal edildi.'
    };

    return errorMessages[code] || 'Bilinmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
  };

  const retryPayment = () => {
    if (orderData) {
      navigate(`/payment?orderId=${orderData._id}`);
    }
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
          
          {/* Error Icon */}
          <div style={{ marginBottom: '30px' }}>
            <FaTimesCircle style={{ 
              fontSize: '5rem', 
              color: '#dc3545',
              marginBottom: '20px'
            }} />
            <h1 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '10px' }}>
              Ödeme Başarısız! ❌
            </h1>
            <p style={{ color: '#666', fontSize: '1.1rem' }}>
              Ödeme işlemi tamamlanamadı
            </p>
          </div>

          {/* Error Message */}
          <div style={{ 
            background: '#f8d7da', 
            color: '#721c24', 
            padding: '20px', 
            borderRadius: '15px',
            marginBottom: '30px',
            border: '1px solid #f5c6cb'
          }}>
            <FaExclamationTriangle style={{ fontSize: '2rem', marginBottom: '15px' }} />
            <h3 style={{ marginBottom: '10px' }}>Hata Detayı</h3>
            <p style={{ fontSize: '1rem', margin: '0' }}>
              {getErrorMessage(errorCode)}
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
                Sipariş Bilgileri
              </h2>
              
              <div style={{ marginBottom: '20px' }}>
                <p><strong>Sipariş Numarası:</strong> #{orderData.orderNumber}</p>
                <p><strong>Toplam Tutar:</strong> ₺{orderData.totalAmount.toFixed(2)}</p>
                <p><strong>Ödeme Durumu:</strong> 
                  <span style={{ color: '#dc3545', fontWeight: '600', marginLeft: '5px' }}>
                    ❌ Başarısız
                  </span>
                </p>
              </div>

              <div style={{ 
                borderTop: '1px solid #f0f0f0', 
                paddingTop: '20px',
                textAlign: 'center'
              }}>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>
                  Siparişiniz korunmuştur. Ödeme işlemini tekrar deneyebilirsiniz.
                </p>
              </div>
            </div>
          )}

          {/* Troubleshooting Tips */}
          <div style={{ 
            background: 'white', 
            borderRadius: '20px', 
            padding: '30px', 
            marginBottom: '30px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)'
          }}>
            <h3 style={{ marginBottom: '20px', color: '#333' }}>Çözüm Önerileri</h3>
            
            <div style={{ textAlign: 'left' }}>
              <ul style={{ listStyle: 'none', padding: '0' }}>
                <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FaCreditCard style={{ color: '#4CAF50' }} />
                  Kart bilgilerinizi kontrol edin
                </li>
                <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FaCreditCard style={{ color: '#4CAF50' }} />
                  Kartınızın bakiyesini kontrol edin
                </li>
                <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FaCreditCard style={{ color: '#4CAF50' }} />
                  Kart limitinizi kontrol edin
                </li>
                <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FaCreditCard style={{ color: '#4CAF50' }} />
                  Farklı bir kart deneyin
                </li>
                <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FaCreditCard style={{ color: '#4CAF50' }} />
                  Bankanızla iletişime geçin
                </li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '15px', 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={retryPayment}
              className="btn btn-primary"
              style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '1.1rem',
                padding: '15px 25px'
              }}
            >
              <FaCreditCard />
              Tekrar Dene
            </button>
            
            <button
              onClick={() => navigate('/cart')}
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
              Sepete Dön
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="btn btn-outline"
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
          </div>

          {/* Contact Info */}
          <div style={{ 
            marginTop: '40px', 
            padding: '20px',
            background: 'rgba(220, 53, 69, 0.1)',
            borderRadius: '15px',
            color: '#721c24'
          }}>
            <h3 style={{ marginBottom: '10px' }}>📞 Yardım</h3>
            <p style={{ fontSize: '0.9rem', margin: '0' }}>
              Sorun devam ederse müşteri hizmetlerimizle iletişime geçin: +90 555 123 45 67
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PaymentFailed; 