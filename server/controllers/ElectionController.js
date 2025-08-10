const Election = require('../models/Election');

// Get all elections
exports.getElections = async (req, res) => {
  try {
    const elections = await Election.find();
    res.status(200).json(elections);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching elections', error: error.message });
  }
};

// Create a new election
exports.createElection = async (req, res) => {
  try {
    const { name, date, areaId, status } = req.body;
    const newElection = new Election({ name, date, areaId, status });
    const savedElection = await newElection.save();
    res.status(201).json(savedElection);
  } catch (error) {
    res.status(400).json({ message: 'Error creating election', error: error.message });
  }
};