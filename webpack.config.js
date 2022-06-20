const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const DotEnv = require("dotenv-webpack");

const environment = process.env.NODE_ENV;

let config;

config = {
	mode: environment,
	entry: resolve(__dirname, "./src/index.tsx"),
	output: {
		path: resolve(__dirname, "./dist"),
		filename: "bundle.js",
	},
	resolve: {
		extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx", ".json"],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
			{
				test: /\.(jpe?g|gif|png|svg)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
						},
					},
				],
			},
			{
				test: /\.s(a|c)ss$/,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader",
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "index.html",
			inject: "body",
		}),
		new DotEnv({
			safe: true,
			allowEmptyValues: false,
			silent: false,
			defaults: false,
		}),
	],
	experiments: {
		asyncWebAssembly: true
	}
};

switch(environment) {
	case "production":
		config.optimization = {
			minimizer: [new TerserWebpackPlugin()],
		};
		break;
	case "development":
		config.devServer = {
			port: 3000,
			open: true,
			hot: true,
			compress: true,
			liveReload: true,
			historyApiFallback: true,
		}
		break;
}

module.exports = config;