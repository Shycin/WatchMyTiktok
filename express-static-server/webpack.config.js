// eslint-disable-next-line no-unused-vars
const path = require('path');

module.exports = {
	entry: {
		blocks: './src/index.js',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.(jpg|jpeg|png|gif|mp3|svg|ttf|woff2|woff|eot)$/gi,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[hash].[ext]',
						outputPath: 'assets/imgs',
					},
				},
			},
			{
				test: /.\.(s[ac]ss|css)$/i,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[path][name].css',
					},
				},
				{
					loader: 'sass-loader',
				},
				],
			},
			{
				test: /\.svg$/,
				use: [{
					loader: 'svg-url-loader',
					options: {
						limit: 10000,
					},
				},
				],
			},
		],
	},
};
