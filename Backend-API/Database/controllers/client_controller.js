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
      err.status(500).send({ message: "Could not retrieve clients" });
    }
  }).then( (clients) => {
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

// Gets a single specified client, matching the passed client id
exports.findOne = (req, res) => {
  console.log(req.params.code);

  Client.findById(req.params.code, (err, client) => {
    if(err || client === null) {
      res.status(500).send( { message: "Could not retrieve client" });
    }
  }).then( (client) => {
    res.send(client);
  })
}

// Updates a single specified client's details matching the passed client id
exports.update = (req, res) => {

  // First get the client that matches the id
  Client.findById(req.params.code, (err, client) => {
    if(err || client === null) {
      res.status(500).send( { message: "Could not retrieve client" });
    }
  }).then( (client) => {
    // Edit the client
    client.name = req.body.name;

    client.save( (err) => {
      if (err) {
        res.status(500).send( { message: "Failed to update Client" });
      }

      res.send( { message: "Client Updated", client: client });
    })

  })
}

// Deletes a single specified client matching the passed id
exports.delete = (req, res) => {
  console.log(req);
  // Client.remove( { _id: "5a49fb7cae78b925c402e2ef"} )
}
