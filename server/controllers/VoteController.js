const Vote = require('../models/Vote');

// Get all votes
exports.getVotes = async (req, res) => {
  try {
    const votes = await Vote.find();
    res.status(200).json(votes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching votes', error: error.message });
  }
};

// Cast a new vote
exports.castVote = async (req, res) => {
  try {
    const { voterId, candidateId, electionId } = req.body;
    const newVote = new Vote({ voterId, candidateId, electionId });
    const savedVote = await newVote.save();
    res.status(201).json(savedVote);
  } catch (error) {
    res.status(400).json({ message: 'Error casting vote', error: error.message });
  }
};