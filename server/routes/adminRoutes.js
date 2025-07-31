const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const {
  getAllRequests,
  updateRequestStatus,
  getAllDonations,
  updateDonationStatus,
  getInventory,
  getAllUsers,
  deleteUser,
  getDashboardStats,
} = require('../controllers/adminController');

router.use(protect, authorizeRoles('admin'));

router.get('/stats', getDashboardStats);
router.get('/requests', getAllRequests);
router.put('/requests/:id', updateRequestStatus);

router.get('/donations', getAllDonations);
router.put('/donations/:id', updateDonationStatus);

router.get('/inventory', getInventory);

router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

module.exports = router;
