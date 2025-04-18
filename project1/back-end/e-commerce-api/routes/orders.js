const express = require('express');
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getOrder,
  updateOrderStatus,
  getAllOrders,
  cancelOrder
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');
const { orderValidation, validate } = require('../middleware/validator');

router
  .route('/')
  .get(protect, authorize('admin'), getAllOrders)
  .post(protect, orderValidation, validate, createOrder);

router.get('/user/:userId', protect, getUserOrders);

router
  .route('/:id')
  .get(protect, getOrder)
  .put(protect, authorize('admin'), updateOrderStatus);

router.put('/:id/cancel', protect, cancelOrder);

module.exports = router;