// routes/VoterRoute.js
const express = require('express');
const path = require('path');
const multer = require('multer');
const Voter = require('../models/Voter');

const router = express.Router();

// ================= Multer Config for Photo Upload =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// ================= Register a New Voter =================
router.post('/register', upload.single('photo'), async (req, res) => {
  try {
    const payload = req.body;

    // Add photo path if uploaded
    if (req.file) {
      payload.photo = `/uploads/${req.file.filename}`;
    }

    // ✅ Validate required fields (Added Aadhar)
    if (!payload.fullName || !payload.voterId || !payload.mobile || !payload.aadharNo) {
      return res.status(400).json({ message: 'Full name, Voter ID, Mobile, and Aadhar No are required' });
    }

    // ✅ Duplicate check (Voter ID, Mobile, or Aadhar No)
    const existing = await Voter.findOne({
      $or: [
        { voterId: payload.voterId },
        { mobile: payload.mobile },
        { aadharNo: payload.aadharNo }
      ]
    });

    if (existing) {
      return res.status(409).json({ message: 'Voter already exists (Aadhar/Voter ID/Mobile)' });
    }

    const voter = new Voter(payload);
    await voter.save();

    res.status(201).json({ success: true, voter });
  } catch (err) {
    console.error('Error registering voter:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ================= Search Voters =================
router.get("/search", async (req, res) => {
  try {
    const { name, voterId, mobile, aadharNo } = req.query;

    if (!name && !voterId && !mobile && !aadharNo) {
      return res.status(400).json({ message: "Please provide at least one search parameter" });
    }

    const query = {};

    if (name) {
      query.fullName = { $regex: name, $options: "i" }; // case-insensitive
    }
    if (voterId) {
      query.voterId = { $regex: voterId, $options: "i" };
    }
    if (mobile) {
      query.mobile = mobile;
    }
    if (aadharNo) {
      query.aadharNo = aadharNo;
    }

    const voters = await Voter.find(query);

    res.json(voters);
  } catch (error) {
    console.error("Error searching voters:", error);
    res.status(500).json({ message: "Error searching voters", error });
  }
});

module.exports = router;

