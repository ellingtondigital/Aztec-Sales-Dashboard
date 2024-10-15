const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route to handle forgot password
router.post('/forgot-password', authController.forgotPassword);

// Route to handle password reset
router.post('/reset-password', authController.resetPassword);

module.exports = router;
