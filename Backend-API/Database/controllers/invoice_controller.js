var Invoice = require('../models/invoice_model');

/**
 * Handles all Invoice based CRUD actions through mongoose.
 * Called through invoice_routes.js
 */

// Gets all Invoice's
exports.findAll = (req, res) => {
  console.log("Invoice /GET");
  Invoice.find({}).then( (invoices) => {
    res.send(invoices);
  })
}

// Gets a single specified Invoice, matching the passed id
exports.findOne = (req, res) => {


}

// Creates a new Invoice and adds it to the database
exports.create = (req, res) => {

}


// Updates a single specified Invoice's details matching the passed id
exports.update = (req, res) => {

}

// Deletes a single specified Invoice matching the passed id
exports.delete = (req, res) => {

}
