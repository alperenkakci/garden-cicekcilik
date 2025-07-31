import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHome, FaSeedling, FaSearch } from 'react-icons/fa';

const Header = ({ cart }) => {
  const cartItemCount = cart.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <FaSeedling style={{ marginRight: '8px' }} />
          Garden Çiçekçilik
        </Link>
        
        <nav>
          <ul className="nav-menu">
            <li>
              <Link to="/" className="nav-link">
                <FaHome style={{ marginRight: '5px' }} />
                Ana Sayfa
              </Link>
            </li>
            <li>
              <Link to="/products" className="nav-link">
                Ürünler
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-link">
                Hakkımızda
              </Link>
            </li>
            <li>
              <Link to="/contact" className="nav-link">
                İletişim
              </Link>
            </li>
            <li>
              <Link to="/order-tracking" className="nav-link">
                <FaSearch style={{ marginRight: '5px' }} />
                Sipariş Takibi
              </Link>
            </li>

            <li>
              <Link to="/cart" className="nav-link">
                <div className="cart-icon">
                  <FaShoppingCart />
                  {cartItemCount > 0 && (
                    <span className="cart-badge">{cartItemCount}</span>
                  )}
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 