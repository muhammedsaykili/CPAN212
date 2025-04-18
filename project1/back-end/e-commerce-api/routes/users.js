const express = require('express');
const router = express.Router();
const {
  getUser,
  updateUser,
  updatePassword,
  deleteUser,
  getUsers
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, authorize('admin'), getUsers);

router
  .route('/:id')
  .get(protect, getUser)
  .put(protect, updateUser)
  .delete(protect, authorize('admin'), deleteUser);

router
  .route('/:id/password')
  .put(protect, updatePassword);

module.exports = router;