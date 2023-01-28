<style>
    @import url("../../../css/todo.css");
</style>

<template>

    <section class="todoapp">
        <header class="header">
            <h1>todos</h1>
            <p class="errors">{{ validation }}</p>
            <div style="position: relative;">
                <input class="new-todo" autofocus autocomplete="off" v-model="newTodo.title" @keyup.enter="storeTodo()" placeholder="What needs to be done?">
                <select style="position: absolute; right: 5px; top: 0; bottom: 0;" v-model="newTodo.priority" >
                    <option value="0" style="color: gray;"> Low </option>
                    <option value="1" style="color: green;"> Normal </option>
                    <option value="2" style="color: yellow;"> High </option>
                    <option value="3" style="color: red;"> Urgent </option>
                </select>
            </div>
        </header>

        <section class="main">
            <input class="toggle-all" id="toggle-all" type="checkbox" title="Mark all as complete" v-model="completeAll" @change="changeAllTodosStatus(Number(completeAll))" :checked="completeAll">
            <label for="toggle-all" title="Mark all as complete">Mark all as complete</label>

            <ul class="todo-list">
                <li class="todo" v-for="todo in listTodos()" :class="{ completed: todo.completed }">
                    <div class="view">
                        <input class="toggle" type="checkbox" :checked="todo.completed" @change="changeTodoStatus(todo.id)">
                        <label @dblclick="editTodo.title = todo.title; editTodo.priority = todo.priority; showTodoInput = todo.id">
                            {{ todo.title }}
                            <small class="completed-date">{{ todo.completed_at }}</small>
                            <small class="priority-color" :style='{"background-color": todo.color}'></small>
                        </label>
                        <button class="destroy" @click="destroyTodo(todo.id)"></button>
                    </div>

                    <div class="editing-section" v-if="showTodoInput == todo.id">
                        <input autocomplete type="text"
                                v-model="editTodo.title" @keyup.enter="updateTodo(todo.id)"
                                @keyup.esc="showTodoInput = editTodo.title = editTodo.priority = validation = ''">

                                <select v-model="editTodo.priority" >
                                    <option value="0" :selected="editTodo.priority == 0" style="color: gray;"> Low </option>
                                    <option value="1" :selected="editTodo.priority == 1" style="color: green;"> Normal </option>
                                    <option value="2" :selected="editTodo.priority == 2" style="color: yellow;"> High </option>
                                    <option value="3" :selected="editTodo.priority == 3" style="color: red;"> Urgent </option>
                                </select>
                        <small class="note"> Press <b>ESC</b> to cancel editing </small>
                    </div>
                </li>

                <li class="todo completed no-todos" v-if="listTodos().length == 0">
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
import useTodos from '../../composables/todos';

export default {
    setup() {
        const filterCompletedValue = ref( null );
        const { validation, newTodo, editTodo, showTodoInput, notCompletedCount, completeAll, todos, filterTodos, getTodos, storeTodo, updateTodo, destroyTodo, changeTodoStatus, changeAllTodosStatus, destroyCompletedTodos } = useTodos();
        onMounted(() => getTodos());

        // watch(filterCompletedValue, function(current, prev) {
        //     if (filterCompletedValue == null) return todos;
        //     list_todos.value = todos.value.filter(todo => todo.completed == current);
        //     console.log(list_todos.value);
        // });

        return { filterCompletedValue, validation, newTodo, showTodoInput, editTodo, notCompletedCount, completeAll, todos, filterTodos, storeTodo, updateTodo, destroyTodo, changeTodoStatus, changeAllTodosStatus, destroyCompletedTodos };
    },

    methods: {
        listTodos() {
            if (this.filterCompletedValue == null) return this.todos;
            return this.todos.filter(todo => todo.completed == this.filterCompletedValue);
        }
    },
}
</script>
