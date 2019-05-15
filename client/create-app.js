import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Meta from 'vue-meta';

import App from './app.vue';
import createRouter from './config/router';
import createStore from './store/store.js';
import './assets/styles/global.styl';
import Notification from './components/notification';
import Tabs from './components/tabs';
// 使用插件
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Meta);
//全局就可以使用改组件，而不用在使用的时候在引入
Vue.use(Notification);
Vue.use(Tabs);

// 每次创建都返回一个新的
export default ()=>{

    const router = createRouter();
    const store = createStore();
    const app = new Vue({
        // 直接注入到vue中
        router,
        // 也是直接注入到vue中 要放到最外层的VUE对象中
        store,
        render:(h)=>h(App)
    });
    return {app,router,store};
}