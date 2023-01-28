<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">

        <table class="w-full text-sm text-left border-collapse text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">

                <tr>
                    <td style="width: 100px;">
                        <input type="search" v-model="post_id" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50" placeholder="Filter By ID">
                    </td>

                    <td colspan="2">
                        <input type="search" v-model="search" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50" placeholder="Filter By Title / Content" required>
                    </td>

                    <td>
                        <select v-model="selectedCategory" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg">
                            <option value="" selected>--- Filter By Category ---</option>
                            <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
                        </select>
                    </td>

                    <td></td>

                    <td colspan="2" class="text-right">
                        <router-link :to="{name: 'posts.create'}"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2">
                                Create Post
                        </router-link>
                    </td>
                </tr>

                <tr class="text-center">
                    <th scope="col" class="cursor-pointer px-6 py-3" :class="urlQuery.column == 'id' ? 'text-green-700' : ''" @click="updateOrdering('id')">
                        Id
                        <span :class="urlQuery.column == 'id' && urlQuery.order == 'ASC' ? '' : 'hidden'" style="font-size: 20px;">&uarr;</span>
                        <span :class="urlQuery.column == 'id' && urlQuery.order == 'DESC' ? '' : 'hidden'" style="font-size: 20px;">&darr;</span>
                        <span :class="urlQuery.column === 'id' ? 'hidden' : ''"><svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></span>
                    </th>
                    <th scope="col" class="cursor-pointer px-6 py-3 border-l" :class="urlQuery.column == 'title' ? 'text-green-700' : ''" @click="updateOrdering('title')">
                        <div class="flex items-center">
                            Title
                            <span :class="urlQuery.column == 'title' && urlQuery.order == 'ASC' ? '' : 'hidden'" style="font-size: 20px;">&uarr;</span>
                            <span :class="urlQuery.column == 'title' && urlQuery.order == 'DESC' ? '' : 'hidden'" style="font-size: 20px;">&darr;</span>
                            <span :class="urlQuery.column === 'title' ? 'hidden' : ''"><svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></span>
                        </div>
                    </th>
                    <th scope="col" class="cursor-pointer px-6 py-3 border-l" :class="urlQuery.column == 'content' ? 'text-green-700' : ''" @click="updateOrdering('content')">
                        Content
                        <span :class="urlQuery.column == 'content' && urlQuery.order == 'ASC' ? '' : 'hidden'" style="font-size: 20px;">&uarr;</span>
                        <span :class="urlQuery.column == 'content' && urlQuery.order == 'DESC' ? '' : 'hidden'" style="font-size: 20px;">&darr;</span>
                        <span :class="urlQuery.column === 'content' ? 'hidden' : ''"><svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></span>
                    </th>
                    <th scope="col" class="cursor-pointer px-6 py-3 border-l" :class="urlQuery.column == 'category_id' ? 'text-green-700' : ''" @click="updateOrdering('category_id')">
                        Category
                        <span :class="urlQuery.column == 'category_id' && urlQuery.order == 'ASC' ? '' : 'hidden'" style="font-size: 20px;">&uarr;</span>
                        <span :class="urlQuery.column == 'category_id' && urlQuery.order == 'DESC' ? '' : 'hidden'" style="font-size: 20px;">&darr;</span>
                        <span :class="urlQuery.column === 'category_id' ? 'hidden' : ''"><svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></span>
                    </th>
                    <th scope="col" class="cursor-pointer px-6 py-3 border-l" :class="urlQuery.column == 'created_at' ? 'text-green-700' : ''" @click="updateOrdering('created_at')">
                        Created At
                        <span :class="urlQuery.column == 'created_at' && urlQuery.order == 'ASC' ? '' : 'hidden'" style="font-size: 20px;">&uarr;</span>
                        <span :class="urlQuery.column == 'created_at' && urlQuery.order == 'DESC' ? '' : 'hidden'" style="font-size: 20px;">&darr;</span>
                        <span :class="urlQuery.column === 'created_at' ? 'hidden' : ''"><svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></span>
                    </th>
                    <th scope="col" class="cursor-pointer px-6 py-3 border-l"> Image </th>
                    <th scope="col" class="cursor-pointer px-6 py-3 border-l"> Actions </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="post in posts.data" class="bg-white border-b dark:bg-gray-900 dark:border-gray-700" :id="'post-row-'+post.id">
                    <th class="px-6 py-4">{{ post.id }}</th>
                    <td class="px-6 py-4 border-l">{{ post.title }}</td>
                    <td class="px-6 py-4 border-l">{{ post.short_content }}</td>
                    <td class="px-6 py-4 border-l">{{ post.category }}</td>
                    <td class="px-6 py-4 border-l">{{ post.created_at }}</td>
                    <td class="px-6 py-4 border-l">
                        <img v-if="post.image" :src="post.image" style="width: 50px; height: 50px; border-radius: 50%;" >
                    </td>
                    <td class="px-6 py-4 border-l" style="40px">
                        <router-link :to="{ name: 'posts.edit', params: { id: post.id } }" class="text-center mb-1 pointer-events-auto rounded-md bg-indigo-600 py-2 px-5 text-[0.8125rem] font-semibold leading-5 text-white  hover:bg-indigo-500"> Edit </router-link>
                        <button @click.prevent="deletePost(post.id)" class="block text-center w-100 mb-1 mt-2 pointer-events-auto rounded-md bg-red-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-red-500"> Delete </button>
                    </td>
                </tr>
                <tr v-if="posts.data && posts.data.length == 0">
                    <td colspan="10" class="px-6 py-4 text-center"> No Data Found</td>
                </tr>
            </tbody>

            <tfoot>
                <tr>
                    <td colspan="10" class="text-center  py-4">
                        <Pagination :data="posts" @pagination-change-page="page => current_page = page"></Pagination>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script>
    import { ref, onMounted, watch } from 'vue';
    import usePosts from '../../composables/posts';
    import useCategories from '../../composables/list-categories';

    export default {
        setup() {
            const selectedCategory = ref( '' );
            const search           = ref( '' );
            const current_page     = ref( 1 );
            const post_id          = ref( '' );
            const { urlQuery, posts, getPosts, deletePost } = usePosts();
            const { categories, getCategories } = useCategories();

            onMounted( () => {
                getPosts(), getCategories()
            });

            watch(selectedCategory, function(current, prev) {
                urlQuery.value.category = current
                getPosts();
            });

            watch(search, function(current, prev) {
                urlQuery.value.search = current
                getPosts();
            });

            watch(current_page, function(current, prev) {
                urlQuery.value.page = current
                getPosts();
            });

            watch(post_id, function(current, prev) {
                urlQuery.value.post_id = current
                getPosts();
            });

            watch(search, function(current, prev) {
                urlQuery.value.search = current
                getPosts();
            });

            const updateOrdering = (val) => {
                urlQuery.value.column = val;
                urlQuery.value.order = urlQuery.value.order == 'DESC' ? 'ASC' : 'DESC';
                urlQuery.value.page = 1;
                getPosts();
            }

            return { urlQuery, posts, getPosts, deletePost, categories, selectedCategory, updateOrdering, search, post_id, current_page };
        }
    }
</script>
