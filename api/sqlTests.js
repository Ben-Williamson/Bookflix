var mysql = require('mysql');
const bcrypt = require('bcrypt');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Gjba1976",
    database: "HamsterTracker"
});

con.connect(function (err) {
    if (err) throw err;
})

function addUser(username, password, email) {
    bcrypt.hash(password, 10, (err, hash) => {
        var sql = `INSERT INTO users (username, password, email) VALUES ('${username}', '${hash}', '${email}')`;
        con.query(sql, function (err, result) {
            if (err.code == "ER_DUP_ENTRY") {
                console.log("Duplicate")
            }
        });

    });
}

async function comparePassword(username, password) {

    return new Promise(resolve => {
        var sql = `SELECT * FROM users WHERE username='${username}'`;
        con.query(sql, function (error, result) {
            bcrypt.compare(password, result[0].password, function (err, res) {
                resolve(res);
            });
        });
    })
}

async function main() {

    test = await comparePassword("ben", "Gjba1976");

    console.log(test);
}

main();