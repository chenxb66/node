const Router = require('koa-router');
const staticRouter = require('./static');
const adminRouter = require('./admin');

module.exports = app => {

    const router = new Router();

    // 后台所有路由
    router.use('/admin', adminRouter);
    
    // 静态资源文件
    router.use(staticRouter);

    // 监听文件入口
    app.use(router.routes());
}