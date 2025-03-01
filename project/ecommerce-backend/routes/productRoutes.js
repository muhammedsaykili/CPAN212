// routes/productRoutes.js
const express = require('express');
const router = express.Router();

// Dummy products data for Phase 2
const dummyProducts = [
  {
    id: '1',
    name: 'Smartphone X',
    description: 'The latest smartphone with advanced features and long battery life. Perfect for everyday use with premium camera quality.',
    price: 999.99,
    category: 'Electronics',
    rating: 4.5,
    images: [
      '/images/smartphone-1.jpg',
      '/images/smartphone-2.jpg',
      '/images/smartphone-3.jpg'
    ],
    specs: {
      'Processor': 'Octa-core',
      'RAM': '8GB',
      'Storage': '256GB',
      'Screen': '6.5 inches',
      'Battery': '4500mAh'
    },
    reviews: [
      { user: 'John D.', rating: 5, comment: 'Amazing phone, worth every penny!' },
      { user: 'Sarah M.', rating: 4, comment: 'Great performance but a bit pricey.' }
    ]
  },
  {
    id: '2',
    name: 'Laptop Pro',
    description: 'Powerful laptop for professionals with high-performance specs and sleek design.',
    price: 1299.99,
    category: 'Electronics',
    rating: 4.8,
    images: [
      '/images/laptop-1.jpg',
      '/images/laptop-2.jpg'
    ],
    specs: {
      'Processor': 'Intel i9',
      'RAM': '16GB',
      'Storage': '1TB SSD',
      'Screen': '15.6 inches',
      'Graphics': 'NVIDIA RTX 3080'
    },
    reviews: [
      { user: 'Mike T.', rating: 5, comment: 'Perfect for gaming and work!' },
      { user: 'Lisa R.', rating: 5, comment: 'Extremely fast and reliable.' }
    ]
  },
  {
    id: '3',
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling headphones with crystal clear sound quality.',
    price: 249.99,
    category: 'Audio',
    rating: 4.6,
    images: [
      '/images/headphones-1.jpg',
      '/images/headphones-2.jpg'
    ],
    specs: {
      'Type': 'Over-ear',
      'Battery Life': '30 hours',
      'Noise Cancellation': 'Yes',
      'Connectivity': 'Bluetooth 5.0',
      'Weight': '250g'
    },
    reviews: [
      { user: 'Alex P.', rating: 4, comment: 'Great sound but could be more comfortable.' },
      { user: 'Emma W.', rating: 5, comment: 'Best headphones I\'ve ever owned!' }
    ]
  },
  {
    id: '4',
    name: 'Smart Watch',
    description: 'Track your fitness and stay connected with this feature-packed smart watch.',
    price: 199.99,
    category: 'Wearables',
    rating: 4.2,
    images: [
      '/images/watch-1.jpg',
      '/images/watch-2.jpg'
    ],
    specs: {
      'Display': '1.4 inch AMOLED',
      'Battery': '7 days',
      'Water Resistance': '5 ATM',
      'Sensors': 'Heart rate, GPS, Accelerometer',
      'Compatibility': 'iOS and Android'
    },
    reviews: [
      { user: 'David B.', rating: 4, comment: 'Good battery life but limited app selection.' },
      { user: 'Rachel K.', rating: 5, comment: 'Perfect fitness companion!' }
    ]
  },
  {
    id: '5',
    name: 'Coffee Maker',
    description: 'Brew perfect coffee with this programmable coffee maker with multiple settings.',
    price: 89.99,
    category: 'Home Appliances',
    rating: 4.4,
    images: [
      '/images/coffee-maker-1.jpg',
      '/images/coffee-maker-2.jpg'
    ],
    specs: {
      'Capacity': '12 cups',
      'Programmable': 'Yes',
      'Timer': 'Yes',
      'Auto Shut-off': 'Yes',
      'Filter Type': 'Permanent'
    },
    reviews: [
      { user: 'Thomas L.', rating: 5, comment: 'Makes delicious coffee every time!' },
      { user: 'Julia S.', rating: 4, comment: 'Good quality for the price.' }
    ]
  }
];

// Get all products
router.get('/', (req, res) => {
  res.json({ success: true, products: dummyProducts });
});

// Search products
router.get('/search', (req, res) => {
  // Log the search query as required for Phase 2
  console.log('Search query:', req.query);
  
  const { query, category } = req.query;
  let results = dummyProducts;
  
  // Filter by search query if provided
  if (query) {
    results = results.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  // Filter by category if provided
  if (category) {
    results = results.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  res.json({ success: true, products: results });
});

// Get product by ID
router.get('/:productId', (req, res) => {
  // Log the product ID as required for Phase 2
  console.log('Product ID requested:', req.params.productId);
  
  const product = dummyProducts.find(p => p.id === req.params.productId);
  
  if (product) {
    res.json({ success: true, product });
  } else {
    // If product not found in our dummy data, create a generic one with the requested ID
    const genericProduct = {
      id: req.params.productId,
      name: `Product ${req.params.productId}`,
      description: 'This is a detailed product description. Features high-quality materials and excellent craftsmanship.',
      price: 99.99,
      category: 'Miscellaneous',
      rating: 4.0,
      images: [
        '/images/placeholder-1.jpg',
        '/images/placeholder-2.jpg'
      ],
      specs: {
        'Weight': '200g',
        'Dimensions': '10 x 5 x 2 cm',
        'Color': 'Black',
        'Material': 'Premium Materials',
        'Warranty': '1 Year'
      },
      reviews: [
        { user: 'User1', rating: 4, comment: 'Great product!' },
        { user: 'User2', rating: 5, comment: 'Excellent value for money.' }
      ]
    };
    
    res.json({ success: true, product: genericProduct });
  }
});

module.exports = router;