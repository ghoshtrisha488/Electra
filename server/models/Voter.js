// server/models/Voter.js
const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  voterId: { type: String, required: true, unique: true },
    aadharNo: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  photo: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Voter", voterSchema);




