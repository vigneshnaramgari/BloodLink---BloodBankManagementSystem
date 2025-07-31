const Donation = require('../models/Donation');
const Request = require('../models/Request');
const Inventory = require('../models/Inventory');
const User = require('../models/User');

const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate('recipient', 'name email');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const request = await Request.findById(id);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    request.status = status;
    await request.save();

    res.json({ message: `Request ${status}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllDonations = async (req, res) => {
  try {
    console.log('Fetching all donations...');
    const donations = await Donation.find().populate('donor', 'name');
    console.log(`Found ${donations.length} donations`);
    res.json(donations);
  } catch (err) {
    console.error('Error in getAllDonations:', err);
    res.status(500).json({ message: err.message });
  }
};

const updateDonationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const donation = await Donation.findById(id);
    if (!donation) return res.status(404).json({ message: 'Donation not found' });

    donation.status = status;
    await donation.save();

    if (status === 'approved') {
      const bloodType = donation.bloodType;
      const units = donation.units;

      const existing = await Inventory.findOne({ bloodType });
      if (existing) {
        existing.units += units;
        await existing.save();
      } else {
        await Inventory.create({ bloodType, units });
      }
    }

    res.json({ message: `Donation ${status}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDonors = await User.countDocuments({ role: 'donor' });
    const totalRecipients = await User.countDocuments({ role: 'recipient' });
    const pendingRequests = await Request.countDocuments({ status: 'pending' });
    const pendingDonations = await Donation.countDocuments({ status: 'pending' });
    const totalInventory = await Inventory.aggregate([
      { $group: { _id: null, total: { $sum: '$units' } } }
    ]);

    res.json({
      totalUsers,
      totalDonors,
      totalRecipients,
      pendingRequests,
      pendingDonations,
      totalInventory: totalInventory[0]?.total || 0
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllRequests,
  updateRequestStatus,
  getAllDonations,
  updateDonationStatus,
  getInventory,
  getAllUsers,
  deleteUser,
  getDashboardStats,
};
