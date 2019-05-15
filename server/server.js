const Koa = require('koa');

const koaSend = require('koa-send');
const path = require('path');
const app = new Koa();
const staticRouter = require('./routers/static');
const apiRouter = require('./routers/api');
const userRouter =require('./routers/user');
const createDb = require('./db/db');
const config = require('../app.config');
const koaBody = require('koa-body');
const KoaSession = require('koa-session');
const jwt= require('jsonwebtoken');
const jwtkoa = require('koa-jwt');
const util = require('util');
const verify = util.promisify(jwt.verify);//解密
const secret = 'pengli';

const db = createDb(config.db.appId, config.db.appKey);


const isDev = process.env.NODE_ENV === 'development';
console.log("isDev", isDev);


app.keys = ['vue ssr tech'];
// 很对浏览器的cookie
// app.use(KoaSession({
//     key: 'v-ssr-id',
//     maxAge: 2 * 60 * 60 * 1000
// },app));
// 针对客户端的token
// app.use(jwtkoa({secret}).unless({
//     path:[/^\/user\/login/] // 数组中的路径不要通过jwt验证
// }));

app.use(async (ctx, next) => {
    try {
        console.log("isDev", isDev);
        console.log(`request with path ${ctx.path}`);
        await next();
    } catch (err) {
        console.log(err);
        if (isDev) {
            ctx.body = err.message;
        } else {
            ctx.body = '网络错误';
        }
    }
});

app.use(async (ctx, next) => {
    ctx.db = db;
    await next();
});

app.use(async (ctx, next) => {
    if (ctx.path === '/favicon.ico') {
        // 不能写绝对路径
        koaSend(ctx, '/favicon.ico', {root: path.join(__dirname, '../')});
    } else {
        await next();
    }
});


app.use(koaBody());
app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(staticRouter.routes()).use(staticRouter.allowedMethods());
app.use(apiRouter.routes()).use(apiRouter.allowedMethods());

let pageRouter;
if (isDev) {
    pageRouter = require('./routers/dev-ssr');
} else {
    pageRouter = require('./routers/ssr');
}

app.use(pageRouter.routes()).use(pageRouter.allowedMethods());

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3333;

app.listen(PORT, HOST, () => {
    console.log(`server is listening on ${HOST}:${PORT}`);
});
