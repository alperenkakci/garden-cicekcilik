import React from 'react';
import { FaSeedling, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
      color: 'white',
      padding: '40px 0 20px',
      marginTop: 'auto',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><defs><pattern id=\'grain\' width=\'100\' height=\'100\' patternUnits=\'userSpaceOnUse\'><circle cx=\'50\' cy=\'50\' r=\'1\' fill=\'white\' opacity=\'0.05\'/></pattern></defs><rect width=\'100\' height=\'100\' fill=\'url(%23grain)\'/></svg>")',
        opacity: 0.3
      }}></div>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px',
          marginBottom: '30px'
        }}>
          <div>
            <h3 style={{ 
              marginBottom: '15px', 
              display: 'flex', 
              alignItems: 'center',
              fontSize: '1.3rem',
              fontWeight: '700'
            }}>
              <FaSeedling style={{ 
                marginRight: '10px', 
                color: '#4CAF50',
                fontSize: '1.5rem'
              }} />
              Garden Çiçekçilik
            </h3>
            <p style={{ 
              lineHeight: '1.6', 
              opacity: 0.9,
              fontSize: '1rem',
              marginBottom: '15px'
            }}>
              En güzel çiçekler, en uygun fiyatlarla. 
              Özel günlerinizde sevdiklerinizi mutlu edin.
            </p>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '12px', fontSize: '1.1rem' }}>İletişim</h4>
            <div style={{ lineHeight: '1.8' }}>
              <p style={{ display: 'flex', alignItems: 'center', opacity: 0.8, fontSize: '0.9rem', marginBottom: '8px' }}>
                <FaPhone style={{ marginRight: '8px', color: '#4CAF50', fontSize: '0.9rem' }} />
                +90 555 123 45 67
              </p>
              <p style={{ display: 'flex', alignItems: 'center', opacity: 0.8, fontSize: '0.9rem', marginBottom: '8px' }}>
                <FaEnvelope style={{ marginRight: '8px', color: '#4CAF50', fontSize: '0.9rem' }} />
                info@gardencicekcilik.com
              </p>
              <p style={{ display: 'flex', alignItems: 'center', opacity: 0.8, fontSize: '0.9rem' }}>
                <FaMapMarkerAlt style={{ marginRight: '8px', color: '#4CAF50', fontSize: '0.9rem' }} />
                İstanbul, Türkiye
              </p>
            </div>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '12px', fontSize: '1.1rem' }}>Hızlı Linkler</h4>
            <ul style={{ listStyle: 'none', lineHeight: '1.8', padding: 0 }}>
              <li style={{ marginBottom: '6px' }}><a href="/products" style={{ color: 'white', textDecoration: 'none', opacity: 0.8, fontSize: '0.9rem' }}>Ürünler</a></li>
              <li style={{ marginBottom: '6px' }}><a href="/about" style={{ color: 'white', textDecoration: 'none', opacity: 0.8, fontSize: '0.9rem' }}>Hakkımızda</a></li>
              <li style={{ marginBottom: '6px' }}><a href="/contact" style={{ color: 'white', textDecoration: 'none', opacity: 0.8, fontSize: '0.9rem' }}>İletişim</a></li>
              <li style={{ marginBottom: '6px' }}><a href="/cart" style={{ color: 'white', textDecoration: 'none', opacity: 0.8, fontSize: '0.9rem' }}>Sepet</a></li>
              <li><a href="/" style={{ color: 'white', textDecoration: 'none', opacity: 0.8, fontSize: '0.9rem' }}>Ana Sayfa</a></li>
            </ul>
          </div>
        </div>
        
        <div style={{
          borderTop: '1px solid #34495e',
          paddingTop: '15px',
          textAlign: 'center',
          opacity: 0.7,
          fontSize: '0.85rem'
        }}>
          <p>&copy; 2024 Garden Çiçekçilik. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 