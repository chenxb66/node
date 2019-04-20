const Router = require('koa-router');
const loginRouter = require('./login');
const bannerRouter = require('./banner');

const router = new Router();

// 登录状态判断
router.all('*', async (ctx, next) => {
    if (ctx.url != '/admin/login' && !ctx.session['admin']) {
        ctx.redirect('/admin/login');
    } else {
        await next();
    }
});

// 登录界面
router.use(loginRouter); 
// 后台首页
router.use(bannerRouter);

module.exports = router.routes();