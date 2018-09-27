import Vue from 'vue';
import App from './app.vue';

import './assets/styles/global.styl';

const root = document.createElement('div');
document.body.appendChild(root);
// 入口js，通过vue来挂载vue的组件
new Vue({
    render:(h)=>h(App)
}).$mount(root);