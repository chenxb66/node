/**
 * css处理,增加浏览器前缀
 * 依赖: css-loader、style-loader、postcss-loader
 * 依赖2：postcss.config.js
 */
const path = require('path');

module.exports = {
    mode: "development",
    entry: "./src/js/index.js",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.min.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            }
        ]
    }
}