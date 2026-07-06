<script setup lang="ts">
import type {Todo} from "../../types/todo.ts";
import CompletedIcon from "./completed-icon.vue";
import FavoriteButton from "./favorite-button.vue";

const { todo, favoriteIds } = defineProps<{
  todo: Todo,
  favoriteIds: number[],
}>();

const emit = defineEmits<{
  (e: 'toggleFavorite', id: number): void
}>()

function onToggleFavorite() {
  emit('toggleFavorite', todo.id)
}
</script>

<template>
<div class="bg-white rounded-[5px] p-4 flex gap-2">
  <div class="shrink-0">{{todo.id}}.</div>
  <div class="grow">
    <div> {{todo.title}}</div>
    <div class="text-(--text-h) text-sm">Author: {{todo.userId}}</div>
  </div>
  <div class="shrink-0 flex flex-col sm:flex-row gap-2 items-center">
    <CompletedIcon :status="todo.completed" />
    <FavoriteButton :is-favorite="favoriteIds.includes(todo.id)" @toggle-favorite="onToggleFavorite" />
  </div>
</div>
</template>
