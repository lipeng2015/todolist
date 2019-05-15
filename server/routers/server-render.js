const ejs = require('ejs');

module.exports = async(ctx,renderer,template)=>{
    // 指定返回html
    ctx.headers['Content-Type'] = 'text/html';

    const context = {url:ctx.path};

    try{
        const appString = await renderer.renderToString(context);
        //获取标签信息
        const {title} = context.meta.inject();
        const html = ejs.render(template,{
            appString,
            // 带有style标签的整个字符串
            style:context.renderStyles(),
            // 带有script标签的整个字符串
            scripts:context.renderScripts(),
            title:title.text()
        });
        // 返回给客户端
        ctx.body = html;
    }catch (err){
        console.log('render error',err);
        throw err;
    }
}