// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      setMessage(data.message);
      console.log('Login response:', data);
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h1>Login</h1>
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default LoginPage;