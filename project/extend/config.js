const config = require('../config');

module.exports = app => {
    app.keys = config.app.keys;
    app.config = config;
    app.context.config = config;

    console.log('init config success...');
};