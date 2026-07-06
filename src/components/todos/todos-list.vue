<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import type {Todo} from "../../types/todo.ts";
import {getTodos} from "../../api/jsonPlaceholderApi.ts";
import TodoItem from "./todo-item.vue";
import Filters from "./filters.vue";
import {getFavoriteTodoIds, toggleFavorite} from "../../utils/localStorage.ts";
import CreateTodo from "./create-todo.vue";
import {useAuth} from "../../composables/authContext.ts";

const todos = ref<Todo[]>([]);
const isLoading = ref(false);
const error = ref('');
const search = ref('');
const statusFilter = ref<'all' | 'completed' | 'uncompleted' | 'favorites'>('all');
const authorFilter = ref('all');
const favoriteIds = ref<number[]>([]);
const {currentUser} = useAuth();

const userIds = computed(() => {
  return [...new Set(todos.value.map(todo => todo.userId.toString()))]
})

const filteredTodos = computed(() => {
  return todos.value.filter(todo => {
    const matchesStatus =
        statusFilter.value === 'all' ||
        (statusFilter.value === 'completed' && todo.completed) ||
        (statusFilter.value === 'uncompleted' && !todo.completed) ||
        (statusFilter.value === 'favorites' && favoriteIds.value.includes(todo.id))

    const matchesUser =
        authorFilter.value === 'all' || todo.userId.toString() === authorFilter.value

    const matchesSearch = todo.title
        .toLowerCase()
        .includes(search.value.toLowerCase().trim())

    return matchesStatus && matchesUser && matchesSearch
  })
});

function onToggleFavorite(id: number) {
  toggleFavorite(id);
  favoriteIds.value = getFavoriteTodoIds();
}

function onCreateTodo(title: string) {
  const maxId = Math.max(0, ...todos.value.map(todo => todo.id))
  const newId = maxId + 1
  todos.value.unshift({id: newId, title, completed: false, userId: currentUser.value?.id || 0})
}

onMounted(async () => {
  isLoading.value = true;
  try {
    todos.value = await getTodos();
  } catch (e) {
    error.value = 'Failed to fetch todos';
  } finally {
    isLoading.value = false;
  }
  favoriteIds.value = getFavoriteTodoIds();
})
</script>

<template>
  <div class="mt-6">
    <div v-if="isLoading" class="p-4 text-center">Loading...</div>
    <div v-else-if="error" class="p-4 text-center text-red-500">{{ error }}</div>
    <div v-else-if="todos.length === 0" class="p-4 text-center">No todos found</div>
    <div v-else class="flex flex-col gap-3">
      <CreateTodo @createTodo="onCreateTodo" />
      <Filters
        :user-ids="userIds"
        v-model:search="search"
        v-model:status="statusFilter"
        v-model:author="authorFilter"
      />
      <TodoItem
          v-for="todo in filteredTodos"
          :todo="todo"
          :favoriteIds="favoriteIds"
          @toggle-favorite="onToggleFavorite"
      />
    </div>
  </div>
</template>
