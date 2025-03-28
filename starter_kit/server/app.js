const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const recipesRouter = require('./routes/recipes_router');

const app = express();
const PORT = 8001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/recipe_app')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

app.use('/recipe', recipesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});