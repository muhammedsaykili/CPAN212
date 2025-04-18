import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>E-Shop</h3>
          <p>Your one-stop shop for all your needs.</p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/profile">My Account</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Categories</h3>
          <ul className="footer-links">
            <li><Link to="/search?category=electronics">Electronics</Link></li>
            <li><Link to="/search?category=clothing">Clothing</Link></li>
            <li><Link to="/search?category=home">Home & Kitchen</Link></li>
            <li><Link to="/search?category=books">Books</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@eshop.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} E-Shop. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;