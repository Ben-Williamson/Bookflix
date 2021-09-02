require('dotenv').config();

const session = require("express-session");
const express = require("express");
const dblib = require("./dblib");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "https://hamster.benwilliamson.org",
    credentials: true,
  })
);

const db = new dblib.Database();

const PORT = 3000;

// handle URLencoded requests
app.use(express.urlencoded({ extended: true }));

// handle JSON requests
app.use(express.json());

// Session Setup
app.use(
  session({
    // It holds the secret key for session
    secret: "Your_Secret_Key",

    // Forces the session to be saved
    // back to the session store
    resave: true,

    // Forces a session that is "uninitialized"
    // to be saved to the store
    saveUninitialized: true,
  })
);

app.post("/auth", async function (req, res) {

  if (req.body.type == "login" && req.body.username && req.body.password) {
    var dbQuery = await db.comparePassword(req.body);

    if(dbQuery.success) {
      console.log(req.body.username, "logged in.");
      req.session.loggedin = true;
      req.session.username = req.body.username;
    }
  }
  if(req.body.type == "signup") {
    var dbQuery = await db.addUser(req.body);

    if(dbQuery.success) {
      var dbQuery = await db.comparePassword(req.body);

      if(dbQuery.success) {
        console.log(req.body.username, "logged in.");
        req.session.loggedin = true;
        req.session.username = req.body.username;
      }
    }
  }
  res.send(dbQuery);
});

app.post("/logout", function (req, res) {
  req.session.destroy((err) => {
    res.send("session destroyed");
  });
});

app.post("/tick", function (req, res) {
  console.log(req.body.trackerID, req.body.time);
});

app.get("/", function (req, res) {
  if (req.session.loggedin) {
    res.send("hi " + req.session.username);
  } else {
    res.send({ error: "You must log in first." });
  }
});

app.get("/data", function (req, res) {
  if (req.session.loggedin) {
    res.send({ data: req.session.username });
  } else {
    res.send({ data: "no" });
  }
});

app.listen(PORT, function () {
  console.log("App running on port " + PORT);
});
