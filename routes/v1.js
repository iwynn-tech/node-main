const express = require('express');
const router = express.Router();

// Importing v1 routes
// const usersRoutes = require('./users');
const softgamingRoute = require('./softgaming.route');

// Define the routes for v1
router.use('/softgaming', softgamingRoute);

module.exports = router;
