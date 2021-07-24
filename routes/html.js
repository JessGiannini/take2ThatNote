var express = require("express");
var HTMLrouter = express.Router();

// Home page route
router.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Wildcard page route!!
router.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

module.exports = router;

//starter code from mozilla adapted to project specific req
