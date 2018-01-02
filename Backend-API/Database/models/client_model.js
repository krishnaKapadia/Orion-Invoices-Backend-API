const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
* Model/Schema for Client Document in mongo
*/

// Create schema that data will require as a minimum
const clientSchema = new Schema({
  code: {
    type: String,
    required: [true, "Client Code is required"],
    unique: true
  },

  name: {
    type: String,
    required: [true, "Client Name is required"]
  },

  address: {
    type: String
  },

  phone_num: {
    type: String
  }
});

// Create a model based off the schema
const Client = mongoose.model('client', clientSchema);

module.exports = Client;
