import './bootstrap';
import 'sweetalert2/dist/sweetalert2.min.css';

import { createApp, onMounted } from 'vue/dist/vue.esm-bundler';
import { TailwindPagination } from 'laravel-vue-pagination';
import VueSweetalert2 from 'vue-sweetalert2';
import router from './routes/Index';
import CategoriesIndex from './components/categories/Index.vue';
import PostsIndex from './components/posts/Index.vue';
import useAuth from './composables/auth';

const app = createApp ({
    setup() {
        const { getUser } = useAuth();
        onMounted(getUser);
    }
});

app.use(router);
app.use(VueSweetalert2);
app.component('posts-index', PostsIndex);
app.component('categories-index', CategoriesIndex);
app.component('Pagination', TailwindPagination);
app.mount('#app');
