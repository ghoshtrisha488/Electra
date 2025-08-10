const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/FeedbackController');

// Routes
router.get('/feedback', feedbackController.getFeedback);
router.post('/feedback', feedbackController.createFeedback);

module.exports = router;