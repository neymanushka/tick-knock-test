const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

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
	 new CopyPlugin({
      patterns: [
        { from: "./src/bunny.png", to: "./" },
      ],
    }),
	],
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},
	module: {
		rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }],
	},
};
