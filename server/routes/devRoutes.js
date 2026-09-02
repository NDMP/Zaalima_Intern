const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

router.get(
  '/test/vendor-auth',
  protect,
  authorizeRoles('VENDOR'),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: 'Vendor authentication verified',
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        storeId: req.user.storeId,
      },
    });
  }
);

module.exports = router;
