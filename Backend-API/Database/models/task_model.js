const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

/**
 * Model/Schema for Task Document in Mongo
 */

// Create Schema for minimum requried data
const taskSchema = new Schema({
  /**
   *  Ensures that the task is linked to the user that
   * created it.
   */

  user_id: {
    type: Schema.Types.ObjectId
    // TODO make this required
  },

  desc: {
    type: String,
    required: [true, "Task must have a name/description"]
  }
});

// Create model from schema
const Task = mongoose.model('task', taskSchema);

module.exports = Task;
