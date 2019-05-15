const path = require('path');
const {VueLoaderPlugin} = require('vue-loader');

const config = {
    // mode: process.env.NODE_ENV || 'production',
    // 编译的目标是web环境下
    target: "web",
    // 页面入口，通过路径拼接来配置入口js
    entry: path.join(__dirname, '../client/client-entry.js'),
    //打包后的输出文件
    output: {
        // 打包成的文件的名字
        filename: "[name].[hash:8].js",
        // 文件打包后的路径
        path: path.join(__dirname, '../public'),
        publicPath: "http://127.0.0.1:8000/public/"
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
                // 配置加载js文件
                test: /\.js$/,
                loader: 'babel-loader',
                exclude:/node_modules/
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
                            name: 'resources/[path][name]-[hash:8].[ext]'
                        }
                    }
                ]

            }
        ]
    }
}

module.exports = config;