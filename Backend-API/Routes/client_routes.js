var express = require('express');
var router = express.Router();
var clients = require('../Database/controllers/client_controller');

/*
  Handles all the routing for '/clients' HTTPS requests.
*/

// GET all clients from the database
router.get('/clients', clients.findAll);

// POST request handler, creates a new client
router.post('/clients', clients.create);

// PUT request handler, updates a client
router.put('/clients:id', clients.update);

// DELETE request handler, deletes a spesific client
router.delete('/clients:id', clients.delete);

module.exports = router;
