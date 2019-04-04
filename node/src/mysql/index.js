const http = require('http');
const mysql = require('mysql');
const coMysql = require('co-mysql');

const db = coMysql(mysql.createPool({
    host: '47.99.131.220',
    user: 'chenxb',
    password: 'chenxb!@#',
    database: 'z-g-bitscom',
    charset: 'utf8'
}));

(async () => {
    let username = '15959375069';
    let sql = `SELECT * FROM game_user WHERE username = '${username}'`;
    let data = await db.query(sql);

    console.log(JSON.stringify(data[0]));
})()
