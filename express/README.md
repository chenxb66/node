# express

## 安装
```shell
npm i express --save
```

## 常见使用案例
### 静态资源加载
```javascript
const express = require('express');

// 创建http服务器并监听8080端口
const server = express();
server.listen(8080);

// 定位到static目录下的所有文件
server.use(express.static('./static/'));
```

### get请求
```javascript
const express = require('express');

// 创建http服务器并监听8080端口
const server = express();
server.listen(8080);

// 中间件
server.use((req, res, next) => {
    console.log(req.query);
    next(); // 中间件调用next()，才会走下一步
});

// 添加/路由
server.get('/', (req, res, next) => {
    res.send('<h1>hello world</h1><h2>by enyccc</h2>');
});
```

### post请求
- 安装
```shell
npm i body-parser --save
```
- 使用
```javascript
const express = require('express');
const bodyParser = require('body-parser');

const server = express();
server.listen(8080);

// 调用中间件解析post参数
server.use(bodyParser.urlencoded({
    extended: false
}));

// 路由设置
server.post('/reg', (req, res, next) => {
    console.log(req.body);
    res.send('<h1>提交成功</h1>');
});
```

### 开发中间件(模仿body-parser)
- 功能代码
```javascript
/**
 * filename: ./vendor/body-parser/index.js
 */
const querystring = require('querystring');

module.exports = {
    urlencoded(json) {
        return (req, res, next) => {
            let buffers = [];

            req.on('data', buffer => {
                buffers.push(buffer);
            });

            req.on('end',() => {
                const body = Buffer.concat(buffers).toString();
                req.body = querystring.parse(body);
                next();
            });
        }
    }
}
```
- 调用
```javascript
const express = require('express');
const bodyParser = require('./vendor/body-parser');

const server = express();
server.listen(8080);

// 调用中间件解析post参数
server.use(bodyParser.urlencoded({
    extended: false
}));

// 路由设置
server.post('/reg', (req, res, next) => {
    console.log(req.body);
    res.send('<h1>提交成功</h1>');
});
```

### 文件上传
```javascript
const express = require('express');
const multer = require('multer');

let server = express();
server.listen(8080);

/**
 * 参考文档：https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md
 */
const upload = multer({dest: './static/uploads'}).any(); // 接受一切上传
server.use(upload);

server.post('/upload', (req, res) => {
    console.log(req.body);  // 普通参数
    console.log(req.files); // 文件内容

    res.send('<h1>上传成功</h1>');
});
```
### cookie
- 普通cookie
```javascript
const express = require('express');
const cookieParser = require('cookie-parser');

let server = express();
server.listen(8080);

server.use(cookieParser());

server.get('/add', (req, res) => {
    res.cookie('username', 'enyccc', {
        maxAge: 20 *60 * 1000 // 有效期, 20分钟，单位：毫秒
        //domain: '',  // 设置域名
        //path: '/',   // 设置目录
        //httpOnly: true, // 只允许读,不允许改
        //secure: true, // 只有https的情况下才能使用
    });

    res.send("设置cookie成功");
})

server.get('/list', (req, res) => {
    console.log(req.cookies);

    res.send('<h1>传递cookie成功</h1>');
});
```
- 签名cookie
```javascript
const express = require('express');
const cookieParser = require('cookie-parser');

let server = express();
server.listen(8080);

// 传递一个签名密钥
server.use(cookieParser('ZRl8wbtlzzxY1QEprrzlSLcRi7WtIOFTQuPjmY+Su0'));

server.get('/add', (req, res) => {
    // 设置普通cookie
    res.cookie('cxb', '30', {
        maxAge: 20 *60 * 1000 // 有效期, 20分钟，单位：毫秒
        //domain: '',
        //path: '/',
        //httpOnly: true,
        //secure: true, // 只有https的情况下才能使用
    });
    // 设置签名cookie
    res.cookie('yyq', '27', {
        maxAge: 20 *60 * 1000, // 有效期, 20分钟，单位：毫秒
        httpOnly: true,
        signed: true // 表示这个cookie是签名cookie
    })

    res.send("设置cookie成功");
})

server.get('/list', (req, res) => {
    console.log(req.cookies);
    console.log(req.signedCookies);

    res.send('<h1>传递cookie成功</h1>');
});
```

### session
```javascript
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
```