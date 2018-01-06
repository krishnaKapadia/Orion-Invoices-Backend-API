var express = require('express');
var router = express.Router();
var companies = require('../Database/controllers/company_controller');

/*
  Handles all the routing for '/companies' HTTPS requests.
*/

// GET all companies from the database
router.get('/companies', companies.findAll);

// GET a single companie from the database
router.get('/companies/:code', companies.findOne);

// POST request handler, creates a new companie
router.post('/companies', companies.create);

// PUT request handler, updates a companie
router.put('/companies/:code', companies.update);

// DELETE request handler, deletes a spesific companie/
router.delete('/companies/:code', companies.delete);

module.exports = router;
