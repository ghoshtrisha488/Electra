const express = require('express');
const router = express.Router();
const candidatesController = require('../controllers/CandidatesController');

// Routes
router.get('/candidates', candidatesController.getCandidates);
router.post('/candidates', candidatesController.createCandidate);

module.exports = router;