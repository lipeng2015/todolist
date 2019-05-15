import createApp from './create-app';
import routes from "./config/routes";

export default context => {
    return new Promise((resolve,reject)=>{
        // 每次都需要创建
        const {app, router, store} = createApp();
        router.push(context.url);
        router.onReady(()=>{
            // 判断组件是否有该组件
            const matchedCompenents = router.getMatchedComponents();
            if(!matchedCompenents.length){
                return reject(new Error('no component'));
            }
            // 获取到所有的Promise
            Promise.all(matchedCompenents.map(Component =>{
                // 判断是否有asyncData方法
                if(Component.asyncData){
                    // 有的话就调用
                    return Component.asyncData({
                        route:router.currentRoute,
                        store
                    });
                }
            })).then(data=>{
                console.log(data);
            });

            context.meta = app.$meta();
            //路由中组件完毕的时候调用
            resolve(app);
        });
    })
}