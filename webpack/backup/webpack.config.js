/**
 * 多入口案例
 */
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/js/1.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.min.js'
    },
    module: {
        // 规则
        rules: [
            // 测试什么文件结尾的,使用什么插件,从后往前执行
            {test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader']},
            {test: /\.(jpg|jpeg|png|gif)$/i, use: {
                loader: 'file-loader',
                options: {
                    outputPath: 'img/'
                }
            }} 
        ]
    }
} 