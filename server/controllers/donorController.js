const Donation = require('../models/Donation');

const scheduleDonation = async (req, res) => {
  const { date, location, bloodType, units } = req.body;

  try {
    const donation = await Donation.create({
      donor: req.user._id,
      date: new Date(date),
      location,
      bloodType,
      units: parseInt(units),
      status: 'pending'
    });

    res.status(201).json(donation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ donor: req.user._id });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { scheduleDonation, getMyDonations };
