const mysql = require('mysql2');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

db.getConnection((err) => {
    if (err) throw err;
    console.log("Conectado ao banco de dados MySQL!");
});

module.exports = db;
