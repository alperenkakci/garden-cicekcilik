import React, { useState } from 'react';
import { FaSearch, FaTruck, FaCheckCircle, FaTimesCircle, FaClock, FaCopy } from 'react-icons/fa';
import './OrderTracking.css';

const OrderTracking = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const trackOrder = async (e) => {
    e.preventDefault();
    if (!orderNumber.trim()) {
      setError('Lütfen sipariş numarasını girin');
      return;
    }

    setLoading(true);
    setError('');
    setOrder(null);

    try {
      // Sipariş numarasını temizle ve formatla
      let cleanOrderNumber = orderNumber.trim();
      
      // Eğer "Sipariş" ile başlıyorsa kaldır
      if (cleanOrderNumber.toLowerCase().startsWith('sipariş')) {
        cleanOrderNumber = cleanOrderNumber.replace(/^sipariş\s*/i, '').trim();
      }
      
      // Eğer "#" ile başlıyorsa kaldır
      if (cleanOrderNumber.startsWith('#')) {
        cleanOrderNumber = cleanOrderNumber.substring(1).trim();
      }
      
      // MongoDB ObjectId formatı kontrolü (24 karakterlik hex string)
      const objectIdPattern = /^[0-9a-fA-F]{24}$/;
      if (objectIdPattern.test(cleanOrderNumber)) {
        // MongoDB ObjectId formatında, olduğu gibi kullan
        console.log('MongoDB ObjectId formatında sipariş numarası:', cleanOrderNumber);
      }

      const response = await fetch(`/api/orders/track/${cleanOrderNumber}`);
      const data = await response.json();

      if (response.ok) {
        setOrder(data);
      } else {
        setError(data.message || 'Sipariş bulunamadı');
      }
    } catch (error) {
      setError('Sipariş takibi sırasında bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FaClock className="status-icon pending" />;
      case 'processing':
        return <FaClock className="status-icon processing" />;
      case 'shipped':
        return <FaTruck className="status-icon shipped" />;
      case 'delivered':
        return <FaCheckCircle className="status-icon delivered" />;
      case 'cancelled':
        return <FaTimesCircle className="status-icon cancelled" />;
      default:
        return <FaClock className="status-icon pending" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Beklemede';
      case 'processing':
        return 'Hazırlanıyor';
      case 'shipped':
        return 'Kargoda';
      case 'delivered':
        return 'Teslim Edildi';
      case 'cancelled':
        return 'İptal Edildi';
      default:
        return 'Bilinmiyor';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'processing':
        return 'status-processing';
      case 'shipped':
        return 'status-shipped';
      case 'delivered':
        return 'status-delivered';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-pending';
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Kopyalama başarısız:', err);
    }
  };

  return (
    <div className="order-tracking">
      <div className="container">
        <h1>Sipariş Takibi</h1>
        <p className="tracking-description">
          Sipariş numaranızı girerek siparişinizin durumunu takip edebilirsiniz.
        </p>

        <form onSubmit={trackOrder} className="tracking-form">
          <div className="input-group">
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="Örn: 6886b901bfe1ca67f3e8f9a8 veya ORD-1234567890-ABC12"
              className="order-input"
            />
            <button type="submit" className="track-button" disabled={loading}>
              {loading ? 'Aranıyor...' : <><FaSearch /> Ara</>}
            </button>
          </div>
        </form>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {order && (
          <div className="order-details">
            <h2>Sipariş Detayları</h2>
            
            <div className="order-info">
              <div className="info-row">
                <span className="label">Sipariş Numarası:</span>
                <div className="value-with-copy">
                  <span className="value">{order.orderNumber}</span>
                  <button 
                    className="copy-btn"
                    onClick={() => copyToClipboard(order.orderNumber)}
                    title="Sipariş numarasını kopyala"
                  >
                    <FaCopy />
                  </button>
                  {copied && <span className="copied-text">Kopyalandı!</span>}
                </div>
              </div>
              <div className="info-row">
                <span className="label">Sipariş Tarihi:</span>
                <span className="value">{new Date(order.createdAt).toLocaleDateString('tr-TR')}</span>
              </div>
              <div className="info-row">
                <span className="label">Toplam Tutar:</span>
                <span className="value">{order.total.toFixed(2)} TL</span>
              </div>
              <div className="info-row">
                <span className="label">Durum:</span>
                <span className={`value status ${getStatusClass(order.status)}`}>
                  {getStatusIcon(order.status)}
                  {getStatusText(order.status)}
                </span>
              </div>
            </div>

            <div className="order-items">
              <h3>Sipariş Edilen Ürünler</h3>
              <div className="items-list">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <div className="item-info">
                      <span className="item-name">{item.product.name}</span>
                      <span className="item-quantity">Adet: {item.quantity}</span>
                      <span className="item-price">{item.price.toFixed(2)} TL</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="shipping-info">
              <h3>Teslimat Bilgileri</h3>
              <div className="shipping-details">
                <p><strong>Ad Soyad:</strong> {order.shippingAddress.name}</p>
                <p><strong>Telefon:</strong> {order.shippingAddress.phone}</p>
                <p><strong>Adres:</strong> {order.shippingAddress.address}</p>
                <p><strong>Şehir:</strong> {order.shippingAddress.city}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking; 