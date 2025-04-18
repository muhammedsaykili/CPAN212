const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const bcrypt = require('bcryptjs');

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }
    
    if (req.user.id !== req.params.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`Not authorized to access this user's profile`, 403));
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
    
    console.log('Profile request for user:', req.params.id);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`Not authorized to update this user's profile`, 403));
    }
    
    const { name, email, address, phone } = req.body;
    const fieldsToUpdate = { name, email, address, phone };
    
    Object.keys(fieldsToUpdate).forEach(key => 
      fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
    );
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: fieldsToUpdate },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
    
    console.log('Profile update for user:', req.params.id, fieldsToUpdate);
  } catch (err) {
    next(err);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`Not authorized to update this user's password`, 403));
    }
    
    const user = await User.findById(req.params.id).select('+password');
    
    if (!user) {
      return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }
    
    const { currentPassword, newPassword } = req.body;
    
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return next(new ErrorResponse('Current password is incorrect', 401));
    }
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }
    
    await user.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    next(err);
  }
};