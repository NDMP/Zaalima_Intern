const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Account is inactive',
      });
    }

    if (user.role !== 'VENDOR') {
      return res.status(403).json({
        success: false,
        message: 'Vendor access is required',
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: 'Vendor login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        storeId: user.storeId,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    if (error.message === 'JWT_SECRET is not configured') {
      return res.status(500).json({
        success: false,
        message: 'Authentication configuration error: JWT_SECRET is not configured',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Unable to process login',
    });
  }
};

module.exports = { login };
