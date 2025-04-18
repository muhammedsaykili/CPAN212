const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(helmet()); 
app.use(xss()); 
app.use(hpp()); 

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 100 
});
app.use(limiter);

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the E-Commerce API' });
});

app.use(errorHandler);

const seedDatabase = async () => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      const Product = require('./models/Product');
      const User = require('./models/User');
      const bcrypt = require('bcryptjs');

      const productCount = await Product.countDocuments();
      const adminExists = await User.findOne({ role: 'admin' });
      
      if (productCount === 0) {
        console.log('Seeding database with initial products...');
        
        const seedProducts = [
          { 
            name: 'Smartphone XL', 
            price: 599.99, 
            description: 'A high-end smartphone with the latest features.', 
            category: 'electronics',
            imageUrl: 'https://via.placeholder.com/400',
            inStock: true,
            rating: 4.5,
            reviews: 120
          },
          { 
            name: 'Wireless Headphones', 
            price: 149.99, 
            description: 'Premium wireless headphones with noise cancellation.', 
            category: 'electronics',
            imageUrl: 'https://via.placeholder.com/400',
            inStock: true,
            rating: 4.3,
            reviews: 85
          },
          { 
            name: 'Smart Watch', 
            price: 299.99, 
            description: 'Track your fitness and stay connected with this smart watch.', 
            category: 'electronics',
            imageUrl: 'https://via.placeholder.com/400',
            inStock: true,
            rating: 4.0,
            reviews: 67
          },
          { 
            name: 'Laptop Pro', 
            price: 1299.99, 
            description: 'Powerful laptop for work and gaming.', 
            category: 'electronics',
            imageUrl: 'https://via.placeholder.com/400',
            inStock: true,
            rating: 4.8,
            reviews: 42
          },
          { 
            name: 'Cotton T-shirt', 
            price: 19.99, 
            description: 'Comfortable cotton t-shirt in various colors.', 
            category: 'clothing',
            imageUrl: 'https://via.placeholder.com/400',
            inStock: true,
            rating: 4.2,
            reviews: 38
          },
          { 
            name: 'Denim Jeans', 
            price: 49.99, 
            description: 'Classic denim jeans with modern fit.', 
            category: 'clothing',
            imageUrl: 'https://via.placeholder.com/400',
            inStock: true,
            rating: 4.1,
            reviews: 52
          }
        ];
        
        await Product.insertMany(seedProducts);
        console.log('Database seeded with initial products!');
      }

      const seedDatabase = async () => {
        try {
          const productCount = await Product.countDocuments();
          
          if (productCount === 0) {
            console.log('Seeding database with products...');
            
            // Import the seed data
            const seedProducts = require('./seedData');
            
            await Product.insertMany(seedProducts);
            console.log(`Database seeded with ${seedProducts.length} products!`);
          }
        } catch (err) {
          console.error('Error seeding database:', err);
        }
      };

      if (!adminExists) {
        console.log('Creating admin user...');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);
        
        await User.create({
          name: 'Admin User',
          email: 'admin@example.com',
          password: hashedPassword,
          role: 'admin'
        });
        
        console.log('Admin user created!');
      }
    }
  } catch (err) {
    console.error('Error seeding database:', err);
  }
};

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  
  if (process.env.NODE_ENV !== 'production') {
    await seedDatabase();
  }
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  
  // Call the seedDatabase function when the server starts
  await seedDatabase();
});

