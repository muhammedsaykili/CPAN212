import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import SearchBar from './SearchBar';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">E-Shop</Link>
        </div>
        
        <div className="navbar-search">
          <SearchBar onSearch={(query) => navigate(`/search?q=${query}`)} />
        </div>
        
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/search" className="nav-link">Products</Link>
        </div>
        
        <div className="navbar-actions">
          <Link to="/cart" className="cart-icon">
            <span className="cart-count">{getTotalItems()}</span>
            Cart
          </Link>
          
          {currentUser ? (
            <div className="user-menu">
              <button 
                className="user-menu-btn"
                onClick={toggleMenu}
              >
                {currentUser.name || 'Account'}
              </button>
              
              {menuOpen && (
                <div className="dropdown-menu">
                  <Link 
                    to="/profile" 
                    className="dropdown-item"
                    onClick={() => setMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button 
                    className="dropdown-item"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link register-btn">Register</Link>
            </div>
          )}
        </div>
        
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          Menu
        </button>
        
        {menuOpen && (
          <div className="mobile-menu">
            <Link 
              to="/" 
              className="mobile-menu-item"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/search" 
              className="mobile-menu-item"
              onClick={() => setMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/cart" 
              className="mobile-menu-item"
              onClick={() => setMenuOpen(false)}
            >
              Cart ({getTotalItems()})
            </Link>
            
            {currentUser ? (
              <>
                <Link 
                  to="/profile" 
                  className="mobile-menu-item"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
                <button 
                  className="mobile-menu-item"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="mobile-menu-item"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="mobile-menu-item"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;