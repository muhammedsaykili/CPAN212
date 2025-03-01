// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProfilePage() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/${userId}`);
        const data = await response.json();
        
        if (data.success) {
          setUserData(data.user);
        } else {
          setError('Failed to load user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('An error occurred while loading user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!userData) {
    return <p>No user data found</p>;
  }

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="profile-card">
        <div className="profile-header">
          <h2>{userData.name}</h2>
          <p>{userData.email}</p>
        </div>
        
        <div className="profile-section">
          <h3>Shipping Address</h3>
          <p>{userData.address.street}</p>
          <p>{userData.address.city}, {userData.address.state} {userData.address.zip}</p>
        </div>
        
        <div className="profile-section">
          <h3>Order History</h3>
          {userData.orders && userData.orders.length > 0 ? (
            <table className="order-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {userData.orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.date}</td>
                    <td>${order.total.toFixed(2)}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No orders found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;