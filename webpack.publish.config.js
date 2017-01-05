/**
 * Created by feel on 2016/12/28.
 */

// 发布项目时候的配置信息
// 开发时候的配置信息
// 这是最基本的一个配置文件
// 编写配置文件，要有最基本的文件入口和输出文件配置信息等
// 里面还可以加loader和各种插件配置使用
var path = require('path');
var webpack = require("webpack");//在头部引入
var ExtractTextPlugin = require("extract-text-webpack-plugin");// 提取样式文件的插件
var HtmlWebpackPlugin = require('html-webpack-plugin');// 创建index页面
var externals = require('./src/package.json');
var config = {

    //devtool: 'source-map',
    // 项目入口文件
    entry: {
        app: path.resolve(__dirname, 'src/app.js'),
        //当你的应用依赖其他库尤其是像 React JS 这种大型库的时候，你需要考虑把这些依赖分离出去，这样就能够让用户在你更新应用之后不需要再次下载第三方文件。当满足下面几个情况的时候你就需要这么做了：
        vendors: ['react', 'react-dom']
    },
    // 编译之后的输出路径
    output: {
        path: path.resolve(__dirname, 'publish'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx后缀名的文件
                loader: 'babel',// 加载模块 "babel" 是 "babel-loader" 的缩写
                query: {
                    presets: ['es2015', 'react', 'stage-0', 'stage-1', 'stage-2', 'stage-3']
                },
                exclude: 'node_modules', //模块加载不编译，加快编译速度
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.css$/, // Only .css files
                //loader: 'style!css' // 同时用两个，中间用感叹号隔开loaders
                // 加载 CSS 需要 css-loader 和 style-loader，他们做两件不同的事情，css-loader会遍历 CSS 文件，然后找到 url() 表达式然后处理他们，style-loader 会把原来的 CSS 代码插入页面中的一个 style 标签中。
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
                ,
                exclude: 'node_modules', //模块加载不编译，加快编译速度
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.scss$/,
                // loader: 'style!css!sass'
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
                ,
                exclude: 'node_modules', //模块加载不编译，加快编译速度
                include: path.join(__dirname, 'src')
            },
            //{
            //    test: /\.(png|jpg)$/,
            //    loader: 'url?limit=25000'  // 如果加参数中间用？号，&号进行多个参数的连接
            //},
            {
                test: /\.(png|jpeg|gif|jpg|icns|icon)$/,
                loader: 'file-loader?name=images/[name].[ext]'
                ,
                exclude: 'node_modules', //模块加载不编译，加快编译速度
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
                exclude: 'node_modules', //模块加载不编译，加快编译速度
                include: path.join(__dirname, 'src')
            }
        ]
    },
    resolve: {
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        //注意一下, extensions 第一个是空字符串! 对应不需要后缀的情况.
        extensions: ['', '.js', '.json', '.scss', 'jsx']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        //只报出错误或警告，但不会终止编译，建议如果是开发环境可以把这一项去掉
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),// 提取js公共部分插件
        new ExtractTextPlugin("[name].css"),
        new HtmlWebpackPlugin({
            title: 'Custom template using Handlebars',
            template: './src/index.html',
            files: {}
            // htmlWebpackPlugin: {
            //     "files": {
            //         "css": ["main.css"],
            //         "js": ["assets/head_bundle.js", "assets/main_bundle.js"]
            //     }
            // }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        // 去重
        new webpack.optimize.DedupePlugin(),
        ////压缩打包的文件
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
    ],

    //target: 'electron-renderer',

    externals: Object.keys(externals || {})
};
// // 动态添加插件的一个方法
if (process.env.NODE_ENV === 'production') {

    config.devtool = '';
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        // 代码混淆
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    );
}

module.exports = config;