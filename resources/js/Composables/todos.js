import axios from 'axios';
import { ref, inject } from 'vue';

export default function useTodos()
{
    const completeAll = ref( false );
    const validation = ref( '' );
    const newTodo = ref( {title: '', priority: 0} );
    const editTodo = ref( {title: '', priority: 0} );
    const showTodoInput = ref( '' );
    const todos = ref( {} );
    const notCompletedCount = ref( 0 );
    const swal  = inject('$swal');

    const getTodos  = async () => {
        axios.get('/api/todos')
                .then(response => { todos.value = response.data.data; getNotCompletedTodosCount();})
                .catch(error => showErrors(error));
    };

    const storeTodo = async () => {
        axios.post('/api/todos', newTodo.value)
                .then(response => {
                    todos.value.unshift(response.data.data);
                    getNotCompletedTodosCount();
                    resetVars();
                })
                .catch(error => showErrors(error));
    };

    const updateTodo = async (id) => {
        axios.put(`/api/todos/${id}`, editTodo.value)
                .then(response => {
                    todos.value[ getTodoIndex(id) ] = response.data.data;
                    resetVars();
                })
                .catch(error => showErrors(error));
    };

    const changeTodoStatus = async (id) => {
        axios.post(`/api/todos/${id}/change-status`)
                .then(response => {
                    todos.value[ getTodoIndex(id) ] = response.data.data;
                    getNotCompletedTodosCount();
                })
                .catch(error => showErrors(error));
    };

    const changeAllTodosStatus = async (status) => {
        axios.post(`/api/todos/change-all-status`, {status: status})
                .then(response => {
                    todos.value = response.data.data;
                    getNotCompletedTodosCount();
                })
                .catch(error => showErrors(error));
    };

    const destroyTodo = async (id) => {
        axios.delete(`/api/todos/${id}`)
                .then(response => {
                    todos.value.splice(getTodoIndex(id), 1);
                    getNotCompletedTodosCount();
                })
                .catch(error => showErrors(error));
    };

    const destroyCompletedTodos = async () => {
        axios.delete('/api/todos/completed/remove')
                .then(response => { todos.value = todos.value.filter( (todo) => !todo.completed ) })
                .catch(error => showErrors(error));
    };

    const getNotCompletedTodosCount = async () => {
        var allNotCompleted = todos.value.filter( (todo) => !todo.completed );
        notCompletedCount.value = allNotCompleted.length;
        completeAll.value = notCompletedCount.value == 0;
    };

    const getTodoIndex = (id) => {
        return todos.value.findIndex(function(todo) {
            return todo.id == id;
        });
    }

    const showErrors = async (error) => {
        if (error.response?.data) {
            validation.value = error.response.data.message;
        } else {
            swal({title: error, icon: 'error'});
        }
    }

    const resetVars = () => {
        newTodo.value = {title: '', priority: 0};
        editTodo.value = {title: '', priority: 0};
        showTodoInput.value = validation.value = validation.value = '';
    }

    return { validation, newTodo, editTodo, showTodoInput, notCompletedCount, completeAll, todos, getTodos, storeTodo, updateTodo, destroyTodo, changeTodoStatus, changeAllTodosStatus, destroyCompletedTodos };
}
