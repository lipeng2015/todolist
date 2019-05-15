<template>
    <section class="real-app">
        <!--<tabs value="1">-->
            <!--<tab label="tab1" index="1"></tab>-->
            <!--<tab index="2"><span slot="label" style="color: red">tab2</span></tab>-->
            <!--<tab label="tab3" index="3"></tab>-->
        <!--</tabs>-->
        <input type="text" class="add-input" autofocus="autofocus" placeholder="接下去要做什么？" @keyup.enter="addTodo">
        <Item :todo="todo" v-for="todo in filterTodos" :key="todo.id" @del="deleteTodo"/>
        <Helper :filter="filter" :todos="filterTodos" @toggle="toggleFilter" @clearAll="claerAllCompleted"></Helper>
    </section>
</template>

<script>
    import Item from '../todo/item.vue';
    import Helper from '../todo/tabs.vue';

    let id = 0;
    export default {
        name: 'todo',
        data() {
            return {
                todos: [],
                filter: 'all'
            }
        },
        methods: {
            addTodo(e) {
                if (e.target.value) {
                    this.todos.unshift({
                        id: id++,
                        content: e.target.value.trim(),
                        completed: false
                    });
                    e.target.value = '';
                }
            },
            deleteTodo(id) {
                this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1);
            },
            toggleFilter(item) {
                this.filter = item;
            },
            claerAllCompleted(){
                // 避免批量删导致序号有误，可以直接通过过滤删掉
                this.todos = this.todos.filter(todo=>!todo.completed);
            }
        },
        // 不会默认执行
        asyncData(){
            return new Promise((resolve => {
                setTimeout(()=>{
                    resolve(123);
                },1000);
            }))
        },
        computed: {
            // 提前把过滤好的数据传给子控件
            filterTodos() {
                if (this.filter === 'all') {
                    return this.todos;
                }
                const completed = this.filter === 'completed';
                return this.todos.filter(todo => completed === todo.completed);
            }
        },
        components: {
            Item, Helper
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .real-app {
        width 600px
        margin 0 auto
        .add-input {
            position relative
            margin 0
            width 100%
            font-size 24px
            font-family inherit
            font-weight inherit
            line-height 1.4em
            border 0
            outline none
            color inherit
            box-shadow inset 0 0px 5px 0 rgba(0, 0, 0, 0.06)
            box-sizing border-box
            -webkit-font-smoothing antialiased
            padding 16px 16px 16px 60px

        }
    }
</style>