const path = require('path');

module.exports = {
    mode: "development",
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: "bundle.min.js"
    },
    devtool: 'source-map'
}