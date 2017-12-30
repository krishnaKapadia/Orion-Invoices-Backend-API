const express = require('express');
const router  = express.Router();

// GET request handler, req = request, res = responce
router.get("/clients", function(req, res) {
    console.log("Getting");
    res.send({ clientName: "Krishna" });
});

// POST request handler
router.post("/clients", function(req, res) {
    console.log(req.body);
    res.send({ clientName: "Krishna" });
});

// PUT request handler, Updates client matching id
router.put("/clients/:id", function(req, res) {
    console.log("Getting");
    res.send({ clientName: "Krishna" });
});

// DELETE request handler
router.delete("/clients/:id", function(req, res) {
    res.send({ clientName: "Krishna" });
});

module.exports = router;
