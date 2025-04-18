import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../api';

function ProfilePage() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    async function fetchProfile() {
      try {
        if (!currentUser.id) {
          throw new Error('User ID not found');
        }
        
        const data = await userAPI.getProfile(currentUser.id);
        setProfile(data);
        
        setName(data.name || '');
        setEmail(data.email || '');
        setAddress(data.address || '');
        setPhone(data.phone || '');
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load profile. Please try again later.');
        console.error('Error fetching profile:', err);
        
        const dummyProfile = {
          id: currentUser?.id || 'temp-id',
          name: currentUser?.name || 'John Doe',
          email: currentUser?.email || 'john@example.com',
          address: '',
          phone: ''
        };
        
        setProfile(dummyProfile);
        setName(dummyProfile.name);
        setEmail(dummyProfile.email);
        setAddress(dummyProfile.address);
        setPhone(dummyProfile.phone);
        
        setLoading(false);
      }
    }

    fetchProfile();
  }, [currentUser, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleEditClick = () => {
    if (profile) {
      setName(profile.name || '');
      setEmail(profile.email || '');
      setAddress(profile.address || '');
      setPhone(profile.phone || '');
    }
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setUpdateError(null);
    setIsEditing(false);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setUpdateError(null);
    
    try {
      if (!currentUser || !currentUser.id) {
        throw new Error('User not authenticated');
      }
      
      if (!name.trim() || !email.trim()) {
        setUpdateError('Name and email are required');
        return;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setUpdateError('Invalid email format');
        return;
      }
      
      const updatedProfile = {
        ...profile,
        name,
        email,
        address,
        phone
      };
      
      console.log('Updating profile with:', updatedProfile);
      
      const response = await userAPI.updateProfile(currentUser.id, updatedProfile);
      console.log('Update response:', response);
      
      setProfile(updatedProfile);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      setUpdateError(`Failed to update profile: ${err.message || 'Unknown error'}`);
      console.error('Error updating profile:', err);
    }
  };

  if (loading) {
    return <div className="profile-page loading">Loading profile...</div>;
  }

  if (!profile) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <h1>Profile Error</h1>
          <div className="error-message">
            {error || 'Unable to load profile. Please try again later.'}
          </div>
          <button 
            className="logout-btn"
            onClick={handleLogout}
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>Your Profile</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="profile-form">
            {updateError && <div className="error-message">{updateError}</div>}
            
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            
            <div className="form-actions">
              <button type="submit" className="save-btn">Save Changes</button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-info">
            <div className="info-row">
              <span className="label">Name:</span>
              <span className="value">{profile?.name || 'Not provided'}</span>
            </div>
            
            <div className="info-row">
              <span className="label">Email:</span>
              <span className="value">{profile?.email || 'Not provided'}</span>
            </div>
            
            <div className="info-row">
              <span className="label">Address:</span>
              <span className="value">{profile?.address || 'Not provided'}</span>
            </div>
            
            <div className="info-row">
              <span className="label">Phone:</span>
              <span className="value">{profile?.phone || 'Not provided'}</span>
            </div>
            
            <div className="profile-actions">
              <button 
                className="edit-btn"
                onClick={handleEditClick}
              >
                Edit Profile
              </button>
              
              <button 
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        )}
        
        <div className="orders-section">
          <h2>Order History</h2>
          <p>You have no orders yet.</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;