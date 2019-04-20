/**
 * 案例10: 使用eslint保证代码质量
 * 配置文件：.eslintrc
 */
const path = require("path");

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
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: "eslint-loader"
				}
			}
		]
	}
}