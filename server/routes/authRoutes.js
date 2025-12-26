const express = require('express');
const router = express.Router();
const { registerUser, authUser, forgotPassword } = require('../controllers/authController');

router.post('/signup', registerUser);
router.post('/login', authUser);
router.post('/forgot-password', forgotPassword);

module.exports = router;
