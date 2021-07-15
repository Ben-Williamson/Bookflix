const express = require("express");

const app = express();

const PORT = 3000;

// handle URLencoded requests
app.use(express.urlencoded({ extended: true }));

// handle JSON requests
app.use(express.json());

app.get("/test", function (req, res) {

  /// res.send will return the string back to the client
  res.send("Hello World!")
});

app.listen(PORT, function () {
  console.log("App running on port " + PORT);
});


