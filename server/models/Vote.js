const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  voterId: {
    type: String,
    required: true,
  },
  candidateId: {
    type: String,
    required: true,
  },
  electionId: {
    type: String,
    required: true,
  },
  votedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Vote', voteSchema);