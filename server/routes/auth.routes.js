const express = require('express');
const { login, register } = require('../controllers/auth');
const router = express.Router();

// Routes
router.post('/api/auth/login', login);
router.post('/api/auth/register', register);

module.exports = router;