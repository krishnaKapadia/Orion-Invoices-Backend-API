const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
* Model/Schema for Client Document in mongo
*/

// Create schema that data will require as a minimum
const clientSchema = new Schema({

  /**
   *  Ensures that the Client is linked to the business that
   * they are associated with for.
   */

  company_id: {
    type: Schema.Types.ObjectId
    // TODO make this required
  },

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
  },

  created: {
    type: Date,
    default: Date.now
  },
});

// Create a model based off the schema
const Client = mongoose.model('client', clientSchema);

module.exports = Client;
