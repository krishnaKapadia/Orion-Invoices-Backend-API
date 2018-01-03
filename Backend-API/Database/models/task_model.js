const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

/**
 * Model/Schema for Task Document in Mongo
 */

// Create Schema for minimum requried data
const taskSchema = new Schema({
  desc: {
    type: String,
    required: [true, "Task must have a name/description"]
  }
});

// Create model from schema
const Task = mongoose.model('task', taskSchema);

module.exports = Task;
