const express = require('express');
const { checkIsLogged } = require('../middlewares/logged');
const { changePassword, changeEmail, getInfo, deleteAccount } = require('../controllers/user');
const router = express.Router();

// Routes
router.get('/api/user/info', checkIsLogged, getInfo);
router.delete('/api/user/account', checkIsLogged, deleteAccount);
router.put('/api/user/change/password', checkIsLogged, changePassword);
router.put('/api/user/change/email', checkIsLogged, changeEmail);

module.exports = router;