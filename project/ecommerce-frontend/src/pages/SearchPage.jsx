// src/pages/SearchPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(`http://localhost:5000/api/products/search?query=${searchQuery}`);
      const data = await response.json();
      setSearchResults(data.products);
      console.log('Search results:', data);
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <h1>Search Products</h1>
      <form onSubmit={handleSearch}>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="btn">Search</button>
        </div>
      </form>
      
      <div className="search-results">
        {loading ? (
          <p>Loading...</p>
        ) : searchResults.length > 0 ? (
          <div className="product-grid">
            {searchResults.map((product) => (
              <div key={product.id} className="product-card">
                <h3>{product.name}</h3>
                <p>${product.price.toFixed(2)}</p>
                <p>Category: {product.category}</p>
                <Link to={`/product/${product.id}`} className="btn">View Details</Link>
              </div>
            ))}
          </div>
        ) : (
          <p>No products found. Try a different search term.</p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;