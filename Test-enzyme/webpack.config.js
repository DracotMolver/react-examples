const path = require('path');

const CLIENT = path.resolve(path.join(__dirname, 'client'));

const config = {
    context: CLIENT,
    entry: {
        index: path.join(CLIENT, 'dev', 'index.js'),
        html: path.join(CLIENT, 'src', 'index.html')
    },
    output: {
        filename: '[name].js',
        path: path.join(CLIENT, '/dist')
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