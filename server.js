const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const app = express();
const port = process.env.port || 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CHANGED TO ROUTE.GET IN ROUTES FOLDER
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "db/db.json"));
});

// app.post("/api/notes", (req, res) => {
//   console.log("req.body", req.body.title);
//   let newNote = req.body;
//   newNote.id = uuidv4();

//   fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (err, data) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log("data--->", data);
//     let dataArr = JSON.parse(data);
//     dataArr.push(newNote);

//     fs.writeFile(
//       path.join(__dirname, "db/db.json"),
//       JSON.stringify(dataArr),
//       (err) => {
//         err ? console.log(err) : console.log("success!!");
//       }
//     );
//   });
//   res.send("Save Note");
// });

app.post("/api/notes", (req, res) => {
  fs.readFileSync(path.join(__dirname, "db/db.json"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    var dataArr = JSON.parse(data);
    console.log("req.body", req.body);
    //console.log("dataArr---11", dataArr);
    req.body.id = uuidv4();
    dataArr.push(req.body);
    //console.log("dataArr---22", dataArr);

    fs.writeFileSync(
      path.join(__dirname, "db/db.json"),
      JSON.stringify(dataArr),
      (err) => {
        if (err) {
          // console.error("heheheheheh", err);
          return;
        } else {
          // console.log("writeFile good!!!!");
        }
      }
    );
  });
  res.send("ok");
});

app.delete("/api/notes/:id", (req, res) => {
  console.log("id id id", req.params.id);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
