const express = require('express');
const { checkIsLogged } = require('../middlewares/logged');
const { addFavorite, deleteFavorite, getFavorites } = require('../controllers/favorites');
const router = express.Router();

// Routes
router.get('/api/user/favorites', checkIsLogged, getFavorites);
router.delete('/api/user/favorite', checkIsLogged, deleteFavorite);
router.post('/api/user/favorite', checkIsLogged, addFavorite);

module.exports = router;