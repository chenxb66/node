const Router = require('koa-router');

const router = new Router();

router.get('/login', async ctx => {
    ctx.body = 'admin的login';
});

module.exports = router.routes();