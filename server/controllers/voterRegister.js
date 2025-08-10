// server/controllers/voterRegister.js
const Voter = require('../models/Voter'); // Make sure you have this schema in /models/Voter.js

module.exports = async (req, res) => {
  try {
    const newVoter = new Voter({
      fullName: req.body.fullName,
      dob: req.body.dob,
      gender: req.body.gender,
      address: req.body.address,
      state: req.body.state,
      district: req.body.district,
      voterId: req.body.voterId,
      email: req.body.email,
      mobile: req.body.mobile,
      photo: req.file ? `/uploads/${req.file.filename}` : null, // store photo path
    });

    await newVoter.save();
    res.status(201).json({ message: "✅ Voter registered successfully!" });
  } catch (err) {
    console.error("❌ Error saving voter:", err);
    res.status(500).json({ error: "Failed to register voter" });
  }
};
