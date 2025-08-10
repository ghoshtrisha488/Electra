// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');
const connectdb = require('./config/db');

// ================== Connect to MongoDB ==================
connectdb();

// ================== Initialize Express ==================
const app = express();

// ================== Middleware ==================
app.use(cors({ origin: 'http://localhost:5173' })); // Allow frontend URL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ================== JWT Authentication Middleware ==================
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET || 'fyugjjjj7y76868', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// ================== Import Routes ==================
const authRoute = require('./routes/AuthRoute');
const areaRoute = require('./routes/AreaRoute');
const candidatesRoute = require('./routes/CandidatesRoute');
const electionRoute = require('./routes/ElectionRoutes');
const feedbackRoute = require('./routes/FeedbackRoute');
const reportRoute = require('./routes/ReportRoutes');
const voteRoute = require('./routes/VoteRoute');
const voterRoute = require('./routes/VoterRoute'); // ✅ Import normally, no (upload)

// ================== Example Protected Test Route ==================
app.post('/api/voter/test', authenticateToken, (req, res) => {
  res.send('Voter data received and authenticated.');
});

// ================== Use Routes ==================
app.use('/api/auth', authRoute);
app.use('/api/area', areaRoute);
app.use('/api/candidates', candidatesRoute);
app.use('/api/election', electionRoute);
app.use('/api/feedback', feedbackRoute);
app.use('/api/report', reportRoute);
app.use('/api/vote', voteRoute);
app.use('/api/voter', voterRoute);

// ================== Start Server ==================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
