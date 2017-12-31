// Base imports
const express = require('express');
const app = express();
const routes = require('./routes/routes');
var mysql = require('mysql');

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


// Port Listining on server port var or port 4000
app.listen(process.env.port || 4000, function() {
    console.log("check");
});
