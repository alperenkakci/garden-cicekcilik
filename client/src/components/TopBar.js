import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// FaChevronDown removed as it's not being used
import './TopBar.css';

const TopBar = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/categories');
      if (!response.ok) {
        throw new Error('Kategoriler yüklenirken hata oluştu');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  // handleCategoryClick removed as it's not being used

  if (loading) {
    return (
      <div className="top-bar">
        <div className="top-bar-content">
          <div className="loading-container" style={{ padding: '10px' }}>
            <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></div>
            <p className="loading-text" style={{ fontSize: '0.9rem', margin: '5px 0 0 0' }}>Kategoriler yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="top-bar">
      <div className="top-bar-content">
        <div className="categories-menu">
          {categories.map((category) => (
            <div key={category._id} className="category-item">
              <Link 
                to={`/products?category=${category._id}`}
                className={`category-link ${location.search.includes(`category=${category._id}`) ? 'active' : ''}`}
              >
                {category.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBar; 