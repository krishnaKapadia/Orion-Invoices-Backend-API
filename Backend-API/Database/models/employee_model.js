const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

/**
 * Model/Schema for Employee Document in mongo
 */

// Schema Decleration
const employeeSchema = new Schema({
  code: {
    type: String
  },

  first_name: {
    type: String,
    required: [true, "First Name is required"]
  },

  last_name: {
    type: String,
    required: [true, "Last Name is required"]
  },

  position: {
    type: String
  },

  rate: {
    type: Number
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
