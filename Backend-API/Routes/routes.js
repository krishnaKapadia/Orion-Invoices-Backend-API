const express         = require('express');
const router          = express.Router();
const Client          = require('../Database/models/client_model');
const client_routes   = require('./client_routes');
const task_routes     = require('./task_routes');
const employee_routes = require('./employee_routes');
const order_routes    = require('./order_routes');
/**
* Container to handle all Routes. Each route is split into a seperate route file
* and all CRUD database actions are delegated to their respective controllers.
*/

// Handles all /clients routes
router.use(client_routes);

// Handles all /tasks routes
router.use(task_routes);

// Handles all /employees
router.use(employee_routes);

// Handles all /orders routes
router.use(order_routes);

// TODO add more to handle all other routes

module.exports = router;
