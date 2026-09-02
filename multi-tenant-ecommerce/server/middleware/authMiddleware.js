const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  const authorization = req.headers.authorization;
  const bearerMatch =
    typeof authorization === 'string' && authorization.match(/^Bearer\s+([^\s]+)$/i);

  if (!bearerMatch) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, invalid or expired token',
    });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({
      success: false,
      message: 'Authentication configuration error: JWT_SECRET is not configured',
    });
  }

  let decoded;

  try {
    decoded = jwt.verify(bearerMatch[1], process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, invalid or expired token',
    });
  }

  if (!decoded.userId) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, invalid or expired token',
    });
  }

  try {
    const user = await User.findById(decoded.userId).select(
      '_id name email role storeId isActive'
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, invalid or expired token',
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Account is inactive',
      });
    }

    req.user = user;
    return next();
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, invalid or expired token',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Unable to authenticate request',
    });
  }
};

module.exports = { protect };
