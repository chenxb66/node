const Router = require('koa-router');


const router = new Router();

router.get('/login', async ctx => {
    ctx.body = 'account的login';
});

module.exports = router.routes();