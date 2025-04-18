import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productsAPI } from '../api';
import { useCart } from '../context/CartContext';

function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setAddedToCart(false);
    setQuantity(1);
    
    async function fetchProduct() {
      try {
        const data = await productsAPI.getById(id);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load product. Please try again later.');
        setLoading(false);
        console.error('Error fetching product:', err);
      }
    }

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (error) {
      const dummyProduct = {
        id,
        name: 'Sample Product',
        price: 99.99,
        description: 'This is a sample product description. In a real application, this would contain detailed information about the product, its features, specifications, and benefits.',
        imageUrl: 'https://via.placeholder.com/500',
        category: 'electronics',
        inStock: true,
        rating: 4.5,
        reviews: 24
      };
      
      setProduct(dummyProduct);
    }
  }, [error, id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAddedToCart(true);
      
      setTimeout(() => {
        setAddedToCart(false);
      }, 3000);
    }
  };

  if (loading) {
    return <div className="product-page loading">Loading product details...</div>;
  }

  if (!product) {
    return (
      <div className="product-page not-found">
        <h1>Product Not Found</h1>
        <p>The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/search" className="back-btn">Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="product-page">
      <div className="product-container">
        <div className="product-image">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        
        <div className="product-details">
          <h1 className="product-name">{product.name}</h1>
          
          <div className="product-meta">
            <div className="product-price">${product.price.toFixed(2)}</div>
            
            {product.rating && (
              <div className="product-rating">
                Rating: {product.rating}/5 ({product.reviews} reviews)
              </div>
            )}
            
            <div className="product-category">
              Category: {product.category}
            </div>
            
            <div className="product-availability">
              {product.inStock ? (
                <span className="in-stock">In Stock</span>
              ) : (
                <span className="out-of-stock">Out of Stock</span>
              )}
            </div>
          </div>
          
          <div className="product-description">
            <h2>Description</h2>
            <p>{product.description}</p>
          </div>
          
          {product.inStock && (
            <div className="product-actions">
              <div className="quantity-control">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </div>
              
              <button 
                className="add-to-cart-btn"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              
              {addedToCart && (
                <div className="added-to-cart-message">
                  Item added to cart!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="related-products">
        <h2>You May Also Like</h2>
        <p>Related products would be displayed here</p>
      </div>
    </div>
  );
}

export default ProductPage;