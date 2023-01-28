<style>
    .todoapp { margin-top: 95px }
    .todoapp .header h1 { top: -60px !important }
    .todoapp .header .errors { text-align: center; color: red }
    .todoapp .footer { overflow: hidden; height: 40px }

    .todo .view .completed-date {
        font-size: 10px;
        position: absolute;
        right: 5px;
        top: 8px;
    }

    .todo-list .todo.no-todos { text-align: center }
    .todo-list .todo.no-todos .view { padding: 20px; color: #ccc }

    .editing-section {
        z-index: 1;
        height: 45px; 
        width: 100%; 
        position: absolute; 
        top: 9px;
    }

    .editing-section input { display: block; width: 100%; }

    .editing-section .note {
        font-size: 9px;
        color: #858531;
        position: absolute;
        bottom: 0;
        right: 5px;
    }
</style>

<template>
    <link href="https://unpkg.com/todomvc-app-css@2.1.0/index.css" rel="stylesheet" />

    <section class="todoapp">
        <header class="header">
            <h1>todos</h1>
            <p class="errors">{{ validation }}</p>
            <input class="new-todo" autofocus autocomplete="off" v-model="newTodo" @keyup.enter="storeTodo(newTodo)" placeholder="What needs to be done?">
        </header>

        <section class="main">
            <input class="toggle-all" id="toggle-all" type="checkbox" title="Mark all as complete" v-model="completeAll" @change="changeAllTodosStatus(Number(completeAll))" :checked="completeAll">
            <label for="toggle-all" title="Mark all as complete">Mark all as complete</label>

            <ul class="todo-list">
                <li class="todo" v-for="todo in todos" :class="{ completed: todo.completed }">
                    <div class="view">
                        <input class="toggle" type="checkbox" :checked="todo.completed" @change="changeTodoStatus(todo.id)">
                        <label @dblclick="editTodo = todo.title; showTodoInput = todo.id">
                            {{ todo.title }}
                            <small class="completed-date">{{ todo.completed_at }}</small>
                        </label>
                        <button class="destroy" @click="destroyTodo(todo.id)"></button>
                    </div>
                    <p class="editing-section" v-if="showTodoInput == todo.id">
                        <input autocomplete type="text"
                                v-model="editTodo" @keyup.enter="updateTodo(todo.id, editTodo)"
                                @focusout="showTodoInput = editTodo = validation = ''" @keyup.esc="showTodoInput = editTodo = validation = ''">
                        <small class="note"> Press <b>ESC</b> or <b>Focusout</b> to cancel editing </small>
                    </p>
                </li>

                <li class="todo completed no-todos" v-if="todos.length == 0">
                    <div class="view"> No Todos </div>
                </li>
            </ul>
        </section>

        <footer class="footer">
            <span class="todo-count">
                <strong>{{ notCompletedCount }}</strong> item{{ notCompletedCount > 1 ? 's' : '' }} left
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
        const { filter, validation, newTodo, editTodo, showTodoInput, notCompletedCount, completeAll, todos, getTodos, storeTodo, updateTodo, destroyTodo, changeTodoStatus, changeAllTodosStatus, destroyCompletedTodos } = useTodos();
        document.getElementById('page-title').textContent = 'Todos';
        onMounted(() => getTodos());

        watch(filterCompletedValue, function(current, prev) {
            filter.value.completed = current;
            getTodos();
        });

        return { filter, filterCompletedValue, validation, newTodo, showTodoInput, editTodo, notCompletedCount, completeAll, todos, storeTodo, updateTodo, destroyTodo, changeTodoStatus, changeAllTodosStatus, destroyCompletedTodos };
    }
}
</script>
