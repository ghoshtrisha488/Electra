const express = require('express');
const router = express.Router();
const reportController = require('../controllers/ReportController');

// Routes
router.get('/report', reportController.getReports);
router.post('/report', reportController.createReport);

module.exports = router;