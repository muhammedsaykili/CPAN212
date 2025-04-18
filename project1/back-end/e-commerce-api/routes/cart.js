const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart
} = require('../controllers/cartController');
const { protect } = require('../middleware/auth');

router.get('/:userId', protect, getCart);
router.delete('/:userId', protect, clearCart);
router.post('/add', protect, addToCart);
router.post('/remove', protect, removeFromCart);
router.post('/update', protect, updateCartItem);

module.exports = router;