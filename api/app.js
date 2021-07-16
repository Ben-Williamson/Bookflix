var cookieSession = require('cookie-session');
const express = require("express");
const dblib = require("./dblib");



const app = express();
const db = new dblib.Database();


const PORT = 3000;

// handle URLencoded requests
app.use(express.urlencoded({ extended: true }));

// handle JSON requests
app.use(express.json());

// use cookies for session info
app.use(cookieSession({
  name: 'session',
  keys: ["this is the key"],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))



app.post("/auth", async function (req, res) {
  var success = false;
  if (req.body.username && req.body.password) {
    success = await db.comparePassword(req.body.username, req.body.password);
  }

  res.send(success)
});

app.listen(PORT, function () {
  console.log("App running on port " + PORT);
});


