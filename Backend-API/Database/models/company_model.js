const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Imported Ref Models
var User = require('./user_model');

/**
* Model/Schema for Client Document in mongo
*/

// Create schema that data will require as a minimum
const companySchema = new Schema({

  name: {
    type: String,
    required: [true, "Company name is required"]
  },

  address: {
    type: String
  },

  email: {
    type: String
  },

  created: {
    type: Date,
    default: Date.now
  },

  accounts: {
    type: [ {
      type: Schema.ObjectId, ref: 'User'
    }]
  }

});

// Create a model based off the schema
const Company = mongoose.model('company', companySchema);

module.exports = Company;
