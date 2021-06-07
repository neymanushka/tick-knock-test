const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	mode: 'development',
	devtool: 'inline-source-map',
	entry: './src/index.ts',
	output: {
		filename: 'bundle.js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'template',
			template: './src/index.html',
		}),
	],
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},
	module: {
		rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }],
	},
};
