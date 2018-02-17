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
      res.status(500).send( { type: "GET", message: "Could not retrieve client", error: err.message });
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
      res.send( { type: "POST", message: "Client created", client } );
    }).catch( (err) => {
      if(err) {
        res.status(500).send( { type: "POST", message: "Could not create Client", error: err.message});
      }
    });
  }

}


// Updates a single specified client's details matching the passed client id
exports.update = (req, res) => {
  // First get client that matches id
  Client.findById(req.params.code).then( (client) => {
    if(client == null) res.status(500).send( { type: "GET", message: "Could not retrieve client matching that id" });
    else {
      // Edit the client
      client.code      = req.body.code;
      client.name      = req.body.name;
      client.address   = req.body.address;
      client.phone_num = req.body.phone_num;

      // Save the newly modified client
      client.save().then( (client) => {
        res.send( { type: "PUT", message: "Client Updated", client });
      }).catch( (error) => {
        res.status(500).send( { type: "GET", message: "Could not save client", error });
      });
    }
  }).catch( (error) => {
    if(error) {
      res.status(500).send( { type: "GET", message: "Could not find client", error });
    }
  })
}

// Deletes a single specified client matching the passed id
exports.delete = (req, res) => {

  Client.remove( { _id: req.params.code }, (err, client) => {
    if (err) {
      res.status(500).send( { type: "DELETE", message: "Failed to delete Client" });
    } else {
      res.send( { type: "DELETE", message: "Client successfully deleted" });
    }
  });
}
