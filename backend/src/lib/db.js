require('dotenv').config();

// const mysql = require('mysql');
const mysql = require('mysql2/promise');

const { MYSQL_CONN: mysqlConn } = process.env;
// const db = mysql.createConnection(JSON.parse(mysqlConn));
const db = mysql.createPool(JSON.parse(mysqlConn));

module.exports = db;
