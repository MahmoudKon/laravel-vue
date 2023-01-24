<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left border-collapse text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr class="text-center">
                    <th scope="col" class="px-6 py-3">ID</th>
                    <th scope="col" class="px-6 py-3 border-l">Name</th>
                    <th scope="col" class="px-6 py-3 border-l">Posts Count</th>
                    <th scope="col" class="px-6 py-3 border-l">Created At</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="category in categories.data" class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th class="px-6 py-4">{{ category.id }}</th>
                    <td class="px-6 py-4 border-l">{{ category.name }}</td>
                    <td class="px-6 py-4 border-l">{{ category.posts_count }}</td>
                    <td class="px-6 py-4 border-l">{{ category.created_at }}</td>
                </tr>
            </tbody>
        </table>

        <Pagination :data="categories" @pagination-change-page="getCategories"></Pagination>
    </div>
</template>

<script>
    import { onMounted } from 'vue';
    import useCategories from '../../Composables/categories';

    export default {
        setup() {
            document.getElementById('page-title').textContent = 'Categories';
            const { categories, getCategories } = useCategories();
            onMounted( getCategories );
            return { categories, getCategories };
        }
    }
</script>
