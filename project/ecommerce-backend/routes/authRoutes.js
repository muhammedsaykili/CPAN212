const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  console.log('Login attempt:', req.body);
  
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email and password are required' 
    });
  }
  
  res.json({ 
    success: true, 
    message: 'Login successful (dummy data)',
    user: {
      id: '123',
      name: 'Test User',
      email: email
    }
  });
});

router.post('/register', (req, res) => {
  console.log('Registration data:', req.body);
  
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Name, email and password are required' 
    });
  }
  
  res.json({ 
    success: true, 
    message: 'Registration successful (dummy data)',
    user: {
      id: '123',
      name: name,
      email: email
    }
  });
});

router.post('/logout', (req, res) => {
  console.log('Logout request received');
  res.json({ success: true, message: 'Logged out successfully' });
});

module.exports = router;