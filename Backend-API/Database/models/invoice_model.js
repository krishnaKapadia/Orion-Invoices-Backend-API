const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;
const Float       = require('mongoose-float').loadType(mongoose);
var autoIncrement = require('mongoose-auto-increment');
/**
 * Model/Schema for Invoice Document in Mongo
 */


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
    required: [true, "Item price required"]
  }

});

// Base Schema
const invoiceSchema = new Schema({

  /**
   *  Ensures that the order is linked to the business that
   * created it.
   */

  company_id: {
    type: Schema.Types.ObjectId,
    required: [true, "Associated company id is required"]
  },

  inv_number: {
    type: Number,
    required: [true, "Every Invoice must have an invoice number"]
  },

  client_code: {
    type: String,
  },

  client_name: {
    type: String,
    required: [true, "Every invoice must have a client number"]
  },

  client_address: {
    type: String
  },

  items: {
    type: [itemSchema],
    required: [true, "Invoice must have items"]
  },

  subtotal: {
    type: Float,
    required: [true, "Invoice must have subtotal"]
  },

  tax_rate: {
    type: Float,
    required: [true, "Invoice must have a tax rate"]
  },

  total: {
    type: Float,
    required: [true, "Invoice must have total"]
  },

  date: {
    type: Date,
    default: Date.now,
    required: true
  },

  paid: {
    type: Boolean,
    default: false,
    required: true
  }
});

const Invoice = mongoose.model('invoice', invoiceSchema);

module.exports = Invoice;
