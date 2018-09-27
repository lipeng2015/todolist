<template>
    <section class="real-app">
        <input type="text" class="add-input" autofocus="autofocus" placeholder="接下去要做什么？" @keyup.enter="addTodo">
        <Item :todo="todo" v-for="todo in filterTodos" :key="todo.id" @del="deleteTodo"/>
        <Tabs :filter="filter" :todos="filterTodos" @toggle="toggleFilter" @clearAll="claerAllCompleted"></Tabs>
    </section>
</template>

<script>
    import Item from '../todo/item.vue';
    import Tabs from '../todo/tabs.vue';

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
            Item, Tabs
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