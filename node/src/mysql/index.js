const http = require('http');
const mysql = require('mysql');
const coMysql = require('co-mysql');

const db = coMysql(mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123456a',
    database: 'test',
    charset: 'utf8'
}));

(async () => {
    let username = '12345678910';
    let sql = `SELECT * FROM game_user WHERE username = '${username}'`;
    let data = await db.query(sql);

    console.log(JSON.stringify(data[0]));
})()
