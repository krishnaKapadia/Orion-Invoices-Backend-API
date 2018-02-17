var User = require('../models/user_model');
const bcrypt   = require('bcrypt-nodejs');

/**
 * Handles all CRUD operations through mongoose.
    Called through user_routes.js
*/

exports.findAll = (req, res) => {

  // TODO make this find filter by company_id so each company can only see its own users
  User.find({}, (err, data) => {
    if(err || data === null) {
      err.status(500).send({ type: "GET", message: "Could not retrieve users" });
    }
  }).then( (users) => {
    res.send({ type: "GET", message: "GET all users successful", users })
  });

}

// Gets a single specified user, matching the passed id
exports.findOne = (req, res) => {

  User.findById(req.params.code).then( (user) => {
    if(user == null) res.status(500).send( { type: "GET", message: "Could not retrieve user" });
    else res.send({ type: "GET", message: "GET user successful", user });
  }).catch( (err) => {
    if(err) {
      res.status(500).send( { type: "GET", message: "Could not find user" });
    }
  })
}

// Checks if the request body has a valid user
exports.login = (req, res) => {
  User.findOne({ username: req.body.username }).then((user) => {
    if(user == null) res.status(500).send( { type: "GET", result: false, message: "Username does not exist" });
    else {
      var hashPass = this.reHash(req.body.password, user.salt).password;
      if(user.password === hashPass) {
        res.send( { type: "POST", message: "Username and Password combination valid", result: true });
      }else{res.status(500).send( { type: "GET", result: false, message: "Username and Password combination is incorrect" });

      }
    }
  }).catch((err) => {
    if(err) res.status(500).send( { type: "GET", result: false, message: "Username or Password does not exist" });
  })
}

// Creates a new user and adds it to the database
exports.create = (req, res) => {
  // Ensure that the request body is not empty
  if(!req.body) {
    res.status(500).send( { type: "POST", message: "POST Request must have user data"})
  } else {
    // First hash user password
    const pass = this.hash(req.body.password);
    req.body.password = pass.password;
    req.body.salt = pass.salt;

    // Create the user in the database and return the created user
    User.create(req.body).then( (user) => {
      res.send( { type: "POST", message: "User Created", user});
    }).catch( (err) => {
      if(err) {
        res.status(500).send( { type: "GET", message: "Could not create user", error: err.message });
      }
    })
  }
  // console.log(req, res);
}

// Updates a single specified user's details matching the passed id
exports.update = (req, res) => {
  // First get user that matches id
  User.findById(req.params.code).then( (user) => {
    if(user == null) res.status(500).send( { type: "GET", message: "Could not retrieve user matching that id" });
    else {
      // // Edit the user
      user.username = req.body.username;
      user.password = this.hash(req.body.password);
      user.email    = req.body.email;

      // Save the newly modified employee
      user.save().then( (user) => {
        res.send( { type: "PUT", message: "User Updated", user });
      }).catch( (error) => {
        res.status(500).send( { type: "PUT", message: "Could not save User", error });
      });
    }
  }).catch( (error) => {
    if(error) {
      res.status(500).send( { type: "GET", message: "Could not find User", error });
    }
  })
}

// Deletes a single specified user matching the passed id
exports.delete = (req, res) => {

  User.remove( { _id: req.params.code }, (err, user) => {
    if(err) {
      res.status(500).send( { type: "DELETE", message: "Failed to delete user" });
    }else {
      res.send( { type: "DELETE", message: "User successfully removed" });
    }
  });
}

// Utility methods

// Generates a hash
exports.hash = (password) => {
  const salt = bcrypt.genSaltSync(8);
  return {
    password: bcrypt.hashSync(password, salt, null),
    salt
  }
}

exports.reHash = (password, salt) => {
  return {
    password: bcrypt.hashSync(password, salt)
  }
}

// Checks if password is valid
exports.validatePassword = (password) => {
  return bcrypt.compareSync(password, this.local.password);
}
