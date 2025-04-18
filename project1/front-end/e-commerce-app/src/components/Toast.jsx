import React, { useState, useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) {
        setTimeout(onClose, 300); 
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`toast toast-${type} ${visible ? 'visible' : 'hidden'}`}>
      <div className="toast-message">{message}</div>
      <button className="toast-close" onClick={() => setVisible(false)}>×</button>
    </div>
  );
};

export default Toast;