// Base imports
const express = require('express');
const app = express();
const routes = require('./Routes/routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Constants, including those in other files
const API_Keys   = require('./Services/Keys/API_Keys');
const PORT       = 4000;
const BASE_ROUTE = '/api/v1';

// Mongo connection
mongoose.connect(API_Keys.mongoURI);
mongoose.Promise = global.Promise;


// Middleware
app.use(bodyParser.json());

// Custom route Middleware, ....com/api/...
app.use(BASE_ROUTE, routes);


// Port Listening on server port var or port 4000
app.listen(process.env.PORT || PORT, function() {
    console.log("check");
});
