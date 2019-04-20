/**
 * 打包图片
 * 依赖: flie-loader
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
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpg|jpeg|gif|png)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: "img/"
                    }
                }
            }
        ]
    }
}