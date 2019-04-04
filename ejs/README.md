# ejs

# koa-ejs
```javascript
const Koa = require('koa');
const ejs = require('koa-ejs');
const path = require('path');

const app = new Koa();
app.listen(8080);

ejs(app, {
    root: path.reslove(__dirname, 'resource/views'),
    layout: false // 加了一层
    viewExt: 'html',    // 扩展名
    cache: false, // 是否缓存
    debug: false // 调试信息
})

server.use(async ctx => {
    ctx.render('index/index', {});
});