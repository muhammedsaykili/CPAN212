import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ fullPage = false }) => {
  if (fullPage) {
    return (
      <div className="spinner-container full-page">
        <div className="spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;