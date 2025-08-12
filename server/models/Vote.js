const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  voterId: {
    type: mongoose.Schema.Types.ObjectId, // link to Voter model
    ref: 'Voter',
    required: true,
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId, // link to Candidate model
    ref: 'Candidate',
    required: true,
  },
  electionId: {
    type: mongoose.Schema.Types.ObjectId, // link to Election model
    ref: 'Election',
    required: true,
  },
  votedAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure a voter can only vote once per election
voteSchema.index({ voterId: 1, electionId: 1 }, { unique: true });

module.exports = mongoose.model('Vote', voteSchema);