const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

/**
 * Model/Schema for Employee Document in mongo
 */

// Schema Decleration
const employeeSchema = new Schema({

  /**
   *  Ensures that the Employee is linked to the business that
   * they work for.
   */

  company_id: {
    type: Schema.Types.ObjectId
    // TODO make this required
  },

  code: {
    type: String
  },

  name: {
    type: String,
    required: [true, "Full name is required"]
  },

  position: {
    type: String
  },

  rate: {
    type: String
  },

  phone_number: {
    type: String,
    required: [true, "Phone Number is required"]
  },

  address: {
    type: String
  }

});

// Create model from Schema
const Employee = mongoose.model('employee', employeeSchema);

module.exports = Employee;
