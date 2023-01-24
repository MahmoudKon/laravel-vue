<template>

    <form @submit.prevent="storePost(post)" id="store-form">
        <div class="mb-6">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post Title</label>
            <input v-model="post.title" type="text" id="title"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                <div class="text-red-600 mt-1">
                    <div v-for="message in errors?.title">
                        {{ message }}
                    </div>
                </div>
        </div>

        <div class="mb-6">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
            <textarea v-model="post.content" name="content" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>

            <div class="text-red-600 mt-1">
                <div v-for="message in errors?.content">
                    {{ message }}
                </div>
            </div>
        </div>

        <div class="mb-6">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
            <select v-model="post.category_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="" selected>--- Select Category Name ---</option>
                <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
            </select>

            <div class="text-red-600 mt-1">
                <div v-for="message in errors?.category_id">
                    {{ message }}
                </div>
            </div>
        </div>

        <div class="mb-6">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post Image</label>
            <input @change="post.image = $event.target.files[0]" type="file" id="image"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                <div class="text-red-600 mt-1">
                    <div v-for="message in errors?.image">
                        {{ message }}
                    </div>
                </div>
        </div>

        <button type="submit" :disabled="is_loading"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <span v-if="is_loading">Processing...</span>
            <span v-else>Save</span>
        </button>
    </form>

</template>


<script>
import { onMounted, reactive } from 'vue';
import useCategories from '../../Composables/list-categories';
import usePosts from '../../Composables/posts';

export default {
    setup() {
        const post = reactive({ title: '', content: '', category_id: '', image: '' });
        document.getElementById('page-title').textContent = 'Create New Post';
        const { categories, getCategories } = useCategories();
        const { errors, is_loading, storePost } = usePosts();
        onMounted(() => { getCategories() });
        return { categories, post, errors, is_loading, storePost };
    }
}
</script>