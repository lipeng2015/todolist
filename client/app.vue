<template>
    <div id="app">
        <div id="cover"></div>
        <!--直接定义在全局，然后通过vuex数据存储，请求的时候控制显示还是隐藏即可-->
        <!--<Loading></Loading>-->
        <HeaderLayout></HeaderLayout>
        <transition name="fade">
            <router-view></router-view>
        </transition>
        <!--<button @click="addN">click me</button>-->
        <!--<notification content="test notify"/>-->
        <Footer></Footer>
    </div>
</template>

<script>
    import HeaderLayout from './layout/Header.vue';
    import Footer from './layout/footer.jsx';
    import Todo from './views/todo/todo.vue';
    import Loading from './components/loading/Loading.vue';

    export default {
        name: 'app',
        // vue-meta组件
        metaInfo: {
            title: 'pengli-todo'
        },
        data() {
            return {
                test: 'abcdef'
            };
        },
        components: {
            HeaderLayout, Footer, Todo,Loading
        },
        methods:{
            addN(){
                this.$notify({
                    content: 'test $notify',
                    btn: '关闭'
                });
            }
        },
        mounted() {
            // 获取store的值
            // console.log(this.$store.state.count);
            //修改store的值 针对mutations
            // this.$store.commit('updateCount',200);
            // setInterval(()=>{
            //     console.log(this.$store.state.count);
            // },2000);
            // console.log(this.$store.getters.fullName);
            //修改值 针对actions
            // this.$store.dispatch('updateCountAsync',{
            //     num:5,
            //     time:2000
            // })

            this.$notify({
                content: 'test $notify',
                btn: '关闭'
            });
        }
    };
</script>

<style lang="stylus">
    #app {
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        #cover {
            position absolute
            left 0
            right 0
            top 0
            bottom 0
            background-color #999
            opacity .9
            z-index -1
        }
    }
</style>