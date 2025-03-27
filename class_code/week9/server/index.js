// Import necessary libraries
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// Initialize the Express app
const app = express();

// Define port from .env or default to 8000
const PORT = process.env.PORT || 8000;

// MongoDB connection URI from .env
const MONGODB_URI = process.env.MONGODB_PORT;

// Connect to MongoDB using Mongoose
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Example route
app.get('/', (req, res) => {
  res.send('Hello World!');
});
