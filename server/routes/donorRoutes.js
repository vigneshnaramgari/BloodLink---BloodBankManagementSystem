const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const { scheduleDonation, getMyDonations } = require('../controllers/donorController');

router.post('/donate', protect, authorizeRoles('donor'), scheduleDonation);

router.get('/history', protect, authorizeRoles('donor'), getMyDonations);

module.exports = router;
