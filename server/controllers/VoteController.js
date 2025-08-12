const Vote = require('../models/Vote');

// Get all votes (Admin view with voter & candidate details)
exports.getVotes = async (req, res) => {
  try {
    const votes = await Vote.find()
      .populate('voterId', 'name email') // Show name & email of voter
      .populate('candidateId', 'name party') // Show name & party of candidate
      .populate('electionId', 'title date'); // Show election title & date

    res.status(200).json({
      success: true,
      count: votes.length,
      votes
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching votes', error: error.message });
  }
};

// Cast a new vote
exports.castVote = async (req, res) => {
  try {
    const { voterId, candidateId, electionId } = req.body;

    // Validate required fields
    if (!voterId || !candidateId || !electionId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the voter already voted in this election
    const existingVote = await Vote.findOne({ voterId, electionId });
    if (existingVote) {
      return res.status(400).json({ message: 'You have already voted in this election' });
    }

    // Save new vote
    const newVote = new Vote({ voterId, candidateId, electionId });
    const savedVote = await newVote.save();

    res.status(201).json({
      success: true,
      message: 'Vote cast successfully',
      vote: savedVote
    });
  } catch (error) {
    res.status(400).json({ message: 'Error casting vote', error: error.message });
  }
};