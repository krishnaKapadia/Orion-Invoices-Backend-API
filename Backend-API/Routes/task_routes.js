var express = require('express');
var router = express.Router();
var tasks = require('../Database/controllers/task_controller');

/*
  Handles all the routing for '/tasks' HTTPS requests.
*/

// GET all clients from the database
router.get('/tasks', tasks.findAll);

// POST request handler, creates a new client
router.post('/tasks', tasks.create);

// PUT request handler, updates a client
router.put('/tasks:id', tasks.update);

// DELETE request handler, deletes a spesific client
router.delete('/tasks:id', tasks.delete);

module.exports = router;
