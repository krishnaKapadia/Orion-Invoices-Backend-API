var express = require('express');
var router = express.Router();
var employees = require('../Database/controllers/employee_controller');

/*
  Handles all the routing for '/employees' HTTPS requests.
  Called through employee_routes.js
*/

// TODO make sure that only employees that are linked to the users company can be shown

// GET all employees from the database
router.get('/employees', employees.findAll);

// GET a single employee from the database
router.get('/employees/:id', employees.findOne);

// POST request handler, creates a new employee
router.post('/employees', employees.create);

// PUT request handler, updates a employee
router.put('/employees/:id', employees.update);

// DELETE request handler, deletes a spesific employee
router.delete('/employees/:id', employees.delete);

module.exports = router;
