import './bootstrap';

import { createApp } from 'vue/dist/vue.esm-bundler';
import { TailwindPagination } from 'laravel-vue-pagination';
import { createRouter, createWebHistory } from 'vue-router';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import CategoriesIndex from './Components/Categories/Index.vue';
import PostsIndex from './Components/Posts/Index.vue';
import PostsCreate from './Components/Posts/Create.vue';
import PostsEdit from './Components/Posts/Edit.vue';


const routes = [
    {path: '/dashboard', name: 'dashboard', component: PostsIndex},
    {path: '/posts', name: 'posts.index', component: PostsIndex},
    {path: '/posts/create', name: 'posts.create', component: PostsCreate},
    {path: '/posts/:id/edit', name: 'posts.edit', component: PostsEdit},
    {path: '/categories', name: 'categories.index', component: CategoriesIndex},
];

const router = createRouter({
    history: createWebHistory(), routes
});

const app = createApp ( {} );

app.component('categories-index', CategoriesIndex);
app.use(router);
app.use(VueSweetalert2);
app.component('posts-index', PostsIndex);
app.component('Pagination', TailwindPagination);
app.mount('#app');
