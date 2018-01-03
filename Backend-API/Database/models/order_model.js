const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

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
    type: Schema.Types.Decimal,
    required: [true, "Item Price required"]
  }
});

// Order Schema
const orderSchema = new Schema({
  code: {
    type: String,
  },

  client_name: {
    type: String,
    requried: true
  },

  created: {
    type: Date,
    default: Date.now
  },

  items: {
    type: [itemSchema],
    required: true
  }
});

// Create model from schema
const Order = mongoose.model('order', orderSchema);

module.exports = Order;
