import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaStar } from 'react-icons/fa';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch featured products
        const productsResponse = await fetch('/api/products?limit=6');
        const productsData = await productsResponse.json();
        setFeaturedProducts(productsData.products || []);

        // Fetch categories
        const categoriesResponse = await fetch('/api/categories');
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Ana sayfa yükleniyor...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="float">🌸 Garden Çiçekçilik 🌸</h1>
          <p>En güzel çiçekler, en uygun fiyatlarla. Özel günlerinizde sevdiklerinizi mutlu edin.</p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/products" className="btn btn-primary pulse" style={{ fontSize: '1.2rem', padding: '18px 35px' }}>
              Ürünleri Keşfet
              <FaArrowRight style={{ marginLeft: '12px' }} />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)' }}>
        <div className="container">
          <h2 className="section-title">
            🌿 Kategoriler
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px'
          }}>
            {categories && categories.length > 0 && categories.map((category) => (
              <Link 
                key={category._id} 
                to={`/products?category=${category._id}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="product-card" style={{ textAlign: 'center', padding: '40px' }}>
                  <img 
                    src={category.image} 
                    alt={category.name}
                    style={{ 
                      width: '120px', 
                      height: '120px', 
                      objectFit: 'cover',
                      borderRadius: '50%',
                      marginBottom: '25px',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                  />
                  <h3 style={{ color: '#333', marginBottom: '15px', fontSize: '1.3rem', fontWeight: '600' }}>{category.name}</h3>
                  <p style={{ color: '#666', lineHeight: '1.6', fontSize: '1rem' }}>{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)' }}>
        <div className="container">
          <h2 className="section-title">
            ⭐ Öne Çıkan Ürünler
          </h2>
          <div className="products-grid">
            {featuredProducts && featuredProducts.length > 0 && featuredProducts.map((product) => (
              <div key={product._id} className="product-card">
                <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-info">
                    <h3 className="product-title">{product.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          style={{ 
                            color: i < Math.floor(product.rating) ? '#ffc107' : '#ddd',
                            marginRight: '2px'
                          }} 
                        />
                      ))}
                      <span style={{ marginLeft: '5px', fontSize: '0.9rem', color: '#666' }}>
                        ({product.numReviews})
                      </span>
                    </div>
                    <p className="product-price">₺{product.price.toFixed(2)}</p>
                    <p className="product-description">
                      {product.description.length > 100 
                        ? `${product.description.substring(0, 100)}...` 
                        : product.description
                      }
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/products" className="btn btn-outline">
              Tüm Ürünleri Gör
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section style={{ padding: '60px 0', background: 'white' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'center'
          }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#333' }}>
                Neden Garden Çiçekçilik?
              </h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#666', marginBottom: '20px' }}>
                Yılların deneyimi ile çiçek sektöründe öncü olan Garden Çiçekçilik, 
                en taze ve kaliteli çiçekleri sizlere sunmaktadır.
              </p>
              <ul style={{ listStyle: 'none', lineHeight: '2' }}>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ 
                    color: '#4CAF50', 
                    marginRight: '10px', 
                    fontSize: '1.2rem' 
                  }}>✓</span>
                  Taze ve kaliteli çiçekler
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ 
                    color: '#4CAF50', 
                    marginRight: '10px', 
                    fontSize: '1.2rem' 
                  }}>✓</span>
                  Hızlı teslimat
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ 
                    color: '#4CAF50', 
                    marginRight: '10px', 
                    fontSize: '1.2rem' 
                  }}>✓</span>
                  Uygun fiyatlar
                </li>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ 
                    color: '#4CAF50', 
                    marginRight: '10px', 
                    fontSize: '1.2rem' 
                  }}>✓</span>
                  7/24 müşteri desteği
                </li>
              </ul>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Çiçek düzenleme"
                style={{ 
                  width: '100%', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 