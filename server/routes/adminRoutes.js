const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const controller = require('../controllers/adminController');

const router = express.Router();
router.use(protect, authorizeRoles('SUPER_ADMIN'));
router.get('/dashboard', controller.dashboard);
router.get('/users', controller.users);
router.patch('/users/:id/status', controller.setUserStatus);
router.get('/vendors', controller.vendors);
router.get('/stores', controller.stores);
router.patch('/stores/:id/status', controller.setStoreStatus);
module.exports = router;
