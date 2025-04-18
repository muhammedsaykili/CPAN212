const { body, validationResult } = require('express-validator');

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

exports.registerValidation = [
  body('name', 'Name is required').not().isEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password must be at least 6 characters').isLength({ min: 6 })
];

exports.loginValidation = [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists()
];

exports.productValidation = [
  body('name', 'Product name is required').not().isEmpty(),
  body('description', 'Description is required').not().isEmpty(),
  body('price', 'Price must be a number greater than 0').isFloat({ min: 0.01 }),
  body('category', 'Category is required').not().isEmpty()
];

exports.orderValidation = [
  body('items', 'Items are required').isArray({ min: 1 }),
  body('items.*.product', 'Product ID is required').not().isEmpty(),
  body('items.*.quantity', 'Quantity must be at least 1').isInt({ min: 1 }),
  body('shipping.firstName', 'First name is required').not().isEmpty(),
  body('shipping.lastName', 'Last name is required').not().isEmpty(),
  body('shipping.email', 'Valid email is required').isEmail(),
  body('shipping.address', 'Address is required').not().isEmpty(),
  body('shipping.city', 'City is required').not().isEmpty(),
  body('shipping.state', 'State is required').not().isEmpty(),
  body('shipping.zipCode', 'Zip code is required').not().isEmpty(),
  body('payment.cardNumber', 'Card number is required').not().isEmpty(),
  body('payment.cardName', 'Card name is required').not().isEmpty(),
  body('payment.expiryDate', 'Expiry date is required').not().isEmpty()
];