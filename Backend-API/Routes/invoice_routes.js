var express = require('express');
var router = express.Router();
var invoices = require('../Database/controllers/invoice_controller');

/*
  Handles all the routing for '/tasks' HTTPS requests.
*/

// GET all invoices from the database
router.get('/invoices', invoices.findAll);

// GET a spesific invoice from the database
router.get('/invoices/:id', invoices.findOne);

// POST request handler, creates a new invoice
router.post('/invoices', invoices.create);

// PUT request handler, updates an invoice
router.put('/invoices/:id', invoices.update);

// DELETE request handler, deletes a spesific invoice
router.delete('/invoices/:id', invoices.delete);

module.exports = router;
