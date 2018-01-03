var Client = require('../models/client_model');

/**
 * Handles all Client CRUD actions through mongoose.
   Called through client_routes.js
 */

// Gets all clients
exports.findAll = (req, res) => {
  // console.log("Client /GET");

  Client.find({}, (err, data) => {
    if(err || data === null) {
      err.status(500).send({ type: "GET", message: "Could not retrieve clients" });
    }
  }).then( (clients) => {
    res.send({ type: "GET", message: "GET all successful", clients } );
  });
}

// Gets a single specified client, matching the passed client id
exports.findOne = (req, res) => {

  Client.findById(req.params.code).then( (client) => {
    if(client == null) res.status(500).send( { type: "GET", message: "Could not retrieve client" });
    else res.send({ type: "GET", message: "GET client successful", client });
  }).catch( (err) => {
    if(err) {
      res.status(500).send( { type: "GET", message: "Could not retrieve client" });
    }
  })
}

// Creates a new client database item and adds it to the database
exports.create = (req, res) => {

  // Ensure that the client body exists in the request
  if(!req.body) {
    res.status(500).send( { type: "POST", message: "Client information cannot be empty. Client could not be created" });
  } else {
    // Create the client in the database and return the created client
    Client.create(req.body).then( (client) => {
      // console.log(client);
      res.send( { type: "POST", message: "Client created", client } );
    });
  }

}


// Updates a single specified client's details matching the passed client id
exports.update = (req, res) => {

  // First get the client that matches the id
  Client.findById(req.params.code, (err, client) => {
    if(err || client === null) {
      res.status(500).send( { type: "GET", message: "Could not retrieve client. Client may not exist" });
    }
  }).then( (client) => {
    // Edit the client
    client.name = req.body.name;

    // Save the newly modified client
    client.save( (err) => {
      if (err) {
        res.status(500).send( { type: "PUT", message: "Failed to update Client" });
      } else {
        res.send( { type: "PUT", message: "Client Updated", client: client });
      }
    })

  })
}

// Deletes a single specified client matching the passed id
exports.delete = (req, res) => {

  Client.remove( { _id: req.params.code }, (err, client) => {
    if (err) {
      res.status(500).send( { type: "DELETE", message: "Failed to delete Client" });
    } else {
      res.send( { type: "DELETE", message: "Client successfully deleted", client: client });
    }
  });
}
