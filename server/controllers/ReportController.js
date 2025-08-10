const Report = require('../models/Report');

// Get all reports
exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reports', error: error.message });
  }
};

// Create a new report
exports.createReport = async (req, res) => {
  try {
    const { title, electionId, fileUrl } = req.body;
    const newReport = new Report({ title, electionId, fileUrl });
    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (error) {
    res.status(400).json({ message: 'Error creating report', error: error.message });
  }
};