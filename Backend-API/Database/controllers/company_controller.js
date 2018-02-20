var Company = require('../models/company_model');
var User = require('../models/user_model');
var Employee = require('../models/employee_model');
var Client = require('../models/client_model');
var Order = require('../models/order_model');
var Task = require('../models/task_model');
const bcrypt   = require('bcrypt-nodejs');
var user_controller = require('./user_controller')
/**
 * Handles all CRUD operations through mongoose.
    Called through company_routes.js
*/

exports.findAll = (req, res) => {

  Company.find({}, (err, data) => {
    if(err || data === null) {
      err.status(500).send({ type: "GET", message: "Could not retrieve company" });
    }
  }).then( (company) => {
    res.send({ type: "GET", message: "GET all company successful", company })
  });
}

// Gets a single specified Company, matching the passed id
exports.findOne = (req, res) => {

  Company.findById(req.params.code).then( (company) => {
    if(company == null) res.status(500).send( { type: "GET", message: "Could not retrieve company" });
    else res.send({ type: "GET", message: "GET company successful", company });
  }).catch( (err) => {
    if(err) {
      res.status(500).send( { type: "GET", message: "Could not find company" });
    }
  })
}

// Creates a new Company and adds it to the database
exports.create = (req, res) => {
  // Ensure that the request body is not empty
  if(!req.body) {
    res.status(500).send( { type: "POST", message: "POST Request must have company data"})
  } else {

    // Create the company in the database and return the created company

    // First create the user and then create the company using the user's id as an associated account
    if(!req.body) {
      res.status(500).send( { type: "POST", message: "POST Request must have user data"})
    } else {
      // First hash user password
      const pass = this.hash(req.body.password);
      req.body.password = pass.password;
      req.body.salt = pass.salt;

      // Create the user in the database and return the created user
      User.create(req.body).then( (user) => {

        // Create the company adding the newly created user id to the list of associated accounts
        req.body.accounts = [ user._id ];
        Company.create(req.body).then( (company) => {
          // Set user to have a company_id field corresponding to this company
          user.company_id = company._id;

          User.findOneAndUpdate({ '_id': user._id }, user, (err) => {
            // Removes all password information from the response
            var newUser = {
              _id: user._id,
              company_id: user.company_id,
              email: user.email,
              username: user.username
            }

            if(err) throw err;
            else res.send( { type: "POST", message: "Company Created", result: true, company, data: newUser });
          })
        }).catch( (err) => {
          if(err) {
            res.status(500).send( { type: "GET", message: "Could not create company", error: err.message });
          }
        })
      }).catch( (err) => {
        if(err) {
          res.status(500).send( { type: "GET", message: "Could not create user", error: err.message });
        }
      })
    }


    // console.log(req.body);
    // Company.create(req.body).then( (company) => {
    //   res.send( { type: "POST", message: "Company Created", company });
    // }).catch( (err) => {
    //   if(err) {
    //     res.status(500).send( { type: "GET", message: "Could not create company", error: err.message });
    //   }
    // })
  }
}

exports.hash = (password) => {
  const salt = bcrypt.genSaltSync(8);
  return {
    password: bcrypt.hashSync(password, salt, null),
    salt
  }
}

// Updates a single specified Company's details matching the passed id
exports.update = (req, res) => {
  // First get company that matches id
  Company.findById(req.params.code).then( (company) => {
    if(company == null) res.status(500).send( { type: "GET", message: "Could not retrieve user matching that id" });
    else {
      // // Edit the company
      company.name = req.body.name;
      company.address = req.body.address;
      company.email = req.body.email;
      company.accounts = req.body.accounts;

      // Save the newly modified employee
      company.save().then( (company) => {
        res.send( { type: "PUT", message: "Company Updated", company });
      }).catch( (error) => {
        res.status(500).send( { type: "PUT", message: "Could not save company", error });
      });
    }
  }).catch( (error) => {
    if(error) {
      res.status(500).send( { type: "GET", message: "Could not find company", error });
    }
  })
}

// Deletes a single specified Company matching the passed id
// will cause users that do not belong to a company to take place which will break
exports.delete = (req, res) => {
  // First remove associated users
  User.remove({ company_id: req.params.code });
  // Then all clients
  Client.remove({ company_id: req.params.code });
  // Then all employees
  Employee.remove({ company_id: req.params.code });
  // Then all orders
  Order.remove({ company_id: req.params.code });
  // Then all invoices
  Invoice.remove({ company_id: req.params.code });
  // Then all tasks
  Tasks.remove({ company_id: req.params.code });
  // Then remove the company
  Company.remove( { _id: req.params.code }, (err, user) => {
    if(err) {
      res.status(500).send( { type: "DELETE", message: "Failed to delete company" });
    }else {
      res.send( { type: "DELETE", message: "Company successfully removed" });
    }
  });
}
