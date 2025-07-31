import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSeedling, FaArrowLeft } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div style={{ 
      minHeight: '70vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '40px 0'
    }}>
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          {/* 404 Icon */}
          <div style={{ marginBottom: '30px' }}>
            <FaSeedling style={{ 
              fontSize: '8rem', 
              color: '#4CAF50', 
              opacity: 0.3,
              marginBottom: '20px'
            }} />
          </div>

          {/* 404 Text */}
          <h1 style={{ 
            fontSize: '6rem', 
            fontWeight: 'bold', 
            color: '#4CAF50', 
            margin: '0 0 20px 0',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}>
            404
          </h1>

          <h2 style={{ 
            fontSize: '2.5rem', 
            color: '#333', 
            marginBottom: '20px' 
          }}>
            Sayfa Bulunamadı
          </h2>

          <p style={{ 
            fontSize: '1.2rem', 
            color: '#666', 
            marginBottom: '40px',
            maxWidth: '500px',
            margin: '0 auto 40px'
          }}>
            Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
            Ana sayfaya dönerek istediğiniz içeriği bulabilirsiniz.
          </p>

          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '20px', 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link to="/" className="btn btn-primary" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              padding: '15px 30px',
              fontSize: '1.1rem'
            }}>
              <FaHome />
              Ana Sayfa
            </Link>

            <button 
              onClick={() => window.history.back()} 
              className="btn btn-outline" 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px',
                padding: '15px 30px',
                fontSize: '1.1rem'
              }}
            >
              <FaArrowLeft />
              Geri Dön
            </button>
          </div>

          {/* Quick Links */}
          <div style={{ marginTop: '60px' }}>
            <h3 style={{ 
              fontSize: '1.5rem', 
              color: '#333', 
              marginBottom: '30px' 
            }}>
              Popüler Sayfalar
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              <Link to="/products" className="card" style={{ 
                textDecoration: 'none',
                padding: '20px',
                textAlign: 'center',
                transition: 'transform 0.2s'
              }} onMouseOver={(e) => e.target.style.transform = 'translateY(-5px)'} onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}>
                <h4 style={{ color: '#333', marginBottom: '10px' }}>Ürünler</h4>
                <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>
                  Tüm çiçek ürünlerimizi keşfedin
                </p>
              </Link>

              <Link to="/about" className="card" style={{ 
                textDecoration: 'none',
                padding: '20px',
                textAlign: 'center',
                transition: 'transform 0.2s'
              }} onMouseOver={(e) => e.target.style.transform = 'translateY(-5px)'} onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}>
                <h4 style={{ color: '#333', marginBottom: '10px' }}>Hakkımızda</h4>
                <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>
                  Şirketimiz hakkında bilgi alın
                </p>
              </Link>

              <Link to="/contact" className="card" style={{ 
                textDecoration: 'none',
                padding: '20px',
                textAlign: 'center',
                transition: 'transform 0.2s'
              }} onMouseOver={(e) => e.target.style.transform = 'translateY(-5px)'} onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}>
                <h4 style={{ color: '#333', marginBottom: '10px' }}>İletişim</h4>
                <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>
                  Bizimle iletişime geçin
                </p>
              </Link>
            </div>
          </div>

          {/* Search Suggestion */}
          <div style={{ 
            marginTop: '60px',
            padding: '30px',
            background: '#f8f9fa',
            borderRadius: '12px',
            maxWidth: '500px',
            margin: '60px auto 0'
          }}>
            <h3 style={{ 
              fontSize: '1.3rem', 
              color: '#333', 
              marginBottom: '15px' 
            }}>
              Aradığınızı Bulamadınız mı?
            </h3>
            <p style={{ 
              color: '#666', 
              marginBottom: '20px',
              lineHeight: '1.6'
            }}>
              Ürünler sayfamızda arama yaparak istediğiniz çiçeği bulabilirsiniz.
            </p>
            <Link to="/products" className="btn btn-primary" style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <FaSeedling />
              Ürünleri Keşfet
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 