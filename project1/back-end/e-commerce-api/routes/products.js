const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');
const { productValidation, validate } = require('../middleware/validator');

router.get('/search', searchProducts);

router
  .route('/')
  .get(getProducts)
  .post(protect, authorize('admin'), productValidation, validate, createProduct);

router
  .route('/:id')
  .get(getProduct)
  .put(protect, authorize('admin'), productValidation, validate, updateProduct)
  .delete(protect, authorize('admin'), deleteProduct);

module.exports = router;