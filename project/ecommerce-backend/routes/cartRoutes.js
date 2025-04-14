// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get user's cart
router.get('/:userId', async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.params.userId });
    
    if (!cart) {
      // If no cart exists, create an empty one
      cart = new Cart({
        userId: req.params.userId,
        items: [],
        total: 0
      });
      await cart.save();
    }
    
    res.json({
      success: true,
      cart
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching cart'
    });
  }
});

// Add item to cart
router.post('/add', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  
  try {
    // Get product details
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // Find user's cart or create a new one
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
        total: 0
      });
    }
    
    // Check if item already exists in cart
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    
    if (itemIndex > -1) {
      // Update existing item quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      const newItem = {
        productId,
        quantity,
        price: product.price,
        name: product.name,
        image: product.images[0]
      };
      cart.items.push(newItem);
    }
    
    // Save cart (total will be calculated in pre-save hook)
    await cart.save();
    
    res.json({
      success: true,
      cart,
      message: 'Item added to cart'
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding to cart'
    });
  }
});

// Update cart item quantity
router.put('/update', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }
    
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }
    
    // Update quantity or remove if quantity is 0
    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }
    
    await cart.save();
    
    res.json({
      success: true,
      cart,
      message: 'Cart updated successfully'
    });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating cart'
    });
  }
});

// Clear cart
router.delete('/clear/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }
    
    cart.items = [];
    await cart.save();
    
    res.json({
      success: true,
      message: 'Cart cleared successfully'
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({
      success: false,
      message: 'Error clearing cart'
    });
  }
});

module.exports = router;