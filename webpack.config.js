const PACKAGE = require('./package.json');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const isProd = process.argv.includes("--production");

console.log("Compilando para  " + (isProd ? "prod" : "develop"));
module.exports = {
	entry: './src/main.ts',
	mode: isProd ? 'production' : 'development',
	devtool: isProd ? false : 'inline-source-map',
	module: {
		rules: [{
			test: /\.tsx?$/,
			use: 'ts-loader',
			exclude: /node_modules/
		}]
	},
	output: { path: buildPath },
	devServer: { contentBase: 'build' },
	resolve: { extensions: ['.ts', '.js'] },
	plugins: [
		new CopyWebpackPlugin({ patterns: [{ from: 'assets', to: '', globOptions: { ignore: ['**/index.html'] } }] }),
		new HTMLWebpackPlugin(
			{ template: 'assets/index.html', filename: 'index.html', templateParameters: { PACKAGE: PACKAGE, buildDate: new Date } })
	],
	optimization: {
		minimize: isProd
	}
};