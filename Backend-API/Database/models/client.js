const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema that data will require as a minimum
const clientSchema = new Schema({
  code: {
    type: String,
    required: [true, "Client Code is required"]
  },

  name: {
    type: String,
    required: [true, "Client Name is required"]
  },

  address: {
    type: String
  },

  phone_num: {
    type: Number
  }
});

const Client = mongoose.model('client', clientSchema);

module.exports = Client;
