const Router = require('koa-router');
const jwt = require('jsonwebtoken');
const secret = 'pengli';

const userRouter = new Router({
    prefix:'/user'
});
// 针对浏览器的session
// userRouter.post('/login',async ctx=>{
//     const user = ctx.request.body;
//     console.log('user',user);
//     if(user.username === 'pengli' && user.password === 'a111111'){
//         ctx.session.user = {
//             username:'pengli'
//         }
//         ctx.body ={
//             success:true,
//             data:{
//                 username:"pengli"
//             }
//         }
//     }else{
//         ctx.status = 400;
//         ctx.body = {
//             success: false,
//             message:'wrong password'
//         }
//     }
// });

// 针对客户端的token
userRouter.post('/login',async ctx=>{
    const user = ctx.request.body;
    console.log('user',user);
    if(user.username === 'pengli' && user.password === 'a111111'){
        let userToken = {
            username:'pengli'
        };
        const token = jwt.sign(userToken,secret,{expiresIn:'1h'});//token签名有效期
        ctx.body ={
            success:true,
            data:{
                msg:"登录成功",
                token
            }
        }
    }else{
        ctx.status = 400;
        ctx.body = {
            success: false,
            message:'wrong password'
        }
    }
});

module.exports = userRouter;