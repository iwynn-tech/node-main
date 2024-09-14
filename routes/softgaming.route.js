const express = require('express');
const softGamingController = require('../controllers/softGamingController')


const router = express.Router();

router.get('/callback',softGamingController.callback);

module.exports = router;
