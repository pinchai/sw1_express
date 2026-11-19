const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "sw1_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 2
});

module.exports = pool