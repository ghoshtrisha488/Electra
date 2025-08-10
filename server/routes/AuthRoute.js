const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/AuthController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register',authCtrl.register);
router.post('/login',authCtrl.login);
router.post('/dashboard',authMiddleware,authCtrl.dashboard);

module.exports = router;