const path = require('path');
const {VueLoaderPlugin} = require('vue-loader');
const HtmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


const isDev = process.env.NODE_ENV === 'development';

const config = {
    mode: 'development',
    // 编译的目标是web环境下
    target: "web",
    // 页面入口，通过路径拼接来配置入口js
    entry: path.join(__dirname, 'src/index.js'),
    //打包后的输出文件
    output: {
        // 打包成的文件的名字
        filename: "bundle.js",
        // 文件打包后的路径
        path: path.join(__dirname, 'dist')
    },
    // 配置的话调试的时候可以看到自己源码
    devtool: "#cheap-module-eval-source-map",
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
                            name: '[name]-[hash].[ext]'
                        }
                    }
                ]

            },
            {
                test: /\.styl/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            sourceMap:true
                        }
                    },
                    'stylus-loader'
                ]
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
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        // 自动清理不必要的一些信息
        new webpack.NoEmitOnErrorsPlugin(),
        // 支持Hot功能
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = config;