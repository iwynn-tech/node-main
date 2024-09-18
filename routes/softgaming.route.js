const express = require('express');
const softGamingController = require('../controllers/softGamingController')


const router = express.Router();

router.get('/get/**',softGamingController.get);
// router.get('/callback',softGamingController.callback);
router.post('/authentication',softGamingController.authentication);
router.get('/game-catalog',softGamingController.gameCatalog);
router.get('/game-category',softGamingController.gameCategory);

module.exports = router;
