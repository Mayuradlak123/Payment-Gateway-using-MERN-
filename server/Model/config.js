const mysql = require('mysql')
const dotenv = require('dotenv').config()
const { HOST, DB_USER, DB_NAME, DB_PASSWORD } = process.env

const config = mysql.createConnection({
    host: HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
})
config.connect((err, res) => {
    if (err) {
        console.log("Connection Failed " + err);
    } else {
        console.log("MySQL Database Connected  ");
    }
})
module.exports = config;