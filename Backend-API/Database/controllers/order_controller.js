var Order = require('../models/order_model');

/**
 * Handles all CRUD operations through mongoose.
    Called through order_routes.js
*/

// Gets all Order's
exports.findAll = (req, res) => {
  Order.find({ company_id: req.get("company_id") }).sort([['completed', 1], ['created', 'desc']]).then( (orders) => {
    res.send({type: "GET", message: "GET order successful", orders});
  }).catch( (err) => {
    if(err) {
      res.status(500).send( { type: "GET", message: "Could not fetch Orders", error: err });
    }
  })
}

// Gets a single specified order, matching the passed id
exports.findOne = (req, res) => {

  Order.findById(req.params.id).then( (order) => {
    if(order === null) res.status(500).send( { type: "GET", message: "Failed to find specified order"} );
    else res.send({ type: "GET", message: "GET order successful", order });
  }).catch( (err) => {
    if(err) res.status(500).send({ type: "GET", message: "Failed to get client" });
  })
}

// Creates a new order and adds it to the database
exports.create = (req, res) => {

  // Ensure that the order body exists in the request
  if(!req.body) {
    res.status(500).send({ type: "POST", message: "Order name/description cannot be empty. Order could not be created" });
  } else {
    // Add associated company_id
    if(typeof req.get('company_id') == undefined) res.status(500).send({ type: "POST", message: "No company_id spesified in header"});
    req.body.company_id = req.get('company_id');
    
    // Create the order in the database and return the created order
    Order.create(req.body).then( (order) => {
      res.send({ type: "POST", message: "Order Created", order });
    }).catch( (err) => {
      if(err) {
        res.status(500).send( { type: "POST", message: "Could not create order", error: err.message});
      }
    })
  }
}

// Updates a single specified order's details matching the passed id
exports.update = (req, res) => {
  // GET order that matches the id
  Order.findById(req.params.id).then( (order) => {
    if(order == null) res.status(500).send( { type: "GET", message: "Failed to find specified order" });
    else {
      // Edit the order
      order.completed   = req.body.completed;
      order.code        = req.body.code;
      order.client_name = req.body.client_name;
      order.items       = req.body.items;

      // Save the modified order
      order.save().then( (order) => {
        res.send( { type: "PUT", message: "Order Updated", order });
      }).catch( (error) => {
        res.status(500).send( { type: "PUT", message: "Could not save order", error });
      })
    }
  }).catch( (error) => {
    if(error) {
      res.status(500).send( { type: "GET", message: "Could not find order", error });
    }
  })
}

// Deletes a single specified order matching the passed id
exports.delete = (req, res) => {

  Order.remove( { _id: req.params.id }, (err, order) => {
    if(err) {
      res.status(500).send( { type: "DELETE", message: " Failed to delete order" });
    }else {
      res.send( { type: "DELETE", message: "Order successfully deleted" });
    }
  });
}
