const Feedback = require('../models/Feedback');

// Get all feedback
exports.getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find();
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback', error: error.message });
  }
};

// Create a new feedback
exports.createFeedback = async (req, res) => {
  try {
    const { userId, feedback, rating } = req.body;
    const newFeedback = new Feedback({ userId, feedback, rating });
    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    res.status(400).json({ message: 'Error creating feedback', error: error.message });
  }
};