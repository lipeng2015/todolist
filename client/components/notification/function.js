import Component from './func-notification';
import Vue from 'vue';

// 通过此方法来创建一个vue组件
const notificationConstructor = Vue.extend(Component);
// 保存创建的组件的列表
const instances = [];
let seed = 1;
const removeInstance = (instance) => {
    if (!instance) return;
    const len = instances.length;
    const index = instances.findIndex(inst => instance.id === inst.id);
    instances.splice(index, 1);
    if (len <= 1) return;
    const removeHeight = instance.vm.height;
    for (let i = index; i < len - 1; i++) {
        // 被删掉节点之后的位置都需要进行下移
        instances[i].verticalOffset = parseInt(instances[i].verticalOffset) - removeHeight - 16;
    }
}

// 通过方法调用需要传参，而options就是调用方法时传递的参数
const notify = (options) => {
    // 服务端操作的时候就不需要，因为没有dom环境
    if (Vue.prototype.$isServer) return;
    // const {autoClose, ...rest} = options;

    const instance = new notificationConstructor({
        propsData: options,
        data: {
            autoClose: options.autoClose === undefined ? 3000 : options.autoClose
        }
    });
    // 生成组件的id。可以方便删除
    instance.id = `notification_${seed++}`;
    // 返回组件的一个vue对象
    instance.vm = instance.$mount();
    // 获取组件的element然后把节点添加进去
    document.body.appendChild(instance.vm.$el);
    instance.vm.visible = true;

    let verticalOffset = 0;
    instances.forEach(item => {
        verticalOffset += item.$el.offsetHeight + 16
    });
    verticalOffset += 16;
    instance.verticalOffset = verticalOffset;
    instances.push(instance);

    instance.vm.$on('close', () => {
        instance.vm.visible = false;
    });

    //监听closed事件，
    instance.vm.$on('closed', () => {
        // 然后删掉隐藏后的节点
        removeInstance(instance);
        // 然后删掉节点
        document.body.removeChild(instance.vm.$el);
        // 然后摧毁组件的vue对象，避免占用内存
        instance.vm.$destroy();
    });
    return instance.vm;
};

export default notify;