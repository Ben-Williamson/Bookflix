require('dotenv').config();

const session = require("express-session");
const express = require("express");
const cors = require("cors");

const { Sequelize, DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');


const sequelize = new Sequelize('HamsterTracker', process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'hamster_db',
  dialect: "mysql"
});

class User extends Model {}

User.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstname: {
    type: DataTypes.STRING,
    
    validate: {
      notEmpty: {msg: "First Name is required."}
    }
    
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {msg: "Surname is required."}
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {msg: "There is already an account with that email address."},
    validate: {
      notEmpty: {msg: "Email is required."},
      isEmail: {msg: "Incorrect email."}
    }
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {msg: "That username is taken."},
    validate: {
      notEmpty: {msg: "Username is required."}
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {args: [6, 20], msg: "Password must be between 6 and 20 characters."},
    }
  }
}, {
  hooks: {
    beforeCreate: async (user) =>
      (user.password = await bcrypt.hash(user.password, 10)),
  },
  sequelize,
  modelName: 'User'
});

User.prototype.validPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
}


const app = express();

app.use(
  cors({
    origin: "https://hamster.benwilliamson.org",
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

async function run() {
  await sequelize.authenticate();
  await User.sync();
}

run()

app.listen(PORT, function () {
  console.log("App running on port " + PORT);
});