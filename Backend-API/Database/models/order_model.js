const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Float     = require('mongoose-float').loadType(mongoose);

/**
 * Model/Schema for Order Document in Mongo
 */

// Create Schema for min required data

// Item Schema
const itemSchema = new Schema({

  code: {
    type: String
  },

  desc: {
    type: String,
    required: [true, "Item description required"]
  },

  quantity: {
    type: Number,
    required: [true, "Item quantity required"]
  },

  price: {
    type: Float,
    required: [true, "Item Price required"]
  }
});

// Order Schema
const orderSchema = new Schema({
  /**
   *  Ensures that the order is linked to the business that
   * created it.
   */

  company_id: {
    type: Schema.Types.ObjectId
    // TODO make this required
  },

  code: {
    type: String
  },

  client_name: {
    type: String,
    required: [true, 'Client name required']
  },

  created: {
    type: Date,
    default: Date.now
  },

  completed: {
    type: Boolean,
    default: false,
    required: true
  },

  items: {
    type: [itemSchema],
    required: [true, "Order must have items"]
  }
});

// Create model from schema
const Order = mongoose.model('order', orderSchema);

module.exports = Order;
