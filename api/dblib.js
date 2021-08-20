var mysql = require("mysql");
const bcrypt = require("bcrypt");

class Database {
  constructor() {
    this.con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Gjba1976",
      database: "HamsterTracker",
    });
    this.con.connect(function (err) {
      if (err) throw err;
    });
  }
  addUser(username, password, email, forename, surname) {
    return new Promise((resolve) => {
      bcrypt.hash(password, 10, (err, hash) => {
        var sql = `INSERT INTO users (username, password, email, forename, surname) VALUES ('${username}', '${hash}', '${email}', '${forename}', '${surname}')`;
        this.con.query(sql, function (err, result) {
          if (err) resolve(err.code);
          else resolve(true);
        });
      });
    });
  }

  comparePassword(username, password) {
    return new Promise((resolve) => {
      var sql = `SELECT * FROM users WHERE username='${username}'`;
      this.con.query(sql, function (error, result) {
        if (error) resolve(false);
        if (result.length > 0) {
          bcrypt.compare(password, result[0].password, function (error, res) {
            if (error) resolve(false);
            result = result[0];
            delete result.password;
            result["success"] = true;
            resolve(result);
          });
        } else {
          resolve({ success: false });
        }
      });
    });
  }
}

module.exports.Database = Database;
