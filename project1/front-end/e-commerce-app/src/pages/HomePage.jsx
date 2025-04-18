import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI } from '../api';
import ProductCard from '../components/ProductCard';

function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await productsAPI.getAll();
        setFeaturedProducts(data.slice(0, 4)); 
        setLoading(false);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        setLoading(false);
        console.error('Error fetching products:', err);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    if (error) {
      const dummyProducts = [
        { id: '1', name: 'Smartphone XL', price: 599.99, imageUrl: 'https://via.placeholder.com/150' },
        { id: '2', name: 'Wireless Headphones', price: 149.99, imageUrl: 'https://via.placeholder.com/150' },
        { id: '3', name: 'Smart Watch', price: 299.99, imageUrl: 'https://via.placeholder.com/150' },
        { id: '4', name: 'Laptop Pro', price: 1299.99, imageUrl: 'https://via.placeholder.com/150' },
      ];
      setFeaturedProducts(dummyProducts);
    }
  }, [error]);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Our E-commerce Store</h1>
          <p>Find the best products at the best prices</p>
          <Link to="/search" className="btn">Shop Now</Link>
        </div>
      </section>

      <section className="featured-products">
        <h2>Featured Products</h2>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          <Link to="/search?category=electronics" className="category-card">
            <h3>Electronics</h3>
          </Link>
          <Link to="/search?category=clothing" className="category-card">
            <h3>Clothing</h3>
          </Link>
          <Link to="/search?category=home" className="category-card">
            <h3>Home &amp; Kitchen</h3>
          </Link>
          <Link to="/search?category=books" className="category-card">
            <h3>Books</h3>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;