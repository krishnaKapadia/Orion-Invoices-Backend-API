var Invoice = require('../models/invoice_model');

/**
 * Handles all Invoice based CRUD actions through mongoose.
 * Called through invoice_routes.js
 */

// Gets all Invoice's
exports.findAll = (req, res) => {
  Invoice.find({}).sort( { paid: 1 }).then( (invoices) => {
    res.send({type: "GET", message: "GET order successful", invoices});
  }).catch( (err) => {
    if(err) {
      res.status(500).send( { type: "GET", message: "Could not fetch invoices" });
    }
  });
}

// Gets a single specified Invoice, matching the passed id
exports.findOne = (req, res) => {

  Invoice.findById(req.params.id).then( (invoice) => {
    if(invoice == null) res.status(500).send( { type: "GET", message: "Failed to find specified invoice"});
    else res.send({ type: "GET", message: "GET order successful", invoice });
  }).catch( (err) => {
    if(err) res.status(500).send( { type: "GET", message: "Failed to get invoice" });
  })

}

// Creates a new Invoice and adds it to the database
exports.create = (req, res) => {
  // Ensure that the invoice body exists in the request
  if(!req.body) {
    res.status(500).send({ type: "POST", message: "Invoice cannot be empty. Invoice could not be created" });
  }else {
    // Create the order in the database and return the created order
    Invoice.create(req.body).then( (invoice) => {
      res.send({ type: "POST", message: "Invoice Created", invoice });
    }).catch( (err) => {
      if(err) {
        res.status(500).send( { type: "POST", message: "Could not create invoice", error: err.message})
      }
    })
  }
}


// Updates a single specified Invoice's details matching the passed id
exports.update = (req, res) => {
  // GET invoice that matches the id
  Invoice.findById(req.params.id).then( (invoice) => {
    if(invoice == null) res.status(500).send( { type: "GET", message: "Failed to find specified invoice" });
    else {
      // Edit the invoice
      invoice.inv_number      = req.body.inv_number;
      invoice.client_code     = req.body.client_code;
      invoice.client_name     = req.body.client_name;
      invoice.client_address  = req.body.client_address;
      invoice.subtotal        = req.body.subtotal;
      invoice.tax_rate        = req.body.tax_rate;
      invoice.total           = req.body.total;
      invoice.items           = req.body.items;
      invoice.paid            = req.body.paid;

      // Save the modified order
      invoice.save().then( (invoice) => {
        res.send( { type: "PUT", message: "Invoice Updated", invoice });
      }).catch( (error) => {
        res.status(500).send( { type: "PUT", message: "Could not save invoice", error });
      })
    }
  }).catch( (error) => {
    if(error) {
      res.status(500).send( { type: "GET", message: "Could not find invoice", error });
    }
  })
}

// Deletes a single specified Invoice matching the passed id
exports.delete = (req, res) => {

  Invoice.remove( { _id: req.params.id }, (err, invoice) => {
    if(err) {
      res.status(500).send( { type: "DELETE", message: " Failed to delete invoice" });
    }else {
      res.send( { type: "DELETE", message: "Invoice successfully deleted" });
    }
  });
}
