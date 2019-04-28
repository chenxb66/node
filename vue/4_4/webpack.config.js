const path = require('path');

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dest"),
        filename: "bundle.min.js"
    },
    module: {
        rules: [
            {test: /\.css$/i, use: ['style-loader', 'css-loader']},
            {test: /\.(svg|eot|woff|woff2|ttf)$/, use: 'file-loader'}
        ]
    }
}