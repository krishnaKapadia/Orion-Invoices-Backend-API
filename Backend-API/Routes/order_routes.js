var express = require('express');
var router = express.Router();
var orders = require('../Database/controllers/order_controller');

/*
  Handles all the routing for '/orders' HTTPS requests.
*/

// GET all orders from the database
router.get('/orders', orders.findAll);

// GET a single order from the database
router.get('/orders/:id', orders.findOne);

// POST request handler, creates a new order
router.post('/orders', orders.create);

// PUT request handler, updates a order
router.put('/orders/:id', orders.update);

// DELETE request handler, deletes a spesific order
router.delete('/orders/:id', orders.delete);

module.exports = router;
