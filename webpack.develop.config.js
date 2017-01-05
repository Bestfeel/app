/**
 * Created by feel on 2016/12/28.
 */
// 开发时候的配置信息
// 这是最基本的一个配置文件
// 编写配置文件，要有最基本的文件入口和输出文件配置信息等
// 里面还可以加loader和各种插件配置使用
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");// 提取样式文件的插件
var HtmlWebpackPlugin = require('html-webpack-plugin');// 创建index页面
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
module.exports = {
    // 项目入口文件
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        path.resolve(__dirname, 'src/app.js')
    ],
    // 编译之后的输出路径
    output: {
        path: path.resolve(__dirname, 'publish'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx后缀名的文件
                loader: ['babel'],// 加载模块 "babel" 是 "babel-loader" 的缩写
                query: {
                    presets: ['es2015', 'react', 'stage-0', 'stage-1', 'stage-2', 'stage-3']
                },
                exclude: 'node_modules', //模块加载不编译，加快编译速度
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.css$/, // Only .css files
                loader: 'style!css' // 同时用两个，中间用感叹号隔开loaders
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url'  // 如果加参数中间用？号，&号进行多个参数的连接
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            //{
            //    test: /\.(png|jpg)$/,
            //    loader: 'url?limit=2500000'  // 如果加参数中间用？号，&号进行多个参数的连接
            //}
            {
                test: /\.(png|jpeg|gif|jpg)$/,
                loader: 'file-loader?name=images/[name].[ext]'
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),// 提取js公共部分插件
        new ExtractTextPlugin("[name].css"),
        new HtmlWebpackPlugin({
            title: 'Custom template using Handlebars',
            template: './src/index.html',
            files: {}
        }),
        new OpenBrowserPlugin({url: 'http://localhost:8080/'})
    ]
};