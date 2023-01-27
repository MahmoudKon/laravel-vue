import axios from 'axios';
import { ref } from 'vue';

export default function useCategories()
{
    const categories = ref( {} );
    const getCategories = async () => {
        axios.get('/api/categories-list')
            .then(response => categories.value = response.data)
            .catch(error => console.log(error));
    };

    return { categories, getCategories };
}