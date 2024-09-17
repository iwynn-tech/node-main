const express = require('express');
const softGamingController = require('../controllers/softGamingController')


const router = express.Router();

router.get('/callback',softGamingController.callback);
router.post('/authentication',softGamingController.authentication);
router.get('/game-catalog',softGamingController.gameCatalog);

module.exports = router;
