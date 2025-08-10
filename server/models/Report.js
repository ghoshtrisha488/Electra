const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  electionId: {
    type: String,
    required: true,
  },
  generatedAt: {
    type: Date,
    default: Date.now,
  },
  fileUrl: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('Report', reportSchema);