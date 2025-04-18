import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderAPI } from '../api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import LoadingSpinner from '../components/LoadingSpinner';
import './OrdersPage.css';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();
  const toast = useToast();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await orderAPI.getUserOrders(currentUser.id);
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load orders. Please try again.');
        setLoading(false);
        toast.error('Failed to load orders');
        console.error('Error fetching orders:', err);
      }
    };

    if (currentUser) {
      fetchOrders();
    }
  }, [currentUser, toast]);

  const handleCancelOrder = async (orderId) => {
    try {
      await orderAPI.cancelOrder(orderId);
      
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === orderId 
            ? { ...order, status: 'cancelled' } 
            : order
        )
      );
      
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
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <h1>Your Orders</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        {orders.length === 0 ? (
          <div className="no-orders">
            <p>You haven't placed any orders yet.</p>
            <Link to="/search" className="browse-products-btn">Browse Products</Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div className="order-details">
                    <h3>Order #{order._id.substring(0, 8)}</h3>
                    <p className="order-date">Placed on {formatDate(order.createdAt)}</p>
                  </div>
                  <div className={`order-status ${getStatusClass(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </div>
                </div>
                
                <div className="order-items">
                  {order.items.slice(0, 3).map(item => (
                    <div key={item.product._id} className="order-item">
                      <img 
                        src={item.product.imageUrl} 
                        alt={item.product.name} 
                        className="item-image"
                      />
                      <div className="item-details">
                        <h4>{item.product.name}</h4>
                        <p className="item-quantity">Qty: {item.quantity}</p>
                        <p className="item-price">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                  
                  {order.items.length > 3 && (
                    <p className="more-items">
                      +{order.items.length - 3} more items
                    </p>
                  )}
                </div>
                
                <div className="order-footer">
                  <div className="order-total">
                    <span>Total:</span>
                    <span className="total-price">${order.total.toFixed(2)}</span>
                  </div>
                  
                  <div className="order-actions">
                    <Link to={`/orders/${order._id}`} className="view-details-btn">
                      View Details
                    </Link>
                    
                    {(order.status === 'pending' || order.status === 'processing') && (
                      <button 
                        className="cancel-order-btn"
                        onClick={() => handleCancelOrder(order._id)}
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;