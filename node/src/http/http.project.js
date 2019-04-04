/**
 * 简单的注册登录系统，基于原生http开发
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const querystring = require('querystring');

let users = {};

http.createServer((req, res) => {
    let {pathname, query} = url.parse(req.url, true);

    if (req.method == 'POST') { 
        req.on('data', buffer => {
            arr.push(buffer);
        });

        req.on('end', () => {
            let buffer = Buffer.concat(arr);
            buffer = querystring.parse(buffer.toString());

            complete(pathname, query, buffer);
        }); 
    } else {
        complete(pathname, query, {});
    }

    function complete(pathname, get, post) {
        switch(pathname) {
            case '/login':
                console.log("get: ", get);
                if (!users[get.username]) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json;charset=utf-8');
                    res.write(JSON.stringify({status: false, msg: '帐号不存在'}));
                    res.end();
                } else if (users[get.username] != get.password) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json;charset=utf-8');
                    res.write(JSON.stringify({status: false, msg: '密码不正确'}));
                    res.end();
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json;charset=utf-8');
                    res.write(JSON.stringify({status: true, msg: '登录成功'}));
                    res.end();
                }
                break;
            case '/reg':
                console.log("post: ", post);
                if (users[post.username]) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json;charset=utf-8');
                    res.write(JSON.stringify({status: false, msg: '帐号已经存在'}));
                    res.end();
                } else {
                    users[post.username] = post.password;
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json;charset=utf-8');
                    res.write(JSON.stringify({status: true, msg: '注册成功'}));
                    res.end();
                }
                
                console.log("users: ", users);
                break;
            default:
                fs.readFile(path.resolve(`${__dirname}/../template/${pathname}`),  (err, buffer) => {
                    if (err) {
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'text/html;charset=utf-8');
                        res.write('not found');
                        res.end();
                    } else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'text/html;charset=utf-8');
                        res.write(buffer);
                        res.end();
                    }
                });
        }
    }

}).listen(8080)