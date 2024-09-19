const express = require('express');
const softGamingController = require('../controllers/softGamingController')


const router = express.Router();

// api/v1/softgaming/
router.post('/get',softGamingController.get);
router.post('/user',softGamingController.user);
// router.post('/authentication',softGamingController.authentication);
// router.get('/game-catalog',softGamingController.gameCatalog);
// router.get('/game-category',softGamingController.gameCategory);

module.exports = router;
