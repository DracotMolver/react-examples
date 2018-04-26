const path = require('path');

const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const DEV = path.join(__dirname, 'client', 'dev');
const DIST = path.join(__dirname, 'client', 'dist');

const config = {
    entry: {
        index: [path.resolve(DEV, 'index.js')],
        vendor: [
            'react',
            'react-dom',
            'react-router-dom'
        ]
    },
    output: {
        path: path.resolve(DIST),
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash].js',
    },
    resolve: {
        alias: {
            // Constants
            Constants: path.resolve(DEV, 'constants'),
            // Components
            Commons: path.resolve(DEV, 'components', 'Commons'),
            Video: path.resolve(DEV, 'components', 'Video'),
            Login: path.resolve(DEV, 'components', 'Login'),
            HOC: path.resolve(DEV, 'components', 'HOC'),
            // Containers
            _Commons: path.resolve(DEV, 'containers', 'Commons'),
            _Login: path.resolve(DEV, 'containers', 'Login'),
            _VideoList: path.resolve(DEV, 'containers', 'VideoList'),
            _VideoSingle: path.resolve(DEV, 'containers', 'VideoSingle'),
            // Helpers
            Helpers: path.resolve(DEV, 'helpers')
        }
    },
    module: {
        // noParse: `${DEV}/constants/*.js`,
        rules: [
            {
                test: /\.js$/,
                include: [
                    DEV,
                    `${DEV}/App`,
                    `${DEV}/components`,
                    `${DEV}/constants`,
                    `${DEV}/containers`
                ],
                exclude: /node_modules/,
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
                        loader: 'css-loader',
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
            chunkFilename: '[id].css'
        }),
        new HtmlWebpackPlugin({
            template: `${DEV}/index.html`,
            filename: path.resolve(path.join(__dirname, 'client', 'index.html')),
            inject: 'body',
            cache: true
        }),
        new webpack.HashedModuleIdsPlugin()
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: true,
                    mangle: true
                },
                extractComments: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
};

module.exports = config;
