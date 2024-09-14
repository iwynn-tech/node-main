const express = require('express');
const softGamingController = require('../controllers/softGamingRouter')


const router = express.Router();

router.get('/callback',softGamingController.callback);

module.exports = router;
