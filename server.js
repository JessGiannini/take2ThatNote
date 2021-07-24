const express = require("express");
const path = require("path");
const fs = require("fs");
const {
  readFromFile,
  writeToFile,
  readAndAppend,
} = require("./helperFromActivity/write");
const { v4: uuidv4 } = require("uuid");
const app = express();
const port = process.env.port || 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home page route
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  readFromFile("db/db.json").then((data) => res.json(JSON.parse(data)));
});

app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json("Success!");
  } else {
    res.error("Incorrect entry!");
  }
});

app.delete("/api/notes/:id", (req, res) => {
  console.log("id id id", req.params.id);
});

// Wildcard page route!!
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
