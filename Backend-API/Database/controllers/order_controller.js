var Order = require('../models/order_model');

/**
 * Handles all CRUD operations through mongoose.
    Called through order_routes.js
*/

// Gets all Order's
exports.findAll = (req, res) => {
  // console.log("Order /GET");
  Order.find({}).then( (orders) => {
    res.send(orders);
  })
}

// Gets a single specified order, matching the passed id
exports.findOne = (req, res) => {


}

// Creates a new order and adds it to the database
exports.create = (req, res) => {

}

// Updates a single specified order's details matching the passed id
exports.update = (req, res) => {

}

// Deletes a single specified order matching the passed id
exports.delete = (req, res) => {

}
