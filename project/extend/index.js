const database = require('./database');
const template = require('./template');
const config = require('./config');

module.exports = app => {

    // 配置写入
    config(app);

    // 初始化数据库
    database(app);

    // 初始化模版
    template(app);
};