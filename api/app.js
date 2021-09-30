require('dotenv').config();

const session = require("express-session");
const express = require("express");
const cors = require("cors");

const { Sequelize, DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');


const sequelize = new Sequelize('Bookflix', process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'bookflix_db',
  dialect: "mysql"
});

var User = require("./models/User")(sequelize, DataTypes);
var Review = require("./models/Review")(sequelize, DataTypes);  

const app = express();

app.use(
  cors({
    origin: "https://mybookflix.co.uk",
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
  })
);

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

    cookie: { maxAge: 8*60*60*1000 },

    // Forces a session that is "uninitialized"
    // to be saved to the store
    saveUninitialized: true,
  })
);

app.get("/", function (req, res) {
  if (req.session.loggedin) {
    res.send(req.session);
  } else {
    res.status(401).send({loggedin: false});
  }
});

app.post("/login", async function (req, res) {
  console.log(req.body.username, "requesting login.")
  if (req.body.username && req.body.password) {
    console.log("Looking for user");
    var response = await User.findOne({
      where: {
        username: req.body.username
      }
    });   
    console.log("response", response);
    if(response && await response.validPassword(req.body.password)) {
      console.log(req.body.username, "logged in.");
      req.session.loggedin = true;
      req.session.userData = response.dataValues;
    } else {
      req.session.error = "Incorrect username or password";
    }
  } else {
    req.session.error = "Username or password can't be empty"
  }
  res.send(req.session);
});

app.post("/signup", async function (req, res) {
  try {
        var response = await User.create(req.body);
    
        req.session.loggedin = true;
        req.session.userData = response.dataValues;
      }
      catch(error) {
        req.session.error = error.errors[0].message;
      }
  res.send(req.session);
});

app.post("/logout", function (req, res) {
  req.session.destroy((err) => {
    res.send(req.session);
  });
});

app.post("/review", async function (req, res) {
  try {
    var response = await Review.create(req.body);
    response.success = true;
  }
  catch(error) {
    req.session.error = error.errors[0].message;
  }
  res.send(req.session);
})

app.get("/reviews", async function (req, res) {
  const reviews = await Review.findAll();

  res.send(reviews);
})

async function run() {
  await sequelize.authenticate();
  await User.sync();
  await Review.sync();
}

run()

app.listen(PORT, function () {
  console.log("App running on port " + PORT);
});