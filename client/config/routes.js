import Todo from '../views/todo/todo.vue';
import Login from '../views/login/Login.vue';
export default [
    {
        path:'/',
        redirect:'/app'
    },
    {
        path:'/app',
        component:Todo,
        meta:{
            title:'this is app'
        }
    },
    {
        path:'/login',
        component:Login
    }
]