const Candidate = require('../models/Candidate');

// Get all candidates
exports.getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching candidates', error: error.message });
  }
};


// Create a new candidate
exports.createCandidate = async (req, res) => {
  try {
    console.log('Received candidate data:', req.body);
    const { name, party, constituency, candidateId } = req.body;

    if (!name || !party || !constituency || !candidateId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Optional: check duplicate candidateId
    const existing = await Candidate.findOne({ candidateId });
    if (existing) {
      return res.status(400).json({ message: 'Candidate ID already exists' });
    }

    const newCandidate = new Candidate({ name, party, constituency, candidateId });
    const savedCandidate = await newCandidate.save();
    res.status(201).json(savedCandidate);
  } catch (error) {
    console.error('Error creating candidate:', error);
    res.status(400).json({ message: 'Error creating candidate', error: error.message });
  }
};     