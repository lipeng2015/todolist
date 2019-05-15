const path = require('path');
const {VueLoaderPlugin} = require('vue-loader');
const HtmlPlugin = require('html-webpack-plugin');// 针对html来单独进行处理
const webpack = require('webpack');
const ExtractPlugin = require('extract-text-webpack-plugin');//针对css进行单独压缩处理
const VueServerPlugin = require('vue-server-renderer/server-plugin');

const isDev = process.env.NODE_ENV === 'development';

const config = {
    mode: 'development',

    // 编译的目标是node环境下
    target: "node",
    // 页面入口，通过路径拼接来配置入口js
    entry:path.join(__dirname, '../client/server-entry.js'),
    //打包后的输出文件
    output: {
        // 入口的形式
        libraryTarget: "commonjs2",
        filename: "server-entry.js",
        path: path.join(__dirname,'../server-build'),

    },
    // 配置的话调试的时候可以看到自己源码
    devtool: "#source-map",
    // 不打包这些文件，避免与客户端重复打包
    externals: Object.keys(require('../package').dependencies),
    devServer: {
        port: 8000,
        host: '0.0.0.0',
        // 有错误就显示出来
        overlay: {
            errors: true
        },
        // 自动打开浏览器true
        open:false,
        // 只渲染当前组件的内容，需要插件支持
        hot:true,
    },
    module: {
        // 在node端打包的时候不需要这些
        rules: [
            {
                // 配置加载vue文件
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                // 配置加载jsx文件
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                // 加载css样式
                test: /\.css$/,
                use: [
                    // 要放在前面。。
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg$)/,
                use: [
                    {
                        //小图片转换成base64
                        loader: 'url-loader',
                        options: {
                            // 多大的图片转成base64
                            limit: 1024,
                            //ext 为扩展名
                            name: 'resources/[path][name]-[hash].[ext]'
                        }
                    }
                ]

            },
            {
                test: /\.styl/,
                use: ExtractPlugin.extract({
                    fallback:'vue-style-loader',
                    use:[
                        'css-loader',
                        {
                            loader:'postcss-loader',
                            options:{
                                sourceMap:true
                            }
                        },
                        'stylus-loader'
                    ]
                })
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        // 可以自动包含js组件
        new HtmlPlugin(),
        // 判断环境的作用
        new webpack.DefinePlugin({
            'process.env': {
                // 可以在代码中引用
                NODE_ENV: isDev ? '"development"' : '"production"',
                VUE_ENV:'"server"'
            }
        }),
        new VueServerPlugin(),
        // 处理css
        new ExtractPlugin('styles.[hash:8].css'),
        // 类库单独打包 webpack4.0废除Commons 使用此插件
        new webpack.optimize.SplitChunksPlugin({
            name:'vendor'
        })
    ]
}

module.exports = config;