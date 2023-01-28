import axios from 'axios';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

const user = reactive( {name: '', email: ''} );

export default function useAuth()
{
    const router = useRouter();
    const errors = ref( {} );
    const loginForm = reactive({
        email: 'mahmoud-kon@app.com',
        password: 123,
        remember: false
    });

    const submitLogin = async () => {
        axios.post('/login', loginForm)
            .then(response => {
                loginUser(response);
                router.push({name: 'posts.index'});
            })
            .catch(error => console.log(error));
    };

    const logout = async () => {
        axios.post('/logout')
            .then(response => router.push({name: 'login'}))
            .catch(error => console.log(errors) );
    };

    const getUser = async () => {
        axios.get('/api/user')
            .then(response => loginUser(response))
            .catch(error => console.log(errors) );
    };

    const loginUser = (response) => {
        user.name = response.data.name;
        user.email = response.data.email;
        localStorage.setItem('loggedIn', JSON.parse(true));
    }
    return { loginForm, errors, submitLogin, logout, getUser, user };
}