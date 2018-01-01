// Base imports
const express = require('express');
const app = express();
const routes = require('./routes/routes');
var mysql = require('mysql');

// Constants
const PORT = 4000;
//Db connection
app.use(function(req, res, next) {
  res.locals.connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'test'
  });

  res.locals.connection.connect();
  next();
});

// Middleware

// Custom route Middleware, ....com/api/...
app.use("/api/v1", routes);


// Port Listening on server port var or port 4000
app.listen(process.env.port || PORT, function() {
    console.log("check");
});
