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

    return new Promise(resolve => {

        bcrypt.hash(password, 10, (err, hash) => {
            var sql = `INSERT INTO users (username, password, email) VALUES ('${username}', '${hash}', '${email}')`;
            con.query(sql, function (err, result) {
                if (err) resolve(err.code);
                else resolve(true);
            });
        });
    })
}

function comparePassword(username, password) {

    return new Promise(resolve => {
        var sql = `SELECT * FROM users WHERE username='${username}'`;
        con.query(sql, function (error, result) {
            if (error) resolve(false);
            bcrypt.compare(password, result[0].password, function (error, res) {
                if (error) resolve(false);
                resolve(res);
            });
        });
    })
}

async function main() {

    // test = await comparePassword("ben", "Gjba1976");

    test = await addUser("b", "dfsfd", "sdfsdf");

    console.log(test);
}

main();