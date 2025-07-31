import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const Contact = () => {

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '20px', color: '#333' }}>
            İletişim
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
            Sorularınız için bizimle iletişime geçin. Size en kısa sürede dönüş yapacağız.
          </p>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          {/* Contact Information */}
          <div style={{ maxWidth: '600px', width: '100%' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '30px', color: '#333' }}>
              İletişim Bilgileri
            </h2>

            <div style={{ marginBottom: '40px' }}>
              <div style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <FaPhone style={{ color: '#4CAF50', marginRight: '15px', fontSize: '1.2rem' }} />
                  <h3 style={{ margin: 0, color: '#333' }}>Telefon</h3>
                </div>
                <p style={{ margin: 0, color: '#666', marginLeft: '35px' }}>
                  +90 555 123 45 67
                </p>
                <p style={{ margin: 0, color: '#666', marginLeft: '35px' }}>
                  +90 212 345 67 89
                </p>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <FaEnvelope style={{ color: '#4CAF50', marginRight: '15px', fontSize: '1.2rem' }} />
                  <h3 style={{ margin: 0, color: '#333' }}>E-posta</h3>
                </div>
                <p style={{ margin: 0, color: '#666', marginLeft: '35px' }}>
                  info@gardencicekcilik.com
                </p>
                <p style={{ margin: 0, color: '#666', marginLeft: '35px' }}>
                  destek@gardencicekcilik.com
                </p>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <FaMapMarkerAlt style={{ color: '#4CAF50', marginRight: '15px', fontSize: '1.2rem' }} />
                  <h3 style={{ margin: 0, color: '#333' }}>Adres</h3>
                </div>
                <p style={{ margin: 0, color: '#666', marginLeft: '35px' }}>
                  Bağdat Caddesi No:123<br />
                  Kadıköy, İstanbul<br />
                  Türkiye
                </p>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <FaClock style={{ color: '#4CAF50', marginRight: '15px', fontSize: '1.2rem' }} />
                  <h3 style={{ margin: 0, color: '#333' }}>Çalışma Saatleri</h3>
                </div>
                <p style={{ margin: 0, color: '#666', marginLeft: '35px' }}>
                  Pazartesi - Cuma: 09:00 - 18:00<br />
                  Cumartesi: 09:00 - 16:00<br />
                  Pazar: 10:00 - 15:00
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 style={{ marginBottom: '20px', color: '#333' }}>Sosyal Medya</h3>
              <div style={{ display: 'flex', gap: '15px' }}>
                <a href="#" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '50px',
                  height: '50px',
                  background: '#4CAF50',
                  color: 'white',
                  borderRadius: '50%',
                  textDecoration: 'none',
                  transition: 'transform 0.2s'
                }} onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.target.style.transform = 'scale(1)'}>
                  <FaFacebook />
                </a>
                <a href="#" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '50px',
                  height: '50px',
                  background: '#4CAF50',
                  color: 'white',
                  borderRadius: '50%',
                  textDecoration: 'none',
                  transition: 'transform 0.2s'
                }} onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.target.style.transform = 'scale(1)'}>
                  <FaInstagram />
                </a>
                <a href="#" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '50px',
                  height: '50px',
                  background: '#4CAF50',
                  color: 'white',
                  borderRadius: '50%',
                  textDecoration: 'none',
                  transition: 'transform 0.2s'
                }} onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.target.style.transform = 'scale(1)'}>
                  <FaTwitter />
                </a>
                <a href="#" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '50px',
                  height: '50px',
                  background: '#4CAF50',
                  color: 'white',
                  borderRadius: '50%',
                  textDecoration: 'none',
                  transition: 'transform 0.2s'
                }} onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.target.style.transform = 'scale(1)'}>
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div style={{ marginTop: '80px' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '40px', color: '#333' }}>
            Mağazamızın Konumu
          </h2>
          <div style={{
            background: '#f8f9fa',
            height: '400px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed #4CAF50'
          }}>
            <div style={{ textAlign: 'center', color: '#666' }}>
              <FaMapMarkerAlt style={{ fontSize: '4rem', color: '#4CAF50', marginBottom: '20px' }} />
              <p style={{ fontSize: '1.2rem', margin: 0 }}>Harita burada görüntülenecek</p>
              <p style={{ margin: '10px 0 0 0', opacity: 0.7 }}>Bağdat Caddesi No:123, Kadıköy, İstanbul</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 