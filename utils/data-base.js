const mysql = require("mysql2")

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: 'node-app',
    password:"ahmed@01097117458"
})


module.exports= pool.promise()