const express = require('express');
const router = express.Router();
const electionController = require('../controllers/ElectionController');

// Mock election data (replace with MongoDB query in production)
const election = [
  { electionId: 'E001', name: 'General Election 2025', date: '2025-10-15', status: 'Upcoming' },
  { electionId: 'E002', name: 'State Election - North', date: '2025-11-20', status: 'Upcoming' },
  { electionId: 'E003', name: 'Local Election 2024', date: '2024-12-01', status: 'Completed' },
];

// Routes
router.get('/election', electionController.getElections);
router.post('/election', electionController.createElection);

module.exports = router;