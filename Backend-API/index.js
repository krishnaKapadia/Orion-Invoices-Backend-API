// Base imports
const express = require('express');
const app = express();
const routes = require('./routes/routes');

// Constants
const PORT = 4000;
const BASE_ROUTE = '/api/v1';



// Middleware

// Custom route Middleware, ....com/api/...
app.use(BASE_ROUTE, routes);


// Port Listening on server port var or port 4000
app.listen(process.env.port || PORT, function() {
    console.log("check");
});
