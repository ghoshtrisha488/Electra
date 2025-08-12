const Voter = require('../models/Voter');
const fs = require('fs');
const path = require('path');
const pdfkit = require('pdfkit');

// Create Voter
exports.createVoter = async (req, res) => {
  try {
    const { voterId, name, age, gender, Father_Name, House_No } = req.body;
    if (!voterId || !name || !age || !gender) {
      return res.status(400).json({ message: 'All fields (voterId, name, age, gender, Father_Name, House_No) are required' });
    }
    if (isNaN(age) || age < 18) {
      return res.status(400).json({ message: 'Age must be a number and at least 18' });
    }
    const image = req.file ? req.file.filename : null;
    const voter = new Voter({ voterId, name, age, gender, image, Father_Name, House_No});
    await voter.save();
    res.status(201).json(voter);
  } catch (error) {
    res.status(400).json({ message: 'Error creating voter', error: error.message });
  }
};

// View Voters
exports.getVoters = async (req, res) => {
  try {
    const voters = await Voter.find();
    res.status(200).json(voters);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching voters', error: error.message });
  }
};

// Update Voter
exports.updateVoter = async (req, res) => {
  try {
    const { voterId, name, age, gender, Father_Name, House_No } = req.body;
    const voter = await Voter.findById(req.params.id);
    if (!voter) return res.status(404).json({ message: 'Voter not found' });

    // Delete old image if a new one is uploaded
    if (req.file && voter.image) {
      const filepath = path.join(__dirname, '../uploads', voter.image);
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
    }
    voter.voterId = voterId || voter.voterId;
    voter.name = name || voter.name;
    voter.age = age || voter.age;
    voter.gender = gender || voter.gender;
    if (req.file) voter.image = req.file.filename;
    const updated = await voter.save();
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Error updating voter', error: error.message });
  }
};

// Delete Voter
exports.deleteVoter = async (req, res) => {
  try {
    const voter = await Voter.findById(req.params.id);
    if (!voter) return res.status(404).json({ message: 'Voter not found' });

    // Delete old image
    if (voter.image) {
      const filepath = path.join(__dirname, '../uploads', voter.image);
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
    }
    await voter.remove();
    res.status(200).json({ message: 'Voter deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting voter', error: error.message });
  }
};

// ... Existing functions (createVoter, etc.) ...

exports.downloadEVoterCard = async (req, res) => {
  try {
    const voterId = req.params.voterId; // Get voter ID from URL
    const voter = await Voter.findOne({ voterId });
    if (!voter) return res.status(404).json({ message: 'Voter not found' });

    // Create PDF document
    const doc = new pdfkit();
    const pdfPath = path.join(__dirname, '../uploads/e-voter-card.pdf'); // Temporary PDF file path
    doc.pipe(fs.createStream(pdfPath));

    // Add content to PDF
    doc.fontSize(25).text('e-Voter Card', { align: 'center' });
    doc.moveDown();
    doc.fontSize(18).text(`Name: ${voter.name}`);
    doc.text(`Voter ID: ${voter.voterId}`);
    doc.text(`Age: ${voter.age}`);
    doc.text(`Gender: ${voter.gender}`);
    if (voter.image) {
      doc.image(path.join(__dirname, '../uploads', voter.image), {
        fit: [100, 100],
        align: 'center',
        valign: 'center'
      });
    }
    doc.end();

    // Download the PDF
    res.download(pdfPath, 'e-voter-card.pdf', (err) => {
      if (err) {
        console.error('Error downloading PDF:', err);
      } else {
        fs.unlinkSync(pdfPath); // Delete temporary PDF file after download
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating e-Voter Card', error: error.message });
  }
};