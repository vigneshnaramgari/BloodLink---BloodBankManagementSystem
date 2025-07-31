const Request = require('../models/Request');

const createBloodRequest = async (req, res) => {
  const { bloodType, units, location, reason } = req.body;

  try {
    const newRequest = await Request.create({
      recipient: req.user._id,
      bloodType,
      units,
      location,
      reason,
      status: 'pending'
    });

    res.status(201).json(newRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ recipient: req.user._id });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createBloodRequest, getMyRequests };
