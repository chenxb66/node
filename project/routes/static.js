const Router = require('koa-router');
const static = require('koa-static');
const config = require('../config');
const path = require('path');

const router = new Router();
const basedir = path.resolve(__dirname, '../public');

// img文件
router.all(/(\.jpg|\.png|\.gif)$/i , static(basedir, {
     maxAge: config.cache.img * 86400 * 1000,
}));

// js文件
router.all(/\.js$/i , static(basedir, {
    maxAge: config.cache.js * 86400 * 1000,
}))

// css文件
router.all(/\.css$/i , static(basedir, {
     maxAge: config.cache.css * 86400 * 1000, 
}))

// html文件
router.all(/\.html$/i , static(basedir, {
     maxAge: config.cache.html * 86400 * 1000, 
}))

// 其它文件
router.all('*' , static(basedir, {
     maxAge: config.cache.other * 86400 * 1000,
}))

module.exports = router.routes();