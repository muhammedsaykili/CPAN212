import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function CartPage() {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getTotalPrice 
  } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      removeFromCart(productId);
    }
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1>Your Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <Link to="/search" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.imageUrl} alt={item.name} />
                  </div>
                  
                  <div className="item-details">
                    <h2 className="item-name">
                      <Link to={`/product/${item.id}`}>{item.name}</Link>
                    </h2>
                    <p className="item-price">${item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="item-quantity">
                    <label htmlFor={`quantity-${item.id}`}>Qty:</label>
                    <input
                      type="number"
                      id={`quantity-${item.id}`}
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    />
                  </div>
                  
                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  
                  <button 
                    className="remove-item-btn"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <div className="summary-row">
                <span className="summary-label">Subtotal:</span>
                <span className="summary-value">${getTotalPrice().toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span className="summary-label">Shipping:</span>
                <span className="summary-value">Free</span>
              </div>
              
              <div className="summary-row total">
                <span className="summary-label">Total:</span>
                <span className="summary-value">${getTotalPrice().toFixed(2)}</span>
              </div>
              
              <div className="cart-actions">
                <Link to="/checkout" className="checkout-btn">
                  Proceed to Checkout
                </Link>
                
                <Link to="/search" className="continue-shopping-btn">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;