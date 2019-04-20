# ejs

## 普通使用
- 模版
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>测试ejs</title>
</head>
<body>
    <ul>
    <% name.forEach(item => { -%>
        <li><%= item %></li>
    <% }) -%>
    </ul>
</body>
</html>
```
- 代码
```javascript
const ejs = require('ejs');


ejs.renderFile('./resources/views/index/index.html', {name: [1, 2, 3]}, (err, data) => {
    console.log(data);
});
```

## koa-ejs

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

app.use(async ctx => {
    await ctx.render('index/index', {});
});