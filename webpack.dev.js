const webpack = require('webpack');
const { merge } = require('webpack-merge');
const configCommon = require('./webpack.common.js');
const childProcess = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(configCommon, {
    mode: 'development',
    devServer: {
        client: {
            overlay: true,
            logging: 'error',
        },
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            /** For Webpack 5 */
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 20 * 1024,
                    },
                },
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: `
            Build Date: ${new Date().toLocaleString()}
            Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')}
            Author: ${childProcess.execSync('git config user.name')}
            `,
        }),
        // new webpack.DefinePlugin({}),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            templateParameters: {
                env: ' (For developing)',
            },
        }),
        new CleanWebpackPlugin(),
    ],
    devtool: 'inline-source-map',
});
