const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

/**
 * Model/Schema for Invoice Document in Mongo
 */

// Base Schema
const invoiceSchema = new Schema({
  inv_number: {
    type: Number,
    required: [true, "Every Invoice must have an invoice number"]
  },





});

const Invoice = mongoose.model('invoice', invoiceSchema);

module.exports = Invoice;
