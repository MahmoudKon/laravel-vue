import { createRouter, createWebHistory } from 'vue-router';
import AuthenticatedLayout from '../layouts/Authenticated.vue';
import GuestLayout from '../layouts/Guest.vue';
import CategoriesIndex from '../components/categories/Index.vue';
import PostsIndex from '../components/posts/Index.vue';
import PostsCreate from '../components/posts/Create.vue';
import PostsEdit from '../components/posts/Edit.vue';
import TodoIndex from '../components/todos/Index.vue';
import Login from '../components/auth/Login.vue';

function auth(to, from, next)
{
    if (JSON.parse( localStorage.getItem('loggedIn') ))
        next();

    next('/login');
}

const routes = [
    {
        component: GuestLayout,
        children: [
            {path: '/login', name: 'login', component: Login},
        ]
    },
    {
        component: AuthenticatedLayout,
        beforeEnter: function (to, from, next) {
            if (JSON.parse( localStorage.getItem('loggedIn') ))
                next();
        
            next('/login');
        },
        children: [
            {path: '/dashboard', name: 'dashboard', component: PostsIndex, meta: {title: 'Posts'}},
            {path: '/posts', name: 'posts.index', component: PostsIndex, meta: {title: 'Posts'}},
            {path: '/posts/create', name: 'posts.create', component: PostsCreate, meta: {title: 'Create New Post'}},
            {path: '/posts/:id/edit', name: 'posts.edit', component: PostsEdit, meta: {title: 'Edit Post'}},
            {path: '/categories', name: 'categories.index', component: CategoriesIndex, meta: {title: 'Categories'}},
            {path: '/todos', name: 'todos.index', component: TodoIndex, meta: {title: 'Todos'}},
        ]
    }
];

export default createRouter({
    history: createWebHistory(), routes
});