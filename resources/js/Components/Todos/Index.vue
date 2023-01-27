<template>
    <link href="https://unpkg.com/todomvc-app-css@2.1.0/index.css" rel="stylesheet" />

    <section class="todoapp">
        <header class="header">
            <h1 style="top: -60px !important;">todos</h1>
            <p style="text-align: center; color: red;">{{ validation }}</p>
            <input class="new-todo" autofocus autocomplete="off" v-model="newTodo" @keyup.enter="storeTodo(newTodo)" placeholder="What needs to be done?">
        </header>

        <section class="main">
            <input class="toggle-all" id="toggle-all" type="checkbox">
            <label for="toggle-all">Mark all as complete</label>

            <ul class="todo-list">
                <li class="todo" v-for="todo in todos" :class="{ completed: todo.completed }">
                    <div class="view">
                        <input class="toggle" type="checkbox" :checked="todo.completed" @change="changeTodoStatus(todo.id)">
                        <label @dblclick="editTodo = todo.title; showTodoInput = todo.id">
                            {{ todo.title }}
                            <small style="font-size: 10px; position: absolute; right: 5px; top: 8px;">{{ todo.completed_at }}</small>
                        </label>
                        <input :autofocus="showTodoInput == todo.id" type="text" style="z-index: 1; height: 45px; width: 100%; position: absolute; top: 0;" 
                                v-model="editTodo" v-if="showTodoInput == todo.id" @keyup.enter="updateTodo(todo.id, editTodo)"
                                @focusout="showTodoInput = editTodo = ''">
                        <button class="destroy" @click="destroyTodo(todo.id)"></button>
                        <button class="edit" @click="destroyTodo(todo.id)"></button>
                    </div>
                </li>

                <li class="todo completed" style="text-align: center;" v-if="todos.length == 0">
                    <div class="view" style="padding: 20px; color: #ccc;"> No Todos </div>
                </li>
            </ul>
        </section>

        <footer class="footer" style="overflow: hidden; height: 40px;">
            <span class="todo-count">
                <strong>{{ notCompletedCount }}</strong> item left
            </span>
            <ul class="filters">
                <li><a href="javascript:void(0)" @click.prevent="filterCompletedValue = null" :class="{selected: filterCompletedValue === null}">All</a></li>
                <li><a href="javascript:void(0)" @click.prevent="filterCompletedValue = 0"    :class="{selected: filterCompletedValue === 0}">Active</a></li>
                <li><a href="javascript:void(0)" @click.prevent="filterCompletedValue = 1"    :class="{selected: filterCompletedValue === 1}">Completed</a></li>
            </ul>
            <button class="clear-completed" @click.prevent="destroyCompletedTodos()"> Clear completed </button>
        </footer>
    </section>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import useTodos from '../../Composables/todos';

export default {
    setup() {
        const filterCompletedValue = ref( null );
        const { filter, validation, newTodo, editTodo, showTodoInput, notCompletedCount, todos, getTodos, storeTodo, updateTodo, destroyTodo, changeTodoStatus, destroyCompletedTodos } = useTodos();
        document.getElementById('page-title').textContent = 'Todos';
        onMounted(() => getTodos());

        watch(filterCompletedValue, function(current, prev) {
            filter.value.completed = current;
            getTodos();
        });

        return { filter, filterCompletedValue, validation, newTodo, showTodoInput, editTodo, notCompletedCount, todos, storeTodo, updateTodo, destroyTodo, changeTodoStatus, destroyCompletedTodos };
    }
}
</script>
