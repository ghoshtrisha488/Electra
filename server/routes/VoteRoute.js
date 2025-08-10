const express = require('express');
const router = express.Router();
const voteController = require('../controllers/VoteController');
const authMiddleware = require('../middleware/AuthMiddleware');

// Protected routes
router.get('/vote', authMiddleware, voteController.getVotes); // Admin only
router.post('/vote', authMiddleware, voteController.castVote); // Voter only

module.exports = router;