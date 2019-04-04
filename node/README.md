# node.js
- 用途
    - 中间层
    - 小型服务
    - 工具

- 优势
    - 便于前端入手
    - 性能高
    - 利于和前端代码整合
    
## 安装
- windows下载后一路next就行

## npm
```sh   
# 安装某个包
npm install xxx
# 简写：npm i xxx

# 卸载某个包
npm unintall xxx
# 简写：npm un xxx
```
### cnpm安装
```shell
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

## http
### 响应请求
```javascript
/**
 * 请求一个页面
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const {promisify} = require('util'); // promise

const readFile = promisify(fs.readFile);

const server = http.createServer(async (req, res) => {
    try {
        let buffer = await readFile(path.resolve(`../template${req.url}`));
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        res.write(buffer);
        res.end();
    } catch(e) {
        res.setStatus = 404;
        res.write('Not Found');
        res.end();
    }
});

server.listen(8080)
```
### 数据交互
- 如何区分get和post请求
```javascript
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    console.log(req.method);
});

server.listen(8080)
```
- 处理get请求
```javascript
/**
 * http接收get数据
 */
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    let {pathname, query} = url.parse(req.url, true);
    res.write('收到');
    res.end();
});

server.listen(8080)
```
- 处理post请求
```javascript
/**
 * http 接收post数据
 */
const http = require('http');
const querystring = require('querystring');

const server = http.createServer(async (req, res) => {
    let arr = [];
    // 接收数据
    req.on('data', buffer => {
        arr.push(buffer); // 每次接收

    });
    // 数据接收完毕
    req.on('end', () => {
        let buffer = Buffer.concat(arr); // 所有数据合并到一起
        querystring.parse(buffer); // 解析数据

        res.write('收到');
        res.end();
    });
});

server.listen(8080);                                                                                       
```
- 简单的帐号注册系统
```javascript
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const querystring = require('querystring');

let users = {};

