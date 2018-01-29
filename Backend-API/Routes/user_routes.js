var express = require('express');
var router = express.Router();
var users = require('../Database/controllers/user_controller');

/*
  Handles all the routing for '/users' HTTPS requests.
*/

// GET all users from the database
router.get('/users', users.findAll);

// GET a single user from the database
router.get('/users/:code', users.findOne);

// POST to check if request body is a valid user, used for login
router.post('/users/login', users.login)

// POST request handler, creates a new user
router.post('/users', users.create);

// PUT request handler, updates a user
router.put('/users/:code', users.update);

// DELETE request handler, deletes a spesific user
router.delete('/users/:code', users.delete);

module.exports = router;
