// routes/userRoutes.js
const express = require('express');
const router = express.Router();

// Dummy user data for Phase 2
const dummyUsers = [
  {
    id: '123',
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345'
    },
    orders: [
      { id: 'ORD-001', date: '2023-01-15', total: 125.99, status: 'Delivered' },
      { id: 'ORD-002', date: '2023-02-20', total: 79.50, status: 'Processing' }
    ]
  },
  {
    id: '456',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    address: {
      street: '456 Oak Ave',
      city: 'Somewhere',
      state: 'NY',
      zip: '67890'
    },
    orders: [
      { id: 'ORD-003', date: '2023-01-05', total: 249.99, status: 'Delivered' },
      { id: 'ORD-004', date: '2023-03-10', total: 34.97, status: 'Shipped' }
    ]
  }
];

// Get user by ID
router.get('/:userId', (req, res) => {
  // Log the user ID as required for Phase 2
  console.log('User ID requested:', req.params.userId);
  
  const user = dummyUsers.find(u => u.id === req.params.userId);
  
  if (user) {
    res.json({ success: true, user });
  } else {
    // If user not found in our dummy data, create a generic one with the requested ID
    const genericUser = {
      id: req.params.userId,
      name: 'Sample User',
      email: 'user@example.com',
      address: {
        street: '123 Example St',
        city: 'Sampletown',
        state: 'ST',
        zip: '12345'
      },
      orders: [
        { id: 'ORD-SAMPLE-1', date: '2023-01-10', total: 99.99, status: 'Delivered' },
        { id: 'ORD-SAMPLE-2', date: '2023-02-15', total: 45.50, status: 'Processing' }
      ]
    };
    
    res.json({ success: true, user: genericUser });
  }
});

// Update user profile (for future phases)
router.put('/:userId', (req, res) => {
  console.log('Update request for user:', req.params.userId);
  console.log('Update data:', req.body);
  
  res.json({ 
    success: true, 
    message: 'User profile updated successfully (dummy response)',
    user: {
      ...req.body,
      id: req.params.userId
    }
  });
});

module.exports = router;