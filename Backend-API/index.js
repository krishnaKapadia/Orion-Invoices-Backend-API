// Base imports
const express    = require('express');
const app        = express();
const routes     = require('./routes/routes');
const bodyParser = require('body-parser');

const port = 4000;

// Middleware, remember that the decleration order matters
app.use(bodyParser.json());

// Custom routes, ....com/api/...
app.use("/api", routes);

// Port Listening on server port var or port 4000
app.listen(process.env.port || port, function() {
    console.log("check");
});
