const ejs = require('koa-ejs');

module.exports = app => {
    // 初始化ejs模版
    ejs(app, app.config.view);

    console.log('init template success...');
}