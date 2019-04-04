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