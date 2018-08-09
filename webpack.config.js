const path = require('path');

module.exports = {
	entry: './src/index.ts',
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: [
					/node_modules/,
					/\\.spec\\.ts$/,
				],
			},
		],
	},
	resolve: {
		extensions: [
			'.ts',
			'.js',
		],
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		library: 'Application',
		libraryExport: 'default',
	},
};