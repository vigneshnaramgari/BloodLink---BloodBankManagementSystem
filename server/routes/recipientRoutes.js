const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const { createBloodRequest, getMyRequests } = require('../controllers/recipientController');

router.post('/request', protect, authorizeRoles('recipient'), createBloodRequest);

router.get('/my-requests', protect, authorizeRoles('recipient'), getMyRequests);

module.exports = router;
