/**
 * 多入口案例
 */
const path = require('path');

module.exports = {
    mode: "development",  
    entry: {
        index: "./src/js/index.js", // key随便取
        admin: "./src/js/admin.js"
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].min.js"
    }
};