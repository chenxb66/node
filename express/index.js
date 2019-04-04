const express = require('express');
const cookieSession = require('cookie-session');

let server = express();
server.listen(8080);

// 传递一个签名密钥
server.use(cookieSession({
    keys: ['GV#%%Yx3s]', '>a)S$v*G\Z', 'E0;tBQ%Yek', 'S*,mgGQ)2b'], // 循环密钥
    maxAge: 20 * 60 * 1000  // 过期时间20分钟
})); 

server.get('/add', (req, res) => {
    req.session['cxb'] = 30;

    res.send('<h1>设置成功</h1>');
})

server.get('/list', (req, res) => {
    console.log(req.session['cxb']);

    res.send('<h1>获取成功</h1>');
});