import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import Vuex from 'vuex';


import './assets/styles/global.styl';
import createRouter from './config/router';
import createStore from './store/store.js';
// 使用插件
Vue.use(VueRouter);
Vue.use(Vuex);
const router = createRouter();
const store = createStore();

router.beforeEach((to,from,next)=>{
    console.log('before each invoked');
    // 必须要调next方法,路由才会使用
    // 可以根据路径判断是否路由启用
    next()
});
router.beforeResolve((to,from,next)=>{
    console.log('after each resolve');
    // 必须要调next方法
    next()
});
// 第二个参数为回调方法，监听store值的变化
// store.watch((state)=> state.count+1,()=>{
//
// });

// 通过模板注入就不需要创建节点
// const root = document.createElement('div');
// document.body.appendChild(root);
// 入口js，通过vue来挂载vue的组件
new Vue({
    // 直接注入到vue中
    router,
    // 也是直接注入到vue中 要放到最外层的VUE对象中
    store,
    render:(h)=>h(App)
}).$mount('#root');