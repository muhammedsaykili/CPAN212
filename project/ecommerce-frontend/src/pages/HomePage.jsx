// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="container">
      <header>
        <h1>Welcome to Our E-Commerce Store</h1>
        <p>Your one-stop shop for all your online shopping needs</p>
      </header>
      
      <section className="features">
        <h2>Our Features</h2>
        <div className="feature-grid">
          <div className="feature">
            <h3>Wide Product Selection</h3>
            <p>Browse thousands of products across multiple categories</p>
          </div>
          <div className="feature">
            <h3>Fast Shipping</h3>
            <p>Get your orders delivered quickly and reliably</p>
          </div>
          <div className="feature">
            <h3>Secure Payments</h3>
            <p>Shop with confidence using our secure payment options</p>
          </div>
        </div>
      </section>
      
      <section className="cta">
        <h2>Get Started Today</h2>
        <div className="buttons">
          <Link to="/login" className="btn">Login</Link>
          <Link to="/register" className="btn">Register</Link>
          <Link to="/search" className="btn">Search Products</Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;