const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'speedcuberos_db_user',
    password: process.env.DB_PASSWORD || 'Password_123',
    database: process.env.DB_DATABASE || 'speedcuberos_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();