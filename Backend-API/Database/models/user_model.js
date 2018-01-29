const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// Imported Ref Models
var Company = require('./company_model');

/**
* Model/Schema for User Document in mongo
*/

// Create schema that each user will have to adhear to as a minimum
const userSchema = new Schema({

  /**
   *  Ensures that the user is linked to the business that
   * they work for.
   */

  company_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
    // TODO make this required
  },

  salt: {
    type: String,
    required: [true, 'Salt must be generated'],
  },
  // If user login through local registration
  // local: {

  username: {
    type: String,
    required: [true, "Must specify a username"],
    unique: true
  },

  password: {
    type: String,
    required: [true, "Must specify a password"]
  },

  email: {
    type: String,
    required: [true, "Must specify an email"]
  }

  // },

  // // If user logs in through facebook
  // facebook: {
  //   id: String,
  //   token: String,
  //   name: String,
  //   email: String
  // }

});

const User = mongoose.model('user', userSchema);

module.exports = User;
