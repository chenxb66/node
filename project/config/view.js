const path = require('path');

module.exports = {
    root: path.resolve(__dirname, '../resources/views'),
    layout: false, // 加了一层
    viewExt: 'html',    // 扩展名
    cache: false, // 是否缓存
    debug: false // 调试信息
}