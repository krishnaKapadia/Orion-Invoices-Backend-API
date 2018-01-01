// Base imports
<<<<<<< HEAD
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

=======
const express    = require('express');
const app        = express();
const routes     = require('./routes/routes');
const bodyParser = require('body-parser');

const port = 4000;

// Middleware, remember that the decleration order matters
app.use(bodyParser.json());

// Custom routes, ....com/api/...
app.use("/api", routes);
>>>>>>> 24c6e05e25dc64f24952773e65bc7f3c9d71a87b

// Port Listening on server port var or port 4000
app.listen(process.env.port || port, function() {
    console.log("check");
});
