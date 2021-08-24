const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'src', 'index.jsx'),
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].js'
    },
    mode: process.env.NODE_ENV || 'development',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192,
                    }
                  },
                ],
                type: 'javascript/auto'
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html')
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map[query]'
        }),
        new Dotenv(),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'public')
        },
        proxy: {
            '/poke': {
                target: 'https://pokeapi.co/api/v2',
                pathRewrite: { '^/poke': '' },
                secure: false,
                changeOrigin: true,
            },
            '/loc': {
                target: 'https://api.craft-demo.net/pokemon',
                pathRewrite: { '^/loc': '' },
                secure: false,
                changeOrigin: true,
            }
        },
        hot: true,
        historyApiFallback: true,
        port: 4000
    },
    devtool: 'source-map'
}
