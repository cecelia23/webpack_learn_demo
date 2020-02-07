const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');

module.exports = merge(common,{
    mode: "production",
    output: {
        chunkFilename: '[name].[chunkhash].js'
    },
    devtool: "source-map",
    module: {
        rules: [
            // {
            //     test: require.resolve('./src/test.js'),
            //     use: 'imports-loader?this=>window'
            // },
             {
                test: require.resolve('./src/global.js'),
                use: 'exports-loader?file,parse=helper.parse'
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
    ],
    optimization:{
        splitChunks: {
            chunks: "initial"
        },
        runtimeChunk:{
            name: 'manifest'
        }
    },
})