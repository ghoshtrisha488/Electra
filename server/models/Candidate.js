const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  party: {
    type: String,
    required: true,
    trim: true,
  },
  constituency: {
    type: String,
    required: true,
    trim: true,
  },
  candidateId: {
    type: String,
    required: true,
    unique: true,  // Optional: candidateId should be unique
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Candidate', candidateSchema);   