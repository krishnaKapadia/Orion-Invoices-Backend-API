var Task = require('../models/task_model');

/**
 * Handles all Task based CRUD actions through mongoose.
 * Called through task_routes.js
 */

// Gets all Task's
exports.findAll = (req, res) => {

  Task.find({}).then( (tasks) => {
    res.send(tasks);
  }).catch( (err) => {
    if(err) {
      res.status(500).send( { type: "GET", message: "Could not fetch tasks"});
    }
  })
}

// Gets a single specified task, matching the passed id
exports.findOne = (req, res) => {

  Task.findById(req.params.id).then( (task) => {
    if(task == null) res.status(500).send( { type: "GET", message: "Could not retrieve task" });
    else res.send({ type: "GET", message: "GET task successful", task });
  }).catch( (err) => {
    if(err) {
      res.status(500).send( { type: "GET", message: "Could not find task" });
    }
  })
}

// Creates a new task and adds it to the database
exports.create = (req, res) => {

  // Ensure that the request body is not empty
  if(!req.body) {
    res.status(500).send( { type: "POST", message: "POST Request must have task data"})
  } else {
    req.body.company_id = req.get('company_id');

    // Create the task in the database and return the created task
    Task.create(req.body).then( (task) => {
      res.send( { type: "POST", message: "Task Created", task});
    }).catch( (err) => {
      if(err) {
        res.status(500).send( { type: "GET", message: "Could not create Task", error: err.message });
      }
    })
  }
}

// Updates a single specified tasks's details matching the passed id
exports.update = (req, res) => {
  Task.findById(req.params.id).then( (task) => {
    if(task == null) res.status(500).send( { type: "GET", message: "Failed to find specified task" });
      else res.send({ type: "GET", message: "GET order successful", task });
  }).catch( (err) => {
    if(err) res.status(500).send( { type: "GET", message: "Failed to get task" });
  });
}

// Deletes a single specified task matching the passed id
exports.delete = (req, res) => {

  Task.remove( { _id: req.params.id }, (err, task) => {
    if(err) {
      res.status(500).send( { type: "DELETE", message: "Failed to delete task" });
    }else {
      res.send( { type: "DELETE", message: "Task successfully removed" });
    }
  });
}
