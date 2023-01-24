import axios from 'axios';
import { useRouter } from 'vue-router';
import { ref, inject } from 'vue';

export default function usePosts()
{
    const router     = useRouter();
    const urlQuery   = ref( {page: 1, post_id: '', category: '', column: 'id', order: 'DESC', search: ''} );
    const posts      = ref( {} );
    const post       = ref( {} );
    const errors     = ref( {} );
    const swal       = inject('$swal');
    const is_loading = ref( false );

    const getPosts  = async () => {
        axios.get(`/api/posts?${new URLSearchParams(urlQuery.value)}`)
            .then(response => posts.value = response.data)
            .catch(error => console.log(error));
    };

    const getPost  = async (id) => {
        axios.get(`/api/posts/${id}`)
            .then(response => post.value = response.data.data)
            .catch(error => console.log(error));
    };

    const storePost = async (post) => {
        if (is_loading.value) return;

        is_loading.value = true;
        errors.value     = {};

        let postData = new FormData();
        for (let item in post) {
            if (post.hasOwnProperty(item))
                postData .append(item, post[item]);
        }

        axios.post('/api/posts', postData)
            .then(response => {
                router.push({ name: 'posts.index' });
                swal({title: 'Post Created', icon: 'success'});
            })
            .catch(error => {
                if (error.response?.data) {
                    errors.value = error.response.data.errors;
                }
            })
            .finally(() => { is_loading.value = false });
    };

    const updatePost = async (post) => {
        if (is_loading.value) return;

        is_loading.value = true;
        errors.value     = {};

        let postData = new FormData();
        for (let item in post) {
            if (post.hasOwnProperty(item))
                postData .append(item, post[item]);
        }
        postData.append("_method", "put");

        axios.post(`/api/posts/${post.id}`, postData, {headers: { "Content-Type": "multipart/form-data" }})
            .then(response => {
                router.push({ name: 'posts.index' });
                swal({title: 'Post Updated', icon: 'success'});
            })
            .catch(error => {
                if (error.response?.data) {
                    errors.value = error.response.data.errors;
                }
            })
            .finally(() => { is_loading.value = false });
    };

    const deletePost = async (id) => {
        swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/posts/${id}`)
                        .then(response => {
                            getPosts();
                            swal({title: 'Post Deleted', icon: 'success'});
                        })
                        .catch(error => {
                            swal({title: 'Something went wrong!', icon: 'error'});
                        });
            }
        })

        
    };

    return { urlQuery, posts, post, errors, is_loading, getPosts, storePost, getPost, updatePost, deletePost };
}
