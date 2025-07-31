import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaHeart, FaShare } from 'react-icons/fa';

// RecommendedProducts Component
const RecommendedProducts = ({ currentProductId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          const allProducts = data.products || data;
          
          // Mevcut ürünü hariç tut ve rastgele 4 ürün seç
          const filteredProducts = allProducts.filter(p => p._id !== currentProductId);
          const shuffled = filteredProducts.sort(() => 0.5 - Math.random());
          const randomProducts = shuffled.slice(0, 4);
          
          setProducts(randomProducts);
        }
      } catch (error) {
        console.error('Error fetching recommended products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomProducts();
  }, [currentProductId]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div className="spinner"></div>
        <p style={{ marginTop: '20px', color: '#666' }}>Önerilen ürünler yükleniyor...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p style={{ color: '#666' }}>Şu anda önerilen ürün bulunmuyor.</p>
        <Link to="/products" className="btn btn-outline" style={{ marginTop: '20px' }}>
          Tüm Ürünleri Gör
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '30px',
        marginBottom: '40px'
      }}>
        {products.map((product) => (
          <div key={product._id} style={{
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            transition: 'transform 0.2s',
            cursor: 'pointer'
          }} onMouseOver={(e) => e.target.style.transform = 'translateY(-5px)'} onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}>
            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <img 
                src={product.image} 
                alt={product.name}
                style={{ 
                  width: '100%', 
                  height: '200px', 
                  objectFit: 'cover'
                }}
              />
              <div style={{ padding: '20px' }}>
                <h3 style={{ 
                  margin: '0 0 10px 0', 
                  fontSize: '1.1rem', 
                  color: '#333',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {product.name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        style={{ 
                          color: i < Math.floor(product.rating || 5) ? '#FFD700' : '#ddd',
                          fontSize: '0.9rem',
                          marginRight: '2px'
                        }} 
                      />
                    ))}
                  </div>
                  <span style={{ marginLeft: '5px', fontSize: '0.9rem', color: '#666' }}>
                    ({product.numReviews || 0})
                  </span>
                </div>
                <p style={{ 
                  margin: '0 0 15px 0', 
                  fontSize: '1.2rem', 
                  fontWeight: 'bold',
                  color: '#4CAF50'
                }}>
                  ₺{product.price.toFixed(2)}
                </p>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  fontSize: '0.9rem',
                  color: '#666'
                }}>
                  <span>Stok: {product.stock}</span>
                  <span>{product.category?.name || 'Genel'}</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <Link to="/products" className="btn btn-outline">
          Tüm Ürünleri Gör
        </Link>
      </div>
    </div>
  );
};

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          console.error('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    setAddingToCart(true);
    try {
      await addToCart(product._id, quantity);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <div className="spinner"></div>
        <p>Yükleniyor...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Ürün bulunamadı</h2>
        <Link to="/products" className="btn btn-primary" style={{ marginTop: '20px' }}>
          Ürünlere Dön
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        {/* Breadcrumb */}
        <nav style={{ marginBottom: '30px' }}>
          <Link to="/" style={{ color: '#666', textDecoration: 'none' }}>Ana Sayfa</Link>
          <span style={{ margin: '0 10px', color: '#999' }}>/</span>
          <Link to="/products" style={{ color: '#666', textDecoration: 'none' }}>Ürünler</Link>
          <span style={{ margin: '0 10px', color: '#999' }}>/</span>
          <span style={{ color: '#333' }}>{product.name}</span>
        </nav>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'start'
        }}>
          {/* Product Image */}
          <div>
            <img 
              src={product.image} 
              alt={product.name}
              style={{ 
                width: '100%', 
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}
            />
          </div>

          {/* Product Info */}
          <div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '15px', color: '#333' }}>
              {product.name}
            </h1>
            
            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              {[...Array(5)].map((_, i) => (
                <FaStar 
                  key={i} 
                  style={{ 
                    color: i < Math.floor(product.rating) ? '#ffc107' : '#ddd',
                    marginRight: '2px'
                  }} 
                />
              ))}
              <span style={{ marginLeft: '10px', color: '#666' }}>
                {product.rating.toFixed(1)} ({product.numReviews} değerlendirme)
              </span>
            </div>

            {/* Price */}
            <div style={{ marginBottom: '30px' }}>
              <span style={{ 
                fontSize: '2rem', 
                fontWeight: '700', 
                color: '#4CAF50' 
              }}>
                ₺{product.price.toFixed(2)}
              </span>
            </div>

            {/* Stock Status */}
            <div style={{ marginBottom: '30px' }}>
              {product.stock > 0 ? (
                <span style={{ 
                  color: '#4CAF50', 
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  ✓ Stokta ({product.stock} adet)
                </span>
              ) : (
                <span style={{ color: '#f44336', fontWeight: '600' }}>
                  ✗ Stokta yok
                </span>
              )}
            </div>

            {/* Description */}
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ marginBottom: '15px', color: '#333' }}>Açıklama</h3>
              <p style={{ lineHeight: '1.8', color: '#666' }}>
                {product.description}
              </p>
            </div>

            {/* Category */}
            {product.category && (
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ marginBottom: '15px', color: '#333' }}>Kategori</h3>
                <span style={{ 
                  background: '#e8f5e8', 
                  color: '#4CAF50', 
                  padding: '8px 16px', 
                  borderRadius: '20px',
                  fontSize: '0.9rem'
                }}>
                  {product.category.name}
                </span>
              </div>
            )}

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ marginBottom: '15px', color: '#333' }}>Etiketler</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {product.tags.map((tag, index) => (
                    <span 
                      key={index}
                      style={{ 
                        background: '#f8f9fa', 
                        color: '#666', 
                        padding: '4px 12px', 
                        borderRadius: '15px',
                        fontSize: '0.8rem'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart Section */}
            {product.stock > 0 && (
              <div style={{ 
                background: '#f8f9fa', 
                padding: '30px', 
                borderRadius: '12px',
                marginBottom: '30px'
              }}>
                <h3 style={{ marginBottom: '20px', color: '#333' }}>Sepete Ekle</h3>
                
                {/* Quantity */}
                <div style={{ marginBottom: '20px' }}>
                  <label className="form-label">Adet</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="quantity-input"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                      min="1"
                      max={product.stock}
                    />
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  className="btn btn-primary"
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                  style={{ 
                    width: '100%', 
                    padding: '15px',
                    fontSize: '1.1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                  }}
                >
                  {addingToCart ? (
                    <>
                      <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
                      Ekleniyor...
                    </>
                  ) : (
                    <>
                      <FaShoppingCart />
                      Sepete Ekle
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '15px' }}>
              <button className="btn btn-outline" style={{ flex: 1 }}>
                <FaHeart style={{ marginRight: '5px' }} />
                Favorilere Ekle
              </button>
              <button className="btn btn-outline" style={{ flex: 1 }}>
                <FaShare style={{ marginRight: '5px' }} />
                Paylaş
              </button>
            </div>
          </div>
        </div>

        {/* Recommended Products Section */}
        <div style={{ marginTop: '80px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2rem', color: '#333' }}>
            Bunları da beğenebilirsiniz
          </h2>
          <RecommendedProducts currentProductId={product._id} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 