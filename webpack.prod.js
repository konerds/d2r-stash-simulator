const webpack = require('webpack');
const { merge } = require('webpack-merge');
const configCommon = require('./webpack.common.js');
const childProcess = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(configCommon, {
    mode: 'production',
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                },
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
        new HtmlWebpackPlugin({
            template: './src/index.html',
            templateParameters: {
                env: '',
            },
            hash: true,
            favicon: './src/favicon.png',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
            },
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({ filename: '[name].css' }),
    ],
    devtool: 'hidden-source-map',
});
