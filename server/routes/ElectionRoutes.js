const express = require('express');
const router = express.Router();
const electionController = require('../controllers/ElectionController');

// Routes
router.get('/election', electionController.getElections);
router.post('/election', electionController.createElection);

module.exports = router;