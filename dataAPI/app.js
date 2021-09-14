require('dotenv').config();

const express = require("express");
const dblib = require("./dblib");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const db = new dblib.Database();

const PORT = 3000;

app.post("/", function (req, res) {
  console.log(req.body);

  for(tick in req.body.ticks) {
    console.log(tick);
    db.addTick(req.body.hardwareID, req.body.ticks[tick]);
  }

  res.send("received");
});

app.get("/data", function(req, res) {
  res.send(req.query);
});

app.get("/", function (req, res) {
  res.send("online.");
});

app.listen(PORT, function () {
  console.log("App running on port " + PORT);
});
