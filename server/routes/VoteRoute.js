const express = require('express');
const router = express.Router();
const voteController = require('../controllers/VoteController');
const authMiddleware = require('../middleware/AuthMiddleware');

// Admin: Get all votes
router.get('/', authMiddleware, voteController.getVotes);

// Voter: Cast a vote
router.post('/', authMiddleware, voteController.castVote);

module.exports = router;