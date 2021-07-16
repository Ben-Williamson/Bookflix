var session = require('express-session');
const express = require("express");
const dblib = require("./dblib");



const app = express();
const db = new dblib.Database();


const PORT = 3000;

// handle URLencoded requests
app.use(express.urlencoded({ extended: true }));

// handle JSON requests
app.use(express.json());

// Session Setup
app.use(session({

  // It holds the secret key for session
  secret: 'Your_Secret_Key',

  // Forces the session to be saved
  // back to the session store
  resave: true,

  // Forces a session that is "uninitialized"
  // to be saved to the store
  saveUninitialized: true
}))

app.post("/auth", async function (req, res) {
  var success = false;
  if (req.body.username && req.body.password) {
    success = await db.comparePassword(req.body.username, req.body.password);
  }

  req.session.loggedin = success;
  req.session.username = req.body.username;

  console.log(req.body)
  res.send(success);
});

app.get("/", function (req, res) {
  if (req.session.loggedin) {
    res.send("hi " + req.session.username);
  } else {
    res.send("Log in first")
  }
})

app.listen(PORT, function () {
  console.log("App running on port " + PORT);
});


