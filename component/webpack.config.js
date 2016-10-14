const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const APPDIR = 'app/';

module.exports = {
    context: path.resolve(__dirname, APPDIR),
    entry: "./index.js",
    output: {
	path: path.resolve(__dirname, 'build'),
	filename: "bundle.js"
    },

    module: {
	loaders: [
	    {test: /\.css$/, loader: "style!css"}
	],
	loaders: [
	    {test: /\.scss$/, loader: "style!css!sass"}
	]
    },

    plugins: [
	new HtmlWebpackPlugin({
	    template: './index.html',
	    filename: 'index.html',
	    inject: 'body'
	})
    ],

    devServer: {
	inline: true
    }
};
