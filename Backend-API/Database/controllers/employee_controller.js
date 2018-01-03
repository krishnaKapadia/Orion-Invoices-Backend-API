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

  Employee.findById(req.params.id).then( (employee) => {
    if(employee == null) res.status(500).send( { type: "GET", message: "Could not retrieve employee" });
    else res.send({ type: "GET", message: "GET employee successful", employee });
  }).catch( (err) => {
    if(err) {
      res.status(500).send( { type: "GET", message: "Could not find employee" });
    }
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
    }).catch( (err) => {
      if(err) {
        res.status(500).send( { type: "GET", message: "Could not create Employee", error: err.message });
      }
    })
  }
}

// Updates a single specified employees's details matching the passed id
exports.update = (req, res) => {
  // First get employee that matches id
  Employee.findById(req.params.id).then( (employee) => {
    if(employee == null) res.status(500).send( { type: "GET", message: "Could not retrieve employee matching that id" });
    else {
      // Edit the employee
      employee.code         = req.body.code;
      employee.first_name   = req.body.first_name;
      employee.last_name    = req.body.last_name;
      employee.position     = req.body.position;
      employee.rate         = req.body.rate;
      employee.address      = req.body.address;
      employee.phone_number = req.body.phone_number;

      // Save the newly modified employee
      employee.save().then( (employee) => {
        res.send( { type: "PUT", message: "Employee Updated", employee });
      }).catch( (error) => {
        res.status(500).send( { type: "GET", message: "Could not save employee", error });
      });
    }
  }).catch( (error) => {
    if(error) {
      res.status(500).send( { type: "GET", message: "Could not find employee", error });
    }
  })
}

// Deletes a single specified employees matching the passed id
exports.delete = (req, res) => {

  Employee.remove( { _id: req.params.id }, (err, employee) => {
    if(err) {
      res.status(500).send( { type: "DELETE", message: "Failed to delete Employee" });
    }else {
      res.send( { type: "DELETE", message: "Employee successfully removed" });
    }
  });
}
