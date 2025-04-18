import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../api';

function CheckoutPage() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  useEffect(() => {
    if (currentUser) {
      setEmail(currentUser.email || '');

      if (currentUser.name) {
        const nameParts = currentUser.name.split(' ');
        setFirstName(nameParts[0] || '');
        setLastName(nameParts.slice(1).join(' ') || '');
      }
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!firstName || !lastName || !email || !address || !city || !state || !zipCode) {
      setError('Please fill in all required shipping fields');
      return;
    }

    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      setError('Please fill in all payment information');
      return;
    }

    setLoading(true);

    const orderData = {
      items: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price
      })),
      shipping: {
        firstName,
        lastName,
        email,
        address,
        city,
        state,
        zipCode
      },
      payment: {
        cardNumber: cardNumber.replace(/\s/g, ''), 
        cardName,
        expiryDate
      },
      total: getTotalPrice()
    };

    console.log('Submitting order:', orderData); 

    try {
      const response = await orderAPI.createOrder(orderData);

      if (!response.ok) {
        const message = await response.text();
        throw new Error(`Server responded with ${response.status}: ${message}`);
      }

      clearCart();
      navigate('/');
      alert('Order placed successfully! Thank you for your purchase.');
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1>Checkout</h1>
        {error && <div className="error-message">{error}</div>}

        <div className="checkout-content">
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-section">
              <h2>Shipping Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address *</label>
                <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="state">State *</label>
                  <input type="text" id="state" value={state} onChange={(e) => setState(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="zipCode">Zip Code *</label>
                  <input type="text" id="zipCode" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2>Payment Information</h2>

              <div className="form-group">
                <label htmlFor="cardNumber">Card Number *</label>
                <input type="text" id="cardNumber" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="cardName">Name on Card *</label>
                <input type="text" id="cardName" value={cardName} onChange={(e) => setCardName(e.target.value)} required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiryDate">Expiry Date *</label>
                  <input type="text" id="expiryDate" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="cvv">CVV *</label>
                  <input type="text" id="cvv" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
                </div>
              </div>
            </div>

            <div className="checkout-summary">
              <h2>Order Summary</h2>
              <div className="summary-items">
                {cartItems.map(item => (
                  <div key={item.id} className="summary-item">
                    <span>{item.name} × {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="summary-total">
                <strong>Total:</strong>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
