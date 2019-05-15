const Router = require('koa-router');
const axios = require('axios');
const MemoryFS = require('memory-fs');//类似于fs,不会写入磁盘，但是会写入内存中
const webpack = require('webpack');
const VuewServerRenderer = require('vue-server-renderer');//服务端渲染需要的插件
const path = require('path');
const fs = require('fs');

// 拿到服务端的配置
const serverConfig = require('../../build/webpack.config.server');
const serverRender = require('./server-render');
// 在node环境编译webpack
const serverCompiler = webpack(serverConfig);
const mfs = new MemoryFS();
// 输出目录为内存
serverCompiler.outputFileSystem = mfs;

let bundle;
serverCompiler.watch({}, (err, stats) => {
    if (err) throw err;
    stats = stats.toJson();
    stats.errors.forEach(err => console.log(err));
    stats.warnings.forEach(warn => console.warn(warn));

    const bundlePath = path.join(
        serverConfig.output.path,
        'vue-ssr-server-bundle.json'
    );
    // 通过内存取出就比较快
    bundle = JSON.parse(mfs.readFileSync(bundlePath,'utf-8'));
    console.log('new bundle generated');
});

const handleSSR = async(ctx)=>{
    if(!bundle){
        ctx.body = '请稍等';
        return;
    }

    const clientManifestResp = await axios.get(
        'http://127.0.0.1:8000/public/vue-ssr-client-manifest.json'
    );

    const clientManifest = clientManifestResp.data;

    const template = fs.readFileSync(
        path.join(__dirname,'../server.template.ejs'),'utf-8'
    );

    // 会在里面自动生成一个带script引用的字符串
    const rennderer = VuewServerRenderer.createBundleRenderer(bundle,{
        inject:false,
        clientManifest
    });

    await serverRender(ctx,rennderer,template);

};
const router = new Router();
router.get('*',handleSSR);

module.exports = router;