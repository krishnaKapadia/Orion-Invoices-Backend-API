var express = require('express');
var router = express.Router();
var tasks = require('../Database/controllers/task_controller');

/*
  Handles all the routing for '/tasks' HTTPS requests.
*/

// GET all tasks from the database
router.get('/tasks', tasks.findAll);

// GET a spesific client from the database
router.get('/tasks/:id', tasks.findOne);

// POST request handler, creates a new task
router.post('/tasks', tasks.create);

// PUT request handler, updates a task
// router.put('/tasks/:id', tasks.update);

// DELETE request handler, deletes a spesific task
router.delete('/tasks/:id', tasks.delete);

module.exports = router;
