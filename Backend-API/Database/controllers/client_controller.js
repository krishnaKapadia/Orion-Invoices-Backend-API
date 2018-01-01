var Client = require('../models/client_model');

/**
 * Handles all Client CRUD actions through mongoose.
   Called through client_routes.js
 */

// Gets all database items
exports.findAll = (req, res) => {
  console.log("Client /GET");

  Client.find({}).then( (clients) => {
    res.send(clients);
  });

  // console.log({ type: 'GET' });
}

// Creates a new client database item and adds it to the database
exports.create = (req, res) => {
  // Client.create(req.body).then( (client) => {
    // console.log(client);
    // res.send(client);
  // });

  // console.log({ type: 'POST' });
}

// Gets a single specified client, matching the passed id
exports.findOne = (req, res) => {


}

// Updates a single specified client's details matching the passed id
exports.update = (req, res) => {

}

// Deletes a single specified client matching the passed id
exports.delete = (req, res) => {

}
