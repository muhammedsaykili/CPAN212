const Cart = require('../models/Cart');
const Product = require('../models/Product');
const ErrorResponse = require('../utils/errorResponse');

exports.getCart = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.userId && req.user.role !== 'admin') {
      return next(new ErrorResponse(`Not authorized to access this cart`, 403));
    }
    
    let cart = await Cart.findOne({ user: req.params.userId }).populate('items.product');
    
    if (!cart) {
      cart = {
        user: req.params.userId,
        items: [],
        total: 0
      };
    }
    
    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (err) {
    next(err);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const { userId, productId, quantity } = req.body;
    
    if (req.user.id !== userId && req.user.role !== 'admin') {
      return next(new ErrorResponse(`Not authorized to modify this cart`, 403));
    }
    
    const product = await Product.findById(productId);
    
    if (!product) {
      return next(new ErrorResponse(`Product not found with id of ${productId}`, 404));
    }
    
    if (!product.inStock) {
      return next(new ErrorResponse(`Product ${product.name} is out of stock`, 400));
    }
    
    let cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{
          product: productId,
          quantity,
          price: product.price
        }]
      });
    } else {
      const itemIndex = cart.items.findIndex(
        item => item.product.toString() === productId
      );
      
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({
          product: productId,
          quantity,
          price: product.price
        });
      }
      
      cart.updatedAt = Date.now();
    }
    
    await cart.save();
    
    await cart.populate('items.product');
    
    res.status(200).json({
      success: true,
      data: cart
    });
    
    console.log('Adding to cart:', { userId, productId, quantity });
  } catch (err) {
    next(err);
  }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    const { userId, productId } = req.body;
    
    if (req.user.id !== userId && req.user.role !== 'admin') {
      return next(new ErrorResponse(`Not authorized to modify this cart`, 403));
    }
    
    const cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
      return next(new ErrorResponse(`Cart not found for user ${userId}`, 404));
    }
    
    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );
    
    cart.updatedAt = Date.now();
    
    await cart.save();
    
    await cart.populate('items.product');
    
    res.status(200).json({
      success: true,
      data: cart
    });
    
    console.log('Removing from cart:', { userId, productId });
  } catch (err) {
    next(err);
  }
};

exports.updateCartItem = async (req, res, next) => {
  try {
    const { userId, productId, quantity } = req.body;
    
    if (req.user.id !== userId && req.user.role !== 'admin') {
      return next(new ErrorResponse(`Not authorized to modify this cart`, 403));
    }
    
    if (quantity <= 0) {
      return next(new ErrorResponse('Quantity must be greater than 0', 400));
    }
    
    const cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
      return next(new ErrorResponse(`Cart not found for user ${userId}`, 404));
    }
    
    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );
    
    if (itemIndex === -1) {
      return next(new ErrorResponse(`Item not found in cart`, 404));
    }
    
    const product = await Product.findById(productId);
    if (!product.inStock) {
      return next(new ErrorResponse(`Product ${product.name} is out of stock`, 400));
    }
    
    cart.items[itemIndex].quantity = quantity;
    cart.updatedAt = Date.now();
    
    await cart.save();
    
    await cart.populate('items.product');
    
    res.status(200).json({
      success: true,
      data: cart
    });
    
    console.log('Updating cart item:', { userId, productId, quantity });
  } catch (err) {
    next(err);
  }
};

exports.clearCart = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.userId && req.user.role !== 'admin') {
      return next(new ErrorResponse(`Not authorized to modify this cart`, 403));
    }
    
    const cart = await Cart.findOne({ user: req.params.userId });
    
    if (!cart) {
      return next(new ErrorResponse(`Cart not found for user ${req.params.userId}`, 404));
    }
    
    cart.items = [];
    cart.updatedAt = Date.now();
    
    await cart.save();
    
    res.status(200).json({
      success: true,
      data: cart
    });
    
    console.log('Cart cleared for user:', req.params.userId);
  } catch (err) {
    next(err);
  }
};