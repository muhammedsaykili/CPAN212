import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productsAPI } from '../api';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const productsPerPage = 12;

  // Get the search query from URL params
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';

  useEffect(() => {
    // Reset page when search criteria change
    setPage(1);
  }, [query, category]);

  useEffect(() => {
    // Fetch products based on search query
    async function searchProducts() {
      setLoading(true);
      try {
        // In a real app, you would call different API endpoints based on whether
        // we have a query, category, or both
        let data;
        if (query) {
          data = await productsAPI.search(query);
        } else if (category) {
          // This would be a different API call in a real app
          data = await productsAPI.getAll();
          // Filter by category client-side for this demo
          data = data.filter(product => product.category === category);
        } else {
          data = await productsAPI.getAll();
        }
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        setLoading(false);
        console.error('Error searching products:', err);
      }
    }

    searchProducts();
  }, [query, category]);

  // For demo purposes, if API fails, use dummy data
  useEffect(() => {
    if (error) {
      // Expanded dummy data with more products per category
      const dummyProducts = [
        // Electronics
        { id: '1', name: 'Smartphone XL', price: 599.99, category: 'electronics', imageUrl: 'https://via.placeholder.com/150', rating: 4.5, reviews: 120 },
        { id: '2', name: 'Wireless Headphones', price: 149.99, category: 'electronics', imageUrl: 'https://via.placeholder.com/150', rating: 4.3, reviews: 85 },
        { id: '3', name: 'Smart Watch', price: 299.99, category: 'electronics', imageUrl: 'https://via.placeholder.com/150', rating: 4.0, reviews: 67 },
        { id: '4', name: 'Laptop Pro', price: 1299.99, category: 'electronics', imageUrl: 'https://via.placeholder.com/150', rating: 4.8, reviews: 42 },
        { id: '5', name: 'Bluetooth Speaker', price: 79.99, category: 'electronics', imageUrl: 'https://via.placeholder.com/150', rating: 4.2, reviews: 58 },
        { id: '6', name: 'Gaming Console', price: 499.99, category: 'electronics', imageUrl: 'https://via.placeholder.com/150', rating: 4.7, reviews: 93 },
        { id: '7', name: 'Wireless Earbuds', price: 129.99, category: 'electronics', imageUrl: 'https://via.placeholder.com/150', rating: 4.4, reviews: 76 },
        { id: '8', name: 'Digital Camera', price: 649.99, category: 'electronics', imageUrl: 'https://via.placeholder.com/150', rating: 4.6, reviews: 47 },
        
        // Clothing
        { id: '9', name: 'Cotton T-shirt', price: 19.99, category: 'clothing', imageUrl: 'https://via.placeholder.com/150', rating: 4.2, reviews: 38 },
        { id: '10', name: 'Denim Jeans', price: 49.99, category: 'clothing', imageUrl: 'https://via.placeholder.com/150', rating: 4.1, reviews: 52 },
        { id: '11', name: 'Winter Jacket', price: 129.99, category: 'clothing', imageUrl: 'https://via.placeholder.com/150', rating: 4.5, reviews: 33 },
        { id: '12', name: 'Leather Boots', price: 89.99, category: 'clothing', imageUrl: 'https://via.placeholder.com/150', rating: 4.3, reviews: 29 },
        { id: '13', name: 'Summer Dress', price: 39.99, category: 'clothing', imageUrl: 'https://via.placeholder.com/150', rating: 4.4, reviews: 45 },
        { id: '14', name: 'Hoodie Sweatshirt', price: 34.99, category: 'clothing', imageUrl: 'https://via.placeholder.com/150', rating: 4.2, reviews: 62 },
        { id: '15', name: 'Formal Suit', price: 199.99, category: 'clothing', imageUrl: 'https://via.placeholder.com/150', rating: 4.6, reviews: 27 },
        { id: '16', name: 'Wool Sweater', price: 59.99, category: 'clothing', imageUrl: 'https://via.placeholder.com/150', rating: 4.3, reviews: 41 },
        
        // Home & Kitchen
        { id: '17', name: 'Coffee Maker', price: 69.99, category: 'home', imageUrl: 'https://via.placeholder.com/150', rating: 4.4, reviews: 73 },
        { id: '18', name: 'Blender', price: 49.99, category: 'home', imageUrl: 'https://via.placeholder.com/150', rating: 4.2, reviews: 56 },
        { id: '19', name: 'Toaster Oven', price: 89.99, category: 'home', imageUrl: 'https://via.placeholder.com/150', rating: 4.3, reviews: 47 },
        { id: '20', name: 'Knife Set', price: 119.99, category: 'home', imageUrl: 'https://via.placeholder.com/150', rating: 4.7, reviews: 32 },
        { id: '21', name: 'Cookware Set', price: 199.99, category: 'home', imageUrl: 'https://via.placeholder.com/150', rating: 4.5, reviews: 41 },
        { id: '22', name: 'Standing Mixer', price: 249.99, category: 'home', imageUrl: 'https://via.placeholder.com/150', rating: 4.8, reviews: 37 },
        { id: '23', name: 'Bedding Set', price: 89.99, category: 'home', imageUrl: 'https://via.placeholder.com/150', rating: 4.4, reviews: 52 },
        { id: '24', name: 'Towel Set', price: 39.99, category: 'home', imageUrl: 'https://via.placeholder.com/150', rating: 4.2, reviews: 63 },
        
        // Books
        { id: '25', name: 'The Great Novel', price: 14.99, category: 'books', imageUrl: 'https://via.placeholder.com/150', rating: 4.5, reviews: 128 },
        { id: '26', name: 'Cooking Masterclass', price: 29.99, category: 'books', imageUrl: 'https://via.placeholder.com/150', rating: 4.7, reviews: 83 },
        { id: '27', name: 'Business Strategy Guide', price: 24.99, category: 'books', imageUrl: 'https://via.placeholder.com/150', rating: 4.3, reviews: 56 },
        { id: '28', name: 'History of Civilizations', price: 34.99, category: 'books', imageUrl: 'https://via.placeholder.com/150', rating: 4.6, reviews: 42 },
        { id: '29', name: 'Science Explained', price: 19.99, category: 'books', imageUrl: 'https://via.placeholder.com/150', rating: 4.4, reviews: 67 },
        { id: '30', name: 'Fantasy Adventure Series', price: 39.99, category: 'books', imageUrl: 'https://via.placeholder.com/150', rating: 4.8, reviews: 215 },
        { id: '31', name: 'Poetry Collection', price: 12.99, category: 'books', imageUrl: 'https://via.placeholder.com/150', rating: 4.2, reviews: 31 },
        { id: '32', name: 'Fitness & Nutrition Guide', price: 22.99, category: 'books', imageUrl: 'https://via.placeholder.com/150', rating: 4.5, reviews: 74 }
      ];
      
      // Filter dummy data based on query or category
      let filtered = dummyProducts;
      
      if (query) {
        filtered = dummyProducts.filter(product => 
          product.name.toLowerCase().includes(query.toLowerCase())
        );
      } else if (category) {
        filtered = dummyProducts.filter(product => 
          product.category === category
        );
      }
      
      setProducts(filtered);
    }
  }, [error, query, category]);

  // Handle search form submission
  const handleSearch = (searchQuery) => {
    setSearchParams({ q: searchQuery });
  };

  // Pagination logic
  const indexOfLastProduct = page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>
          {query 
            ? `Search Results for "${query}"` 
            : category 
              ? `Browse ${category.charAt(0).toUpperCase() + category.slice(1)}`
              : 'All Products'}
        </h1>
        <SearchBar onSearch={handleSearch} initialValue={query} />
      </div>

      <div className="search-results">
        {loading ? (
          <LoadingSpinner />
        ) : products.length > 0 ? (
          <>
            <div className="products-grid">
              {currentProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  disabled={page === 1} 
                  onClick={() => setPage(page => Math.max(1, page - 1))}
                  className="pagination-btn"
                >
                  Previous
                </button>
                <span className="page-info">
                  Page {page} of {totalPages}
                </span>
                <button 
                  disabled={page === totalPages} 
                  onClick={() => setPage(page => Math.min(totalPages, page + 1))}
                  className="pagination-btn"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="no-results">
            <p>No products found matching your search.</p>
            <button 
              onClick={() => setSearchParams({})}
              className="clear-search-btn"
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;