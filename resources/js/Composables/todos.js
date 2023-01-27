import axios from 'axios';
import { ref, inject } from 'vue';

export default function useTodos()
{
    const validation = ref( '' );
    const newTodo = ref( '' );
    const editTodo = ref( '' );
    const showTodoInput = ref( '' );
    const todos = ref( {} );
    const filter = ref( {completed: null} );
    const notCompletedCount = ref( 0 );
    const swal  = inject('$swal');

    const getTodos  = async () => {
        axios.get(`/api/todos?${new URLSearchParams(filter.value)}`)
            .then(response => { todos.value = response.data.data; getNotCompletedTodosCount();})
            .catch(error => showErrors(error));
    };

    const getNotCompletedTodosCount = async () => {
        axios.get(`/api/todos/count/not-completed`)
            .then(response => notCompletedCount.value = response.data)
            .catch(error => showErrors(error));
    };

    const storeTodo = async (title) => {
        axios.post('/api/todos', {title: title})
            .then(response => {
                getTodos();
                getNotCompletedTodosCount();
                newTodo.value = validation.value = '';
            })
            .catch(error => showErrors(error));
    };

    const updateTodo = async (id, title) => {
        axios.put(`/api/todos/${id}`, {title: title})
            .then(response => {
                getTodos();
                editTodo.value = showTodoInput.value = validation.value = '';
            })
            .catch(error => showErrors(error));
    };

    const changeTodoStatus = async (id) => {
        axios.post(`/api/todos/${id}/change-status`)
            .then(response => { getTodos(); getNotCompletedTodosCount; })
            .catch(error => showErrors(error));
    };

    const destroyTodo = async (id) => {
        axios.delete(`/api/todos/${id}`)
        .then(response => { getTodos(); getNotCompletedTodosCount; })
            .catch(error => showErrors(error));
    };

    const destroyCompletedTodos = async () => {
        axios.delete('/api/todos/completed/remove')
        .then(response => getTodos() )
            .catch(error => showErrors(error));
    };

    const showErrors = async (error) => {
        if (error.response?.data) {
            validation.value = error.response.data.message;
        } else {
            swal({title: error, icon: 'error'});
        }
    }

    return { filter, validation, newTodo, editTodo, showTodoInput, notCompletedCount, todos, getTodos, storeTodo, updateTodo, destroyTodo, changeTodoStatus, destroyCompletedTodos };
}
