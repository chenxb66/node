/**
 * 最简单的webpack入门，默认打包且只能打包js
 * 单入口案例
 */
const path = require('path');

module.exports = {
    mode: "development",    // none, development production
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.min.js"
    }
}