http.createServer((req, res) => {
    let {pathname, query} = url.parse(req.url, true);

    if (req.method == 'POST') {
        let arr = [];
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
                let jsonReturn = {};
                if (!users[get.username]) {
                    jsonReturn = {status: false, msg: '帐号不存在'};
                } else if (users[get.username] != get.password) {
                    jsonReturn = {status: false, msg: '密码不正确'};
                } else {                    
                    jsonReturn = {status: true, msg: '登录成功'};
                }

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json;charset=utf-8');
                res.write(JSON.stringify(jsonReturn));
                res.end();

                break;
            case '/reg':
                let jsonReturn = {};
                if (users[post.username]) {
                    jsonReturn = {status: false, msg: '帐号已经存在'};
                } else {
                    users[post.username] = post.password;
                    jsonReturn = {status: true, msg: '注册成功'};
                }

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json;charset=utf-8');
                res.write(JSON.stringify({status: false, msg: '帐号已经存在'}));
                res.end();
                
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
```
- 处理上传文件
```javascript
/**
 * 上传文件处理案例
 * @filename index.js
 */
const http = require('http');
const split = require('./split');
const fs = require('fs');

http.createServer((req, res) => {

    if (req.url == '/favicon.ico') {
        res.end();
        return;
    }

    let arr = [];
    req.on('data', buffer => {
        arr.push(buffer);
    });

    req.on('end', () => {
        // 合并所有buffer到一个
        let fullBuffer = Buffer.concat(arr);
        // 算出上传符号
        let delimiter = '--' + req.headers['content-type'].split('; ')[1].split('=')[1];
        // 每个key=>value分割成
        let part = split.buffer(fullBuffer, delimiter);
        // 首尾去掉
        part.pop();
        part.shift();
        // 保存参数
        let post = {};
        part.forEach((buffer) => {
            // 删除首尾的\r\n
            buffer = buffer.slice(2, buffer.length - 2);
            // 用\r\n\r\n分成key和vlaue
            let keyValue = split.buffer(buffer, "\r\n\r\n");
            // 保存key,value
            let [name, value] = keyValue;
            // key转成字符串
            name = name.toString();
            // 如果key中包含了\r\n,则表示为上传文件的信息（因为2行头信息）
            if (name.indexOf("\r\n") != -1) {
                // 上传的文件名
                let filename = name.toString().split('\r\n')[0].split('=')[2].replace(/(^"*)|("*$)/g, "");
                //  写入文件中
                fs.writeFile(`./uploads/${filename}`, value, (err) => {
                    console.log(err);
                    console.log(err ? '失败' : '成功');
                });
                // 保存到数组中
                post[name.split('; ')[1].split('=')[1].replace(/(^"*)|("*$)/g, "")] = `./uploads/${filename}`;
            } else {
                // 普通数组
                post[name.split('=')[1].trim('"').replace(/(^"*)|("*$)/g, "")] = value.toString();
            }
        });

        console.log(post);

        res.end();
    });

}).listen(8080);

/*===================================================*/

/**
 * 切割缓存
 * @filename split.js
 */
exports.buffer = function(buffer, delimiter) {
    let bufferPart = [];
    while((n = buffer.indexOf(delimiter)) != -1) {
        bufferPart.push(buffer.slice(0, n));
        buffer = buffer.slice(n + delimiter.length);
    }
    bufferPart.push(buffer);

    return bufferPart;
}
```
- 表单解析第三方包：multiparty
```javascript
const http = require('http');
const multiparty = require('multiparty');

http.createServer((req, res) => {
    let form = multiparty.Form({
        'uploadDir': './upload'
    })

    form.parse(req);

    form.on('field', (name, value) => {
        // 解析字段
    });

    form.on('file', (name, file) => {
        // 解析文件
    });

    form.on('close', () => {
        // 表单解析完成
    });
});

```


## 模块系统
- module
- exports
- require

## package.json
### 创建
```shell
npm init
```
- scripts属性
- devDependencies属性
    - ^
    - ~
### 包管理器
- npm
- cnpm
- yarn
- bower

## 系统内置包
### 断言：assert
- 入门使用
```javascript
const assert = require('assert');

// 场景1
assert(5>3, '错误1');
assert(5<3, '错误2'); // 这个会报错

```
- 深层比较
```javascript
const assert = require('assert');

// 场景2
assert.deepEqual(比较, 提示信息); // 判断数组或者json的内容是否一模一样

```
- 深层严格比较
```javascript
const assert = require('assert');

assert.deepStriceEqual(); // ===的比较，deepEqual的升级版
```

### 路径：path
- dirname() / basename() / extname()
- resolve()
### 网址：url
- parse()
### 请求数据：querystring
- parse();
- stringify();
### 网络模块：net

## 数据交互
### ajax
- 原生
```javascript
let ajax = new XMLHttpRequest();
ajax.open('GET', 'http://localhost:8080/a', true); // true表示是异步模式，false已经废弃
ajax.send();
ajax.onreadystatechange = function() {
    if (ajax.readyState == 4) {
        if (ajax.status == 200 || ajax.status == 304) {
            alert(ajax.responseText);
        } else {
            alert('失败');
        }
    }
}
````
- 跨域
    - origin
    - access-control-allow-origin

- jQuery

- fetch
```javascript
let result = fetch(url, option);
//  普通字符串解析
result.txt(); 

// json对象解析
result.json();

// 讲二进制文件变成url地址
//URL.createObjectURL(result.blob())
```

- ajax 2.0
    - 根据form表单创建formData
    ```javascript
    let formData = new FormData(document.querySelector('#form'));
    ```
    - 手动创建FormData
    ```javascript
    let formData = new FormDate();
    formdata.append('username', document.querySelector('#username').value());
    formdata.append('password', document.querySelector('#password').value());
    formdata.append('file', document.querySelector('#file').files);
    ```

### WebSocket
#### socke.io
- 安装
```shell
cnpm i socket.io -D
```
- 搭建服务器
```javascript
const http = require('http');
const io = require('socket.io');

// 建立普通http服务,websocket登录交换密钥用
const httpServer = http.createServer((req, res) => {});
httpServer.listen(8080);

// 建立ws
const wsServer = io.listen(httpServer); // 这就是为什么需要httpServer的原因
wsServer.on('connection', (sock) => {
    
    // 所有人都看得到
    wsServer.emit('server-send', `欢迎${sock.id}加入聊天室`);

    // 接收客户端的消息，消息名称是aaa，客户端传了2个参数
    sock.on('client-send', (message) => {
        // 只有发送的客户端才看得到
        sock.emit('server-send', `服务器返回：${message}`); // 服务器主动发东西
    });
}); 
```
- 搭建客户端
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="http://localhost:8080/socket.io/socket.io.js"></script>
</head>
<body>
    <input type="text" id="message"><button id="btn">发送</button>
    <script>

        let btn = document.querySelector('#btn');
        let text = document.querySelector('#message');
        let sock = io.connect('ws://localhost:8080');

        // 接收服务器发过来的消息
        sock.on('server-send', (message) => {
            console.log(message);
        })

        btn.onclick = () => {
            sock.emit('client-send', text.value);
        }
    </script>
</body>
</html>
```
#### 原生
- 客户端
- 服务端


## 数据库
### 安装模块
```shell
npm i mysql -D
npm i co-mysql -D
```
### 日常操作
```javascript
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
```

## 流
```javascript
const fs = require('fs');
const zlib = require('zlib');

// 读流
let rs = fs.createReadStream('1.txt');
// 写流
let ws = fs.createWriteStream('2.txt');

// 读流的内容流到写流去
rs.pipe(ws);

// 读流监听错误
rs.on('error', (err) => {
    console.log(err)
});

// 写流监听完成
ws.on('finish', () => {
    console.log('完成')
});


//=======================

//读写流
// 1. 压缩
// 2. 加密
let gz = zlib.createGzip(); // 

```

## 启动器
### forever
- forever start index.js
> -l 指定console.log输出文件    
> -o 执行普通信息文件   
> -e 指定报错信息文件   
> -a 不要清楚之前的日志 
- forever start xxx.js
- forever list
- forever restart index.js
- forever stop index.js
- forever stopall