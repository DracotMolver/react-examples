const path = require('path');
const webpack = require('webpack');


const config = {
    context: path.resolve(path.join(__dirname, 'client')),
    entry: {
        index: path.resolve(path.join(__dirname, 'client', 'dev', 'index.js')),
        html: path.resolve(path.join(__dirname, 'client', 'src', 'index.html'))
    },
    output: {
        filename: '[name].js',
        path: path.resolve(path.join(__dirname, 'client', '/dist')),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /\/node_modules\//,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            'es2015',
                            'react'
                        ],
                        plugins: ['syntax-dynamic-import'],
                        compact: true
                    },
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }
            }
        ]
    }
};

module.exports = config;