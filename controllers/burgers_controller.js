const express = require("express");

const router = express.Router();

// Import the model (burger.js) to use its database functions.
const burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    // console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  burger.create([
    "burger_name"], [
    req.body.burger_name
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.delete("/api/burgers/:id", function(request, response) {
  const eatenBurger = request.params.id;

  burger.yeeted(eatenBurger, function(result){
    if (result.affectedRows == 0) {
      // console.log("nothing changed?")
      return response.status(404).end();
    } else {
      response.status(200).end();
    }
  })
})

// Export routes for server.js to use.
module.exports = router;
