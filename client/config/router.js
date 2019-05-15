import Router from 'vue-router';
import routes from './routes';

// 避免内存溢出，不用同一个router
export default () => {
    return new Router({
        routes,
        // 可以不用加#
        mode: 'history',
        // 会自动在地址后加字符串base
        // base:'/base/',
        //针对router-link来配置class,路径都包含
        // linkActiveClass:'xxx',
        // 路径完全匹配会有这个class
        // exactActiveClass:'xxx'
        // 路由跳转的时候是否使用之前的滚动状态
        // scrollBehavior(to, from, savedPosition) {
        //     if (savedPosition) {
        //         return savedPosition;
        //     } else {
        //         return {x: 0, y: 0}
        //     }
        // }
        // 对参数进行一些操作
        // parseQuery(query){
        //
        // }
    })
}