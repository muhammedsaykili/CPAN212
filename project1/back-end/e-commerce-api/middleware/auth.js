const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

exports.protect = async (req, res, next) => {
  let token;
  
  console.log('Request path:', req.originalUrl); 
  console.log('Auth headers:', req.headers.authorization ? 'Present' : 'Missing'); 

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    console.log('Token extracted from header');
  } else {
    console.log('No Bearer token in Authorization header');
  }

  if (!token) {
    console.log('No token provided - access denied');
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    console.log('Attempting to verify token');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token verified, user ID:', decoded.id);
    
    const user = await User.findById(decoded.id).select('-password');
    console.log('User lookup result:', user ? 'Found' : 'Not found');
    
    if (!user) {
      console.log('User from token not found in database');
      return next(new ErrorResponse('User not found', 404));
    }
    
    req.user = user;
    console.log('User attached to request, proceeding to route handler');
    next();
  } catch (err) {
    console.error('JWT verification error:', err.message);
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    console.log('Checking role authorization:', req.user.role, 'Required roles:', roles);
    if (!roles.includes(req.user.role)) {
      console.log('User role not authorized');
      return next(new ErrorResponse(`User role ${req.user.role} is not authorized to access this route`, 403));
    }
    console.log('Role authorization passed');
    next();
  };
};