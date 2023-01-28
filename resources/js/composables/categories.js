import axios from 'axios';
import { ref } from 'vue';

export default function useCategories()
{
    const categories = ref( {} );
    const getCategories = async (page = 1) => {
        axios.get('/api/categories?page='+page)
            .then(response => categories.value = response.data)
            .catch(error => console.log(error));
    };
    return { categories, getCategories };
}