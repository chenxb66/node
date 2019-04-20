const coMysql = require('co-mysql');
const mysql = require('mysql');

module.exports = app => {
    const conn = mysql.createPool(app.config.database);
    const db = coMysql(conn);
    app.context.db = db;

    console.log('init database connection success...');
}