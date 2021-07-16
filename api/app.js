const express = require("express");
const dblib = require("./dblib");

const app = express();
const db = new Database();

const PORT = 3000;

// handle URLencoded requests
app.use(express.urlencoded({ extended: true }));

// handle JSON requests
app.use(express.json());

app.post("/auth", async function (req, res) {

  /// res.send will return the string back to the client
  console.log(req.body)

  if (req.body.username && req.body.password) {
    var success = await comparePassword(req.body.username, req.body.password);
  }

  res.send("Hello World!")
});

app.listen(PORT, function () {
  console.log("App running on port " + PORT);
});


