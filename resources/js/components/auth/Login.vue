<template>
    <form @submit.prevent="submitLogin">
        <div>
            <label class="block font-medium text-sm text-gray-700 dark:text-gray-300">Email</label>
            <input type="email" class="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm" v-model="loginForm.email">

            <div class="text-red-600 mt-1">
                <p v-for="message in errors?.email"> {{ message }} </p>
            </div>
        </div>

        <div>
            <label class="block font-medium text-sm text-gray-700 dark:text-gray-300">Password</label>
            <input type="password" class="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm" v-model="loginForm.password">

            <div class="text-red-600 mt-1">
                <p v-for="message in errors?.password"> {{ message }} </p>
            </div>
        </div>

        <div class="block mt-4">
            <label for="remember_me" class="inline-flex items-center">
                <input id="remember_me" type="checkbox" class="rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800" v-model="loginForm.remember">
                <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
            </label>
        </div>

        <div class="flex items-center justify-end mt-4">
            <button class="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150">
                Login
            </button>
        </div>
    </form>
</template>

<script>
    import useAuth from '../../composables/auth';
    export default {
        setup() {
            const { loginForm, errors, submitLogin } = useAuth();
            return { loginForm, errors, submitLogin };
        }
    }
</script>