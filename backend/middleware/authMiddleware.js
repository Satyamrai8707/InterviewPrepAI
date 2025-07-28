const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes
const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1]; // Extract token

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request
      req.user = await User.findById(decoded.id).select('-password');

      return next(); // ✅ Go to next middleware
    }

    // No token case
    res.status(401).json({ message: 'Not authorized, no token' });
  } catch (error) {
    res.status(401).json({
      message: 'Not authorized, token failed',
      error: error.message,
    });
  }
};

module.exports = { protect };
