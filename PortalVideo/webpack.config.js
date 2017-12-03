const path = require('path');
const glob = require('glob-all');

const webpack = require("webpack");
const ExtractText = require("extract-text-webpack-plugin");

const DEV = path.resolve(path.join(__dirname, 'client', 'dev'));
const OUTPUT = path.resolve(path.join(__dirname, 'client', 'output'));

const ExtractCss = new ExtractText({
    filename: 'style.css',
    allChunks: true
});

const config = {
    entry: {
        index: DEV + '/index.jsx'
    },
    output: {
        path: OUTPUT,
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react'],
                        plugins: ['syntax-dynamic-import']
                    }
                }
            },
            { // -======= CSS =======-
                test: /\.css$/,
                use: ExtractCss.extract({
                    fallback: 'style-loader',
                    use:
                        {
                            loader: 'css-loader',
                            options: {
                                url: false
                            }
                        }
                })
            },
            { // -======= SASS =======-
                test: /\.sass$/,
                use: ExtractCss.extract({
                    fallback: 'style-loader',
                    use: [
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
                })
            },
            { // -======= IMG =======-
                test: /\.(png|ico|jpeg|jpg)$/,
                use: ['file-loader?name=[name].[ext]']
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        ExtractCss
    ]
};

module.exports = config;