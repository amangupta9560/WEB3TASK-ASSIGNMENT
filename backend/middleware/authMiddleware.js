const { verifyAccessToken } = require('../utils/jwt');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied: No authentication token provided.'
    });
  }

  const decoded = verifyAccessToken(token);
  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: 'Access denied: Token is invalid or expired.'
    });
  }

  try {
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User belonging to this token no longer exists.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server authentication verification error.',
      error: error.message
    });
  }
};

const optionalAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    const decoded = verifyAccessToken(token);
    if (decoded) {
      try {
        const user = await User.findById(decoded.id).select('-password');
        if (user) {
          req.user = user;
        }
      } catch (err) {}
    }
  }

  next();
};

module.exports = {
  protect,
  optionalAuth
};
