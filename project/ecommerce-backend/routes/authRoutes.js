// routes/authRoutes.js
const express = require('express');
const router = express.Router();

// Login route
router.post('/login', (req, res) => {
  // Log the login attempt data as required for Phase 2
  console.log('Login attempt:', req.body);
  
  // For Phase 2, we're just returning a success response with dummy data
  // In a later phase, we would validate credentials against a database
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

// Register route
router.post('/register', (req, res) => {
  // Log the registration data as required for Phase 2
  console.log('Registration data:', req.body);
  
  // For Phase 2, we're just returning a success response
  // In a later phase, we would save this data to a database
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

// Logout route (for completeness)
router.post('/logout', (req, res) => {
  // In a real implementation, this would invalidate tokens or session
  console.log('Logout request received');
  res.json({ success: true, message: 'Logged out successfully' });
});

module.exports = router;