# koa


## 安装

## 案例

### 路由
- 基础
```javascript
const Koa = require('koa');
const Router = require('koa-router');

const router = new Router();
router.get('/', async ctx => {
    ctx.body = '<h1>hello world</h1>';
});

const app = new Koa();

app.use(router.routes());

app.listen(8080);
```
- 嵌套
> 1.路由文件：routes/user/admin.js
```javascript
const Router = require('koa-router');

const router = new Router();

router.get('/login', async ctx => {
    ctx.body = 'admin的login';
});

module.exports = router.routes();
```
> 2.路由文件：routes/user/account.js
```javascript
const Router = require('koa-router');

const router = new Router();

router.get('/login', async ctx => {
    ctx.body = 'account的login';
});

module.exports = router.routes();
```
> 3.路由文件：routes/user/index.js
```javascript
const Router = require('koa-router');

const router = new Router();

router.use('/admin', require('./admin'));
router.use('/account', require('./account'));

module.exports = router.routes();
```
> 4.入口文件：index.js
```javascript
const Koa = require('koa');
const Router = require('koa-router');
const userRouter = require('./routes/user');

const router = new Router();
const server = new Koa();

router.use('/user', userRouter);
server.use(router.routes());

server.listen(8080);
```
- 可变参数
```javascript
const Koa = require('koa');
const Router = require('koa-router');

const router = new Router();
router.get('/news/:id', async ctx => {
    console.log(ctx.params);
});

const app = new Koa();
app.use(router.routes());

app.listen(8080);
```

### server
- context
```javascript
const Koa = require('koa');
const Router = require('koa-router');

const router = new Router();
const app = new Koa();

app.context.author = 'enyccc';

router.get('/', async ctx => {
    console.log(ctx.author);
});

app.use(router.routes());

app.listen(8080);
```

- ctx常用属性和函数
    - params
    - query
    - method
    - url
    - ip
    - path
    - headers
    - state
    - request
    - response
    - thorw(code, message)
    - assert(condition, code, message)
    - 跳转： redirect()
    - 下载文件名：attachment() 

### 静态资源服务器
```javascript
const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');

const router = new Router();
const app = new Koa();

router.staticRouter = new Router();
// 图片缓存60天
staticRouter.all(/(\.jpg|\.png|\.gif)$/i , static('./static', {
     maxAge: 60 * 86400 * 1000, //缓存2天
}));

// js和css文件缓存1天
staticRouter.all(/(\.css|\.js)$/i , static('./static', {
     maxAge: 1 * 86400 * 1000, //缓存2天
}))

// html文件缓存1天
staticRouter.all(/\.html$/i , static('./static', {
     maxAge: 2 * 86400 * 1000, //缓存2天
}))

// 其它的内容缓存3天
staticRouter.all('*' , static('./static', {
     maxAge: 3 * 86400 * 1000, //缓存2天
}))

app.use(staticRouter.routes());

app.listen(8080);
```

### post请求（包含文件上传）
```javascript
const Koa = require('koa');
const Router = require('koa-router');
const body = require('koa-better-body');

const app = new Koa();
const router = new Router();

app.use(body({
    uploadDir: './static/upload'
}));

router.post('/avatar', async ctx => {
    // 文件和post数据都在这
    console.log(ctx.request.fields);

    ctx.body = '上传成功';
})

app.use(router.routes());

app.listen(8080);
```

### cookie - 内置
```javascript
const Koa = require('koa');
const Router = require('koa-router');


const app = new Koa();

app.keys = ['dafsdfaf', 'yuiwerbjx', 'qonmzi'];

app.listen(8080);

const router = new Router();

router.get('/add', async ctx => {
    ctx.cookies.set('author', 'cxb', {
        signed: true
    })
    ctx.body = '设置成功';
});

router.get('/list', async ctx => {
    let value = ctx.cookies.set('author', 'cxb', {
        signed: true
    })
    ctx.body = value;
});


app.use(router.routes());
```
### session
```javascript
const Koa = require('koa');
const session = require('koa-session');

const app = new Koa();
app.listen(8080);

app.keys = [1, 2, 3];

server.use(session({
    maxAge: 20 * 60 * 1000, // 20分钟有效期
    renew: true // 自动续期
}, app));

server.use(async ctx => {
    ctx.session['view']++;
});
```

### 全局处理try...catch
```javascript
const Koa = require('koa');

const app = new Koa();
app.listen(8080);

// 这样就能全局捕获
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        ctx.body = "Server Error";
    }
});


app.use(async ctx => {
    throw 404;
});
```