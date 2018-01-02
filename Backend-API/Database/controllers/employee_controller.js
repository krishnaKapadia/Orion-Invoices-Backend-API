var Employee = require('../models/employee_model');

/**
 * Handles all Employee CRUD actions through mongoose.
   Called through employee_routes.js
 */

// Gets all employees from the database
exports.findAll = (req, res) => {

  Employee.find({}, (err, data) => {
    if(err || data === null) {
      err.status(500).send({ type: "GET", message: "Could not retrieve employees" });
    }
  }).then( (employees) => {
    res.send({ type: "GET", message: "GET all employees successful", employees })
  });

}

// Gets a single specified employee, matching the passed employee id
exports.findOne = (req, res) => {
  console.log(req.params.code);

  Employee.findById(req.params.code, (err, employee) => {
    if(err || employee === null) {
      res.status(500).send( { type: "GET", message: "Could not retrieve employee, may not exist with matching id" });
    }
  }).then( (employee) => {
    res.send({ type: "GET", message: "GET employee successful", employee });
  })
}

// Creates a new employee and adds it to the database
exports.create = (req, res) => {

  // Ensure that the request body is not empty
  if(!req.body) {
    res.status(500).send( { type: "POST", message: "POST Request must have employee data"})
  } else {
    // Create the employee in the database and return the created employee
    Employee.create(req.body).then( (employee) => {
      res.send( { type: "POST", message: "Employee Created", employee});
    })
  }
}

// Updates a single specified employees's details matching the passed id
exports.update = (req, res) => {
  // First get employee that matches id

  Employee.findByID(req.params.id, (err, employee) => {
    if(err || employee === null) {
      res.status(500).send( { type: "GET", message: "Could not retrieve employee matching that id" });
    }
  }).then( (employee) => {
    // Edit the employee
    employee = req.body;

    // Save the newly modified employee
    employee.save( (err) => {
      if (err) {
        res.status(500).send( { type: "PUT", message: "Failed to update Employee"});
      } else {
        res.send( { type: "PUT", message: "Employee Updated", employee });
      }
    });
  })
}

// Deletes a single specified employees matching the passed id
exports.delete = (req, res) => {

  Employee.remove( { _id: req.params.id }, (err, employee) => {
    if(err) {
      res.status(500).send( { type: "DELETE", message: "Failed to delete Employee" });
    }else {
      res.send( { type: "DELETE", message: "Employee successfully removed", employee });
    }
  });
}
