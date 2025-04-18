const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const ErrorResponse = require('../utils/errorResponse');

exports.createOrder = async (req, res, next) => {
  try {
    const { userId, items, shipping, payment, total } = req.body;
    
    if (req.user.id !== userId && req.user.role !== 'admin') {
      return next(new ErrorResponse(`Not authorized to create orders for other users`, 403));
    }
    
    if (!items || items.length === 0) {
      return next(new ErrorResponse('Orders must contain at least one item', 400));
    }
    
    for (const item of items) {
      const product = await Product.findById(item.product);
      
      if (!product) {
        return next(new ErrorResponse(`Product not found with id of ${item.product}`, 404));
      }
      
      if (!product.inStock) {
        return next(new ErrorResponse(`Product ${product.name} is out of stock`, 400));
      }
    }
    
    const order = await Order.create({
      user: userId,
      items,
      shipping,
      payment,
      total,
      status: 'pending'
    });
    
    await Cart.findOneAndUpdate(
      { user: userId },
      { $set: { items: [] } }
    );
    
    await order.populate('items.product');
    
    res.status(201).json({
      success: true,
      data: order
    });
    
    console.log('New order created:', { userId, total });
  } catch (err) {
    next(err);
  }
};

exports.getUserOrders = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.userId && req.user.role !== 'admin') {
      return next(new ErrorResponse(`Not authorized to view other users' orders`, 403));
    }
    
    const orders = await Order.find({ user: req.params.userId })
      .sort({ createdAt: -1 })
      .populate('items.product');
    
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (err) {
    next(err);
  }
};
e
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product user');
    
    if (!order) {
      return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404));
    }
    
    if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`Not authorized to view this order`, 403));
    }
    
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (err) {
    next(err);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404));
    }
    
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return next(new ErrorResponse(`Invalid status value: ${status}`, 400));
    }
    
    order.status = status;
    order.updatedAt = Date.now();
    
    await order.save();
    
    await order.populate('items.product user');
    
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Order.countDocuments();
    
    const orders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);
    
    const pagination = {};
    
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }
    
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }
    
    res.status(200).json({
      success: true,
      count: orders.length,
      pagination,
      data: orders
    });
  } catch (err) {
    next(err);
  }
};

exports.cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404));
    }
    
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`Not authorized to cancel this order`, 403));
    }
    
    if (order.status === 'delivered') {
      return next(new ErrorResponse('Cannot cancel an order that has been delivered', 400));
    }
    
    order.status = 'cancelled';
    order.updatedAt = Date.now();
    
    await order.save();
    
    await order.populate('items.product user');
    
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (err) {
    next(err);
  }
};