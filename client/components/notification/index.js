import Notification from './notification.vue';
import notify from './function';

//通过Vue来把自定义组件注入进去，就可以全局使用
export default (Vue) => {
    Vue.component(Notification.name, Notification);
    // 可以直接通过方法直接调用
    Vue.prototype.$notify = notify;
}