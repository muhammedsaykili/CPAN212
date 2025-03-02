const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the E-Commerce API' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));