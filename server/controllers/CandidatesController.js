const Candidates = require('../models/Candidates');


// Get all candidates
exports.getCandidates = async (req, res) => {
  try {
    const candidates = await Candidates.find();
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching candidates', error: error.message });
  }
};

// Create a new candidate
exports.createCandidate = async (req, res) => {
  try {
    const { name, party, areaId } = req.body;
    const newCandidate = new Candidates({ name, party, areaId });
    const savedCandidate = await newCandidate.save();
    res.status(201).json(savedCandidate);
  } catch (error) {
    res.status(400).json({ message: 'Error creating candidate', error: error.message });
  }
};