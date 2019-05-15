import Vue from 'vue';
// vue对象中事件机制，在其他地方可以去发送事件，然后在router对象中监听事件去处理跳转，避免耦合
// 在需要的时候去发送事件 $emit('go')
// 然后在router中bus.on('go',{})去处理事件
export default new Vue();