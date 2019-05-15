const path = require('path');
const {VueLoaderPlugin} = require('vue-loader');
const HtmlPlugin = require('html-webpack-plugin');// 针对html来单独进行处理
const webpack = require('webpack');
const OptimizeCSSPlugin = require('mini-css-extract-plugin');//针对css进行单独压缩处理,webpack4开始使用
const VueClientPlugin = require('vue-server-renderer/client-plugin');//客户端的插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const baseConfig = require('./webpack.config.base');//引进基础的配置
const merge = require('webpack-merge');

const isDev = process.env.NODE_ENV === 'development';

console.log('isDev',isDev);
let config;
if(isDev){
    config =merge(baseConfig,{
        mode:'development',
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
            headers: { 'Access-Control-Allow-Origin': '*' },
            // 针对router使用了mode为history的，识别不出api，可以直接自动路由选择
            historyApiFallback:{
                index:'/public/index.html'
            }
        },
        // 配置的话调试的时候可以看到自己源码
        devtool: "#cheap-module-eval-source-map",
        module: {
            rules: [
                {
                    test: /\.styl/,
                    use: [
                        'vue-style-loader',
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        'stylus-loader'
                    ]
                }
            ]
        },
        plugins:[
            new VueLoaderPlugin(),
            // 可以自动包含js组件
            new HtmlPlugin({
                // 模板注入到Html中
                template:'index.html',
                filename:'index.html',
                inject:true
            }),
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
            new webpack.HotModuleReplacementPlugin(),
            new OptimizeCSSPlugin({
                filename: 'css/app.[name].css',
                chunkFilename: 'css/app.[contenthash:12].css'  // use contenthash *
            }),
            // 会自动生成一个默认的文件名 vue-ssr-client-manifest.json
            new VueClientPlugin()
        ],
        // 消除提示信息WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit (244 KiB). This can impact web performance.
        performance: {
            hints: false
        },
        // webpack4 新增的配置项
        optimization:{
            runtimeChunk:{
                name:'manifest'
            },
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true,
                    uglifyOptions: {
                        warnings: false
                    }
                }),
                new OptimizeCSSPlugin({
                    cssProcessorOptions: true
                        ? { safe: true, map: { inline: false } }
                        : { safe: true }
                }),
            ],
            splitChunks:{
                chunks: 'async',
                minSize: 30000,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                name: false,
                cacheGroups: {
                    vendor: {
                        name: 'vendor',
                        chunks: 'initial',
                        priority: -10,
                        reuseExistingChunk: false,
                        test: /node_modules\/(.*)\.js/
                    },
                    styles: {
                        name: 'styles',
                        test: /\.(scss|css)$/,
                        chunks: 'all',
                        minChunks: 1,
                        reuseExistingChunk: true,
                        enforce: true
                    }
                }
            }
        }
    })
}else{
    config = merge(baseConfig, {
        entry: {
            app: path.join(__dirname, '../client/client-entry.js'),
            vendor: ['vue']
        },
        output: {
            filename: '[name].[hash:8].js',
            publicPath: '/public/'
        },
        // 消除提示信息WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit (244 KiB). This can impact web performance.
        performance: {
            hints: false
        },
        module: {
            rules: [
                {
                    test: /\.styl/,
                    use: [
                        'vue-style-loader',
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
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
            new HtmlPlugin({
                // 模板注入到Html中
                template: 'index.html',
                filename: 'index.html',
                inject: true
            }),
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
            new webpack.HotModuleReplacementPlugin(),
            new OptimizeCSSPlugin({
                filename: 'css/app.[name].css',
                chunkFilename: 'css/app.[contenthash:12].css'  // use contenthash *
            }),
            // 会自动生成一个默认的文件名 vue-ssr-client-manifest.json
            new VueClientPlugin()
        ],
        // webpack4 新增的配置项
        optimization: {
            runtimeChunk: {
                name: 'manifest'
            },
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true,
                    uglifyOptions: {
                        warnings: false
                    }
                }),
                new OptimizeCSSPlugin({
                    cssProcessorOptions: true
                        ? {safe: true, map: {inline: false}}
                        : {safe: true}
                }),
            ],
            splitChunks: {
                chunks: 'async',
                minSize: 30000,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                name: false,
                cacheGroups: {
                    vendor: {
                        name: 'vendor',
                        chunks: 'initial',
                        priority: -10,
                        reuseExistingChunk: false,
                        test: /node_modules\/(.*)\.js/
                    },
                    styles: {
                        name: 'styles',
                        test: /\.(scss|css)$/,
                        chunks: 'all',
                        minChunks: 1,
                        reuseExistingChunk: true,
                        enforce: true
                    }
                }
            }
        }
    })
};

module.exports = config;