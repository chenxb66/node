const Koa = require('koa');
const Router = require('koa-router');

const router = new Router();
router.get('/news/:id', async ctx = > {
    console.log(ctx.params);
});

const app = new Koa();
app.use(router.routes());

app.listen(8080);