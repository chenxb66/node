/**
 * 热更新机制
 * 依赖：npm i webpack webpack-cli webpack-dev-server -D
 * package: script: {"start": "webpack-dev-server"}
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
                test: /\.jsx?$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            } 
        ]
    },
    devtool: "source-map"
}