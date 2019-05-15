import Notification from './notification.vue';

// 自定义notification组件的属性配置
export default {
    extends: Notification,
    computed: {
        // 控制组件的样式
        style() {
            return {
                position: 'fixed',
                right: '20px',
                bottom: `${this.verticalOffset}px`
            }
        }
    },
    mounted() {
        this.createTimer();
    },
    methods: {
        createTimer() {
            if (this.autoClose) {
                this.timer = setTimeout(() => {
                    this.visible = false;
                }, this.autoClose);
            }
        },
        clearTimer() {
            if (this.timer) {
                clearTimeout(this.timer);
            }
        },
        afterEnter() {
            this.height = this.$el.offsetHeight;
        }
    },
    beforeDestroy() {
        this.clearTimer();
    },
    data() {
        return {
            verticalOffset: 0,
            autoClose: 3000,
            height: 0,
            visible:false
        }
    }
}