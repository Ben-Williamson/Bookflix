var mysql = require("mysql");
const bcrypt = require("bcrypt");


class Database {
  constructor() {
    this.con = mysql.createConnection({
      host: "hamster_db",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: "hamster",
    });
    this.con.connect(function (err) {
      if (err) throw err;
      // console.log("Database connection failed.");
    });
  }
  addUser(data) {

    var response = { success: false, message: "All fields required.", userData: null };

    return new Promise((resolve) => {
      if(data.username && data.password && data.firstname && data.surname && data.email) {
        bcrypt.hash(data.password, 10, (err, hash) => {
          var sql = `INSERT INTO users (username, password, email, forename, surname) VALUES ('${data.username}', '${hash}', '${data.email}', '${data.firstname}', '${data.surname}')`;

          this.con.query(sql, function (err, result) {
            response.success = true;
            response.message = "User created.";
            resolve(response);
          });
        });
      } else {
        resolve(response);
      }
    });
  }

  comparePassword(data) {
    var response = { success: false, message: "Incorrect username or password.", userData: null };

    return new Promise((resolve) => { // return a promise as this is an async problem
      var sql = `SELECT * FROM users WHERE username='${data.username}'`; // define sql for db lookup
      this.con.query(sql, function (error, result) { // all users where username is that supplied

        if (error) {
          console.log("DB lookup failed"); // if lookup error tell someone and don't continue
          response["message"] = "Unknown error.";
        }
        if (result.length != 0) { // if there are results
          bcrypt.compare(data.password, result[0].password, function (error, res) { // compare the password found in the database with that provided
            if (error) {
              //console.log("Passwords don't match"); // if incorrect password stop and tell someone
            }

            if(res === true) {
              //console.log("correct password");
              response["success"] = true;
              response["message"] = ""; // otherwise, passwords match.
              delete result[0].password;
              response["userData"] = {...result[0]};
            } else {
              //console.log("incorrect password");
            }
            resolve(response);
          });
        } else {
          resolve(response);
        }
      });
    });
  }
}

module.exports.Database = Database;
