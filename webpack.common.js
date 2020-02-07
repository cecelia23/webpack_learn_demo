const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
// PWA
const WorkBoxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: {
        app: './src/test.js'
    },
    // ts
    // entry: {
    //     app: './src/testts.ts'
    // },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module:{
        rules:[
            {
                test:/\.css/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            // {
            //     test:/\.tsx?$/,
            //     use: 'ts-loader',
            //     exclude: /node_modules/
            // }
        ]
    },
    // resolve:{
    //     extensions:['.ts', '.tsx', '.js']
    // },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'PWA'
        }),
        // new webpack.ProvidePlugin({
        //     join: ['lodash','join']
        // }),
        new WorkBoxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        })
    ]
}