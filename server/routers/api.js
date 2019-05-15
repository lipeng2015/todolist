const Router = require('koa-router');

const apiRouter = new Router({
    prefix: '/api'
});

const validateUser = async (ctx, next) => {
    if (!ctx.session.user) {
        ctx.status = 401;
        ctx.body = 'need login'
    } else {
        await next();
    }
}

// apiRouter.use(validateUser);

// 对返回结果进行封装
const successResponse = (data) => {
    return {
        success: true,
        data
    }
}

apiRouter
    .get('/todos', async (ctx) => {
        // 获取所有的todo
        console.log('ctx', ctx);
        console.log('ctx.request.body', ctx.request.body);
        const todos = await ctx.db.getAllTodos();
        ctx.body = successResponse(todos);
    })
    .post('/todo', async (ctx) => {
        //增加一个todo
        console.log('ctx', ctx);
        console.log('ctx.request.body', ctx.request.body);
        const data = await ctx.db.addTodo(ctx.request.body);
        ctx.body = successResponse(data);
    })
    .put('/todo:id', async (ctx) => {
        const data = await ctx.db.updateTodo(ctx.params.id, ctx.request.body);
        ctx.body = successResponse(data);
    })

module.exports = apiRouter;