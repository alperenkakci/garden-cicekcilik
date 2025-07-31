import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCheckCircle, FaTruck, FaCreditCard, FaEnvelope } from 'react-icons/fa';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/orders/${orderId}`);
        if (response.ok) {
          const data = await response.json();
          setOrder(data);
        } else {
          console.error('Order not found');
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <div className="spinner"></div>
        <p>Yükleniyor...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Sipariş bulunamadı</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '20px' }}>
          Ana Sayfaya Dön
        </Link>
      </div>
    );
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Beklemede';
      case 'confirmed':
        return 'Onaylandı';
      case 'shipped':
        return 'Kargoda';
      case 'delivered':
        return 'Teslim Edildi';
      case 'cancelled':
        return 'İptal Edildi';
      default:
        return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#ff9800';
      case 'confirmed':
        return '#2196f3';
      case 'shipped':
        return '#9c27b0';
      case 'delivered':
        return '#4caf50';
      case 'cancelled':
        return '#f44336';
      default:
        return '#666';
    }
  };

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        {/* Success Message */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <FaCheckCircle style={{ 
            fontSize: '4rem', 
            color: '#4CAF50', 
            marginBottom: '20px' 
          }} />
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#333' }}>
            Siparişiniz Alındı!
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            Sipariş numaranız: <strong>{order.orderNumber || order._id}</strong>
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px'
        }}>
          {/* Order Details */}
          <div>
            <div style={{ 
              background: 'white', 
              padding: '30px', 
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              marginBottom: '30px'
            }}>
              <h3 style={{ marginBottom: '20px', color: '#333' }}>Sipariş Detayları</h3>
              
              <div style={{ marginBottom: '20px' }}>
                <p style={{ marginBottom: '5px', fontWeight: '600' }}>Sipariş Durumu:</p>
                <span style={{ 
                  background: getStatusColor(order.status), 
                  color: 'white', 
                  padding: '4px 12px', 
                  borderRadius: '15px',
                  fontSize: '0.9rem'
                }}>
                  {getStatusText(order.status)}
                </span>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <p style={{ marginBottom: '5px', fontWeight: '600' }}>Sipariş Tarihi:</p>
                <p style={{ color: '#666' }}>
                  {new Date(order.createdAt).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <p style={{ marginBottom: '5px', fontWeight: '600' }}>Ödeme Yöntemi:</p>
                <p style={{ color: '#666' }}>
                  {order.paymentMethod === 'credit_card' ? 'Kredi Kartı' : 'Kapıda Ödeme'}
                </p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <p style={{ marginBottom: '5px', fontWeight: '600' }}>Toplam Tutar:</p>
                <p style={{ fontSize: '1.2rem', fontWeight: '700', color: '#4CAF50' }}>
                  ₺{order.totalAmount.toFixed(2)}
                </p>
              </div>

              {order.notes && (
                <div>
                  <p style={{ marginBottom: '5px', fontWeight: '600' }}>Notlar:</p>
                  <p style={{ color: '#666' }}>{order.notes}</p>
                </div>
              )}
            </div>

            {/* Customer Information */}
            <div style={{ 
              background: 'white', 
              padding: '30px', 
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ marginBottom: '20px', color: '#333' }}>Müşteri Bilgileri</h3>
              
              <div style={{ marginBottom: '15px' }}>
                <p style={{ marginBottom: '5px', fontWeight: '600' }}>Ad Soyad:</p>
                <p style={{ color: '#666' }}>{order.customerInfo.name}</p>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <p style={{ marginBottom: '5px', fontWeight: '600' }}>E-posta:</p>
                <p style={{ color: '#666' }}>{order.customerInfo.email}</p>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <p style={{ marginBottom: '5px', fontWeight: '600' }}>Telefon:</p>
                <p style={{ color: '#666' }}>{order.customerInfo.phone}</p>
              </div>

              {order.customerInfo.address && (
                <div>
                  <p style={{ marginBottom: '5px', fontWeight: '600' }}>Teslimat Adresi:</p>
                  <p style={{ color: '#666', lineHeight: '1.5' }}>
                    {order.customerInfo.address.street && `${order.customerInfo.address.street}, `}
                    {order.customerInfo.address.city && `${order.customerInfo.address.city}, `}
                    {order.customerInfo.address.state && `${order.customerInfo.address.state}, `}
                    {order.customerInfo.address.zipCode && `${order.customerInfo.address.zipCode}, `}
                    {order.customerInfo.address.country}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Items */}
          <div>
            <div style={{ 
              background: 'white', 
              padding: '30px', 
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              marginBottom: '30px'
            }}>
              <h3 style={{ marginBottom: '20px', color: '#333' }}>Sipariş Edilen Ürünler</h3>
              
              {order.items.map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '15px 0',
                  borderBottom: index < order.items.length - 1 ? '1px solid #eee' : 'none'
                }}>
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    style={{ 
                      width: '60px', 
                      height: '60px', 
                      objectFit: 'cover', 
                      borderRadius: '8px',
                      marginRight: '15px'
                    }}
                  />
                  <div style={{ flex: '1' }}>
                    <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{item.product.name}</h4>
                    <p style={{ margin: '0', color: '#666', fontSize: '0.9rem' }}>
                      {item.quantity} adet × ₺{item.price.toFixed(2)}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ margin: '0', fontWeight: '600', color: '#4CAF50' }}>
                      ₺{(item.quantity * item.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Next Steps */}
            <div style={{ 
              background: 'white', 
              padding: '30px', 
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ marginBottom: '20px', color: '#333' }}>Sonraki Adımlar</h3>
              
              <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                <FaEnvelope style={{ marginRight: '10px', color: '#4CAF50' }} />
                <div>
                  <p style={{ margin: '0', fontWeight: '600' }}>E-posta Onayı</p>
                  <p style={{ margin: '0', fontSize: '0.9rem', color: '#666' }}>
                    Sipariş onayınız e-posta adresinize gönderildi
                  </p>
                </div>
              </div>

              <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                <FaTruck style={{ marginRight: '10px', color: '#4CAF50' }} />
                <div>
                  <p style={{ margin: '0', fontWeight: '600' }}>Kargo Takibi</p>
                  <p style={{ margin: '0', fontSize: '0.9rem', color: '#666' }}>
                    Siparişiniz hazırlandığında kargo bilgileri güncellenecek
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FaCreditCard style={{ marginRight: '10px', color: '#4CAF50' }} />
                <div>
                  <p style={{ margin: '0', fontWeight: '600' }}>Ödeme</p>
                  <p style={{ margin: '0', fontSize: '0.9rem', color: '#666' }}>
                    {order.paymentMethod === 'credit_card' 
                      ? 'Kredi kartı ile ödemeniz alındı' 
                      : 'Kapıda ödeme yapacaksınız'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/" className="btn btn-primary" style={{ marginRight: '15px' }}>
            Alışverişe Devam Et
          </Link>
          <Link to="/products" className="btn btn-outline">
            Ürünleri Keşfet
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation; 