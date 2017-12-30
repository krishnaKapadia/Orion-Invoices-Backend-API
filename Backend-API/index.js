// Base imports
const express = require('express');
const app = express();
const routes = require('./routes/routes');

// Custom route Middleware, ....com/api/...
app.use("/api", routes);

// Port Listining on server port var or port 4000
app.listen(process.env.port || 4000, function() {
    console.log("check");
});
