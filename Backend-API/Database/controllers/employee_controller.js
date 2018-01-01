var Employee = require('../models/employee_model');

/**
 * Handles all Employee CRUD actions through mongoose.
   Called through employee_routes.js
 */

// Gets all employees from the database
exports.findAll = (req, res) => {
  console.log("Employee /GET");
  Employee.find({}).then( (employees) => {
    res.send(employees);
  })
}

// Creates a new employees and adds it to the database
exports.create = (req, res) => {

}

// Gets a single specified employees, matching the passed id
exports.findOne = (req, res) => {


}

// Updates a single specified employees's details matching the passed id
exports.update = (req, res) => {

}

// Deletes a single specified employees matching the passed id
exports.delete = (req, res) => {

}
