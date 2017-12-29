// Base imports
const express = require('express');
const app = express();

// Port Listining on server port var or port 4000
app.listen(process.env.port || 4000, function() {
    console.log("check");
});


// GET request handler, req = request, res = responce
app.get("/", function(req, res) {
    console.log("Getting");
    res.send({ clientName: "Krishna" });
});
