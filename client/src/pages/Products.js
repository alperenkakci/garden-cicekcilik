import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FaStar, FaSearch, FaFilter } from 'react-icons/fa';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    sort: searchParams.get('sort') || ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Build query string
        const params = new URLSearchParams();
        if (filters.search) params.append('search', filters.search);
        if (filters.category) params.append('category', filters.category);
        if (filters.sort) params.append('sort', filters.sort);
        params.append('page', currentPage);
        params.append('limit', 12);

        const response = await fetch(`/api/products?${params}`);
        const data = await response.json();
        
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
        
        // Update URL params
        setSearchParams(params);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
    fetchCategories();
  }, [filters, currentPage, setSearchParams]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Ürünler yükleniyor...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#333' }}>
            Ürünler
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            En güzel çiçeklerimizi keşfedin
          </p>
        </div>

        {/* Filters */}
        <div style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '12px', 
          marginBottom: '30px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            alignItems: 'end'
          }}>
            {/* Search */}
            <div className="form-group">
              <label className="form-label">
                <FaSearch style={{ marginRight: '5px' }} />
                Arama
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Ürün ara..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="form-group">
              <label className="form-label">
                <FaFilter style={{ marginRight: '5px' }} />
                Kategori
              </label>
              <select
                className="form-input"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">Tüm Kategoriler</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="form-group">
              <label className="form-label">Sıralama</label>
              <select
                className="form-input"
                value={filters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
              >
                <option value="">Varsayılan</option>
                <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
                <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
                <option value="name-asc">İsim: A-Z</option>
                <option value="name-desc">İsim: Z-A</option>
                <option value="rating">En Çok Beğenilen</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <h3 style={{ color: '#666', marginBottom: '20px' }}>Ürün bulunamadı</h3>
            <p style={{ color: '#999' }}>
              Arama kriterlerinize uygun ürün bulunamadı. Lütfen farklı filtreler deneyin.
            </p>
          </div>
        ) : (
          <>
            <div className="products-grid">
              {products.map((product) => (
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
                      {product.category && (
                        <span style={{ 
                          background: '#e8f5e8', 
                          color: '#4CAF50', 
                          padding: '4px 8px', 
                          borderRadius: '4px',
                          fontSize: '0.8rem'
                        }}>
                          {product.category.name}
                        </span>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                marginTop: '40px',
                gap: '10px'
              }}>
                <button
                  className="btn btn-outline"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  style={{ padding: '8px 16px' }}
                >
                  Önceki
                </button>
                
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 2 && page <= currentPage + 2)
                  ) {
                    return (
                      <button
                        key={page}
                        className={`btn ${page === currentPage ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => handlePageChange(page)}
                        style={{ padding: '8px 16px' }}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 3 ||
                    page === currentPage + 3
                  ) {
                    return <span key={page} style={{ padding: '8px 16px' }}>...</span>;
                  }
                  return null;
                })}
                
                <button
                  className="btn btn-outline"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  style={{ padding: '8px 16px' }}
                >
                  Sonraki
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products; 