var Task = require('../models/task_model');

/**
 * Handles all Task based CRUD actions through mongoose.
 * Called through task_routes.js
 */

// Gets all Task's
exports.findAll = (req, res) => {
  Task.find({}).then( (tasks) => {
    res.send(tasks);
  })
}

// Creates a new task and adds it to the database
exports.create = (req, res) => {

}

// Gets a single specified task, matching the passed id
exports.findOne = (req, res) => {


}

// Updates a single specified tasks's details matching the passed id
exports.update = (req, res) => {

}

// Deletes a single specified task matching the passed id
exports.delete = (req, res) => {

}
