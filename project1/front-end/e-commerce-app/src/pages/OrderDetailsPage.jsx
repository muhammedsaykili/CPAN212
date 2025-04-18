import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { orderAPI } from '../api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import LoadingSpinner from '../components/LoadingSpinner';
import './OrderDetailsPage.css';

function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const data = await orderAPI.getOrder(id);
        setOrder(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load order details. Please try again.');
        setLoading(false);
        toast.error('Failed to load order details');
        console.error('Error fetching order:', err);
      }
    };

    if (currentUser && id) {
      fetchOrder();
    }
  }, [currentUser, id, toast]);

  const handleCancelOrder = async () => {
    try {
      const updatedOrder = await orderAPI.cancelOrder(id);
      setOrder(updatedOrder);
      toast.success('Order cancelled successfully');
    } catch (err) {
      toast.error('Failed to cancel order');
      console.error('Error cancelling order:', err);
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'pending':
        return 'status-pending';
      case 'processing':
        return 'status-processing';
      case 'shipped':
        return 'status-shipped';
      case 'delivered':
        return 'status-delivered';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !order) {
    return (
      <div className="order-details-page">
        <div className="order-details-container">
          <div className="error-message">
            <h2>Error Loading Order</h2>
            <p>{error || 'Order not found'}</p>
            <button 
              className="back-to-orders-btn"
              onClick={() => navigate('/orders')}
            >
              Back to Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-details-page">
      <div className="order-details-container">
        <div className="order-details-header">
          <div className="header-left">
            <button 
              className="back-btn"
              onClick={() => navigate('/orders')}
            >
              &larr; Back to Orders
            </button>
            <h1>Order Details</h1>
            <p className="order-id">Order #{order._id}</p>
            <p className="order-date">Placed on {formatDate(order.createdAt)}</p>
          </div>
          <div className={`order-status ${getStatusClass(order.status)}`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </div>
        </div>
        
        <div className="order-details-sections">
          <div className="order-details-left">
            <div className="order-items-section">
              <h2>Items</h2>
              <div className="order-items-list">
                {order.items.map(item => (
                  <div key={item.product._id} className="order-item">
                    <img 
                      src={item.product.imageUrl} 
                      alt={item.product.name} 
                      className="item-image"
                    />
                    <div className="item-details">
                      <h3 className="item-name">{item.product.name}</h3>
                      <p className="item-price">${item.price.toFixed(2)}</p>
                      <p className="item-quantity">Quantity: {item.quantity}</p>
                    </div>
                    <div className="item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {(order.status === 'pending' || order.status === 'processing') && (
              <div className="order-actions">
                <button 
                  className="cancel-order-btn"
                  onClick={handleCancelOrder}
                >
                  Cancel Order
                </button>
              </div>
            )}
          </div>
          
          <div className="order-details-right">
            <div className="order-summary">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="summary-row">
                <span>Tax:</span>
                <span>Included</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="shipping-info">
              <h2>Shipping Information</h2>
              <p className="shipping-name">
                {order.shipping.firstName} {order.shipping.lastName}
              </p>
              <p className="shipping-address">{order.shipping.address}</p>
              <p className="shipping-city">
                {order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}
              </p>
              <p className="shipping-email">{order.shipping.email}</p>
            </div>
            
            <div className="payment-info">
              <h2>Payment Information</h2>
              <p className="payment-method">Credit Card</p>
              <p className="card-info">
                Card ending in {order.payment.cardNumber.slice(-4)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsPage;