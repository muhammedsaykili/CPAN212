// src/pages/ProductDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ProductDetailsPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${productId}`);
        const data = await response.json();
        
        if (data.success) {
          setProduct(data.product);
        } else {
          setError('Failed to load product details');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('An error occurred while loading product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <Link to="/search" className="back-button">Back to Search</Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="not-found-container">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/search" className="back-button">Back to Search</Link>
      </div>
    );
  }

  return (
    <div className="product-details-page">
      <div className="breadcrumb">
        <Link to="/">Home</Link> &gt; 
        <Link to="/search">Products</Link> &gt; 
        <span>{product.name}</span>
      </div>
      
      <div className="product-details-container">
        <div className="product-images-section">
          <div className="main-image">
            {product.images && product.images.length > 0 ? (
              <img 
                src={product.images[activeImage] || '/placeholder-product.jpg'} 
                alt={product.name} 
              />
            ) : (
              <div className="placeholder-image">
                <span>No Image Available</span>
              </div>
            )}
          </div>
          
          {product.images && product.images.length > 1 && (
            <div className="thumbnail-images">
              {product.images.map((image, index) => (
                <div 
                  key={index}
                  className={`thumbnail ${activeImage === index ? 'active' : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={image} alt={`${product.name} thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="product-info-section">
          <h1 className="product-name">{product.name}</h1>
          
          <div className="product-meta">
            <div className="product-id">Product ID: {product.id}</div>
            {product.rating && (
              <div className="product-rating">
                Rating: {product.rating}/5
                <div className="stars">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} className={star <= Math.round(product.rating) ? 'filled' : ''}>★</span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="product-price">
            ${product.price ? product.price.toFixed(2) : '0.00'}
          </div>
          
          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description || 'No description available'}</p>
          </div>
          
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="product-specifications">
              <h3>Specifications</h3>
              <table>
                <tbody>
                  {Object.entries(product.specs).map(([key, value]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          <div className="product-actions">
            <div className="quantity-selector">
              <span>Quantity:</span>
              <div className="quantity-controls">
                <button onClick={decrementQuantity} disabled={quantity <= 1}>-</button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                />
                <button onClick={incrementQuantity}>+</button>
              </div>
            </div>
            
            <button className="add-to-cart-button">
              Add to Cart
            </button>
            
            <button className="buy-now-button">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      
      {product.reviews && product.reviews.length > 0 && (
        <div className="product-reviews-section">
          <h2>Customer Reviews</h2>
          <div className="reviews-list">
            {product.reviews.map((review, index) => (
              <div key={index} className="review-card">
                <div className="review-header">
                  <div className="reviewer">{review.user}</div>
                  <div className="review-rating">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span key={star} className={star <= review.rating ? 'filled' : ''}>★</span>
                    ))}
                  </div>
                </div>
                <div className="review-content">{review.comment}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="related-products-section">
        <h2>Related Products</h2>
        <div className="related-products">
          {/* This would be populated with actual related products in a later phase */}
          <div className="placeholder-message">
            Related products will be shown here in a future update.
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;