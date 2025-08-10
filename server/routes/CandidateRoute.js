const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/CandidateController');

// Routes
router.get('/', candidateController.getCandidates);
router.post('/', candidateController.createCandidate);

module.exports = router;    