<template>
    <transition name="fade" @after-leave="afterLeave" @after-enter="afterEnter">
        <div class="notification" :style="style" v-show="visible" @mouseenter="clearTimer" @mouseleave="createTimer">
            <span class="content">{{content}}</span>
            <a class="btn" @click.prevent="handleClose">{{btn}}</a>
        </div>
    </transition>

</template>

<script>
    export default {
        name: 'notification',
        props: {
            content: {
                type: String,
                require: true
            },
            btn: {
                type: String,
                default: '关闭'
            }
        },
        data() {
            return {
                visible: true
            }
        },
        methods: {
            handleClose() {
                // 通知父组件去关闭
                this.$emit('close');
            },
            afterLeave(){
                this.$emit('closed');
            },
            // 声明一下避免报错
            afterEnter(){

            },
            clearTimer(){

            },
            createTimer(){

            }
        },
        computed: {
            style() {
                return {};
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .notification {
        right 0
        bottom 50px
        display flex
        background-color #303030
        color rgba(255, 255, 255, 1)
        align-items center
        padding 20px
        position fixed
        min-width 280px
        box-shadow 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.3)
        flex-wrap wrap
        transition all .3s
        .content {
            padding 0
        }
        .btn {
            color #ff4081
            padding-left 24px
            margin-left auto
            cursor pointer
        }
    }
</style>