const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

// Imported Ref Models
var User = require('./user_model');

/**
* Model/Schema for Company Document in mongo
*/

autoIncrement.initialize(mongoose.connection);

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
    type: String,
  },

  created: {
    type: Date,
    default: Date.now
  },

  inv_number: {
    type: Number,
    required: true,
    default: 0
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
// = companySchema.plugin(
//   autoIncrement.plugin, { model: 'company', field: 'inv_number', startAt: 9369 }
// );
