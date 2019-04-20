/**
 * 使用url-loader打包文件并且base64
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
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpg|jpeg|png|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        outputPath: 'img/',
                        limit: 100*1024 // 100 * 1k,表示小于这个大小的图片全部编译成base64，大于则还是一个文件
                    }
                }
            }
        ]
    }
}