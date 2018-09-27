<template>
    <div class="helper">
        <span class="left">{{unFinishedTodoLength}} items left</span>
        <span class="tabs">
            <span v-for="(state,index) in states" :key="index" :class="[state,filter === state?'actived':'']"
                  @click="toggleFilter(state)">{{state}}</span>
        </span>
        <span class="clear" @click="clearCompleted">Clear Completed</span>
    </div>
</template>

<script>
    export default {
        name: 'tabs',
        props: {
            filter: {
                type: String,
                require: true
            },
            todos:{
                type:Array,
                require:true
            }
        },
        computed:{
            unFinishedTodoLength(){
                return this.todos.filter(todo => !todo.completed).length;
            }
        },
        data() {
            return {
                states: ['all', 'active', 'completed']
            }
        },
        methods: {
            toggleFilter(item) {
                this.$emit('toggle',item);
            },
            clearCompleted() {
                this.$emit('clearAll');
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .helper {
        font-weight 100
        display flex
        justify-content space-between
        padding 5px 0
        line-height 30px
        background-color #fff
        font-size 14px
        .left, .clear, .tabs {
            padding 0 10px
            box-sizing border-box
        }
        .left, .clear {
            width 150px
        }
        .left {
            text-align left
        }
        .clear {
            text-align right
            cursor pointer
        }
        .tabs {
            width 200px
            display flex
            justify-content space-around
            * {
                display inline-block
                padding 0 10px
                cursor pointer
                border 1px solid rgba(175, 48, 48, 0)
                &.actived {
                    border-color: rgba(175, 47, 47, 0.4)
                    border-radius 5px
                }
            }
        }
    }


</style>