const express       = require('express');
const router        = express.Router();
const Client        = require('../Database/models/client_model');
const client_routes = require('./client_routes');
const task_routes   = require('./task_routes');

/**
* Container to handle all Routes. Each route is split into a seperate route file
* and all CRUD database actions are delegated to their respective controllers.
*/

// Handles all /client routes
router.use(client_routes);

// Handles all /task routes
router.use(task_routes);

// TODO add more to handle all other routes

module.exports = router;
