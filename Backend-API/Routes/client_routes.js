var express = require('express');
var router = express.Router();
var clients = require('../Database/controllers/client_controller');

/*
  Handles all the routing for '/clients' HTTPS requests.
*/

// GET all clients from the database
router.get('/clients', clients.findAll);

// GET a single client from the database
router.get('/clients/:code', clients.findOne);

// POST request handler, creates a new client
router.post('/clients', clients.create);

// PUT request handler, updates a client
router.put('/clients/:code', clients.update);

// DELETE request handler, deletes a spesific client
router.delete('/clients/:code', clients.delete);

module.exports = router;
