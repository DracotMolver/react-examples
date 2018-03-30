const path = require('path');
const glob = require('glob-all');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const DEV = path.resolve(path.join(__dirname, 'client', 'dev'));
const OUTPUT = path.resolve(path.join(__dirname, 'client', 'output'));

const config = {
    entry: {
        index: `${DEV}/index.js`,
        vendor: [
            'react',
            'react-dom',
            'react-router-dom'
        ]
    },
    output: {
        path: OUTPUT,
        filename: '[name].js',
        chunkFilename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react'],
                        plugins: [
                            'syntax-dynamic-import',
                            'transform-object-rest-spread'
                        ]
                    }
                }
            },
            { // -======= CSS =======-
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            url: false
                        }
                    }
                ]
            },
            { // -======= SASS =======-
                test: /\.sass$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            url: false
                        }
                    }
                ]
            },
            { // -======= IMG =======-
                test: /\.(png|ico|jpeg|jpg)$/,
                use: ['file-loader?name=[name].[ext]']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            template: `${DEV}/index.html`,
            filename: path.resolve(path.join(__dirname, 'client', 'index.html')),
            inject: 'body'
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
};

module.exports = config;