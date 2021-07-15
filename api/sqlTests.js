var mysql = require('mysql');
const bcrypt = require('bcrypt');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Gjba1976",
    database: "HamsterTracker"
});

bcrypt.hash("yourPassword", 10, (err, hash) => {
    // Now we can store the password hash in db.
    console.log(hash)
});

function addUser(username, password, email) {
    bcrypt.hash(password, 10, (err, hash) => {
        con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = `INSERT INTO users (username, password, email) VALUES ('${username}', '${password}', '${email}')`;
            con.query(sql, function (err, result) {
                if (err) throw err;
            });
        });
    });
}


addUser("ben", "Gjba1976", "benmacwill@gmail.com");