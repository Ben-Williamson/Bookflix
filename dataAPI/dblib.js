var mysql = require("mysql");


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

  


  addTick(hardwareID, time) {
    return new Promise((resolve) => {
      var sql = `INSERT INTO ticks (hardwareID, time) VALUES ('${hardwareID}', '${time}')`;
      console.log(sql);
          this.con.query(sql, function (err, result) {
            resolve();
          });
    });
  }
}

module.exports.Database = Database;