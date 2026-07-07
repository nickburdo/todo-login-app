<script setup lang="ts">
import Input from "../UI/input.vue";
import Button from "../UI/button.vue";
import {ref} from "vue";
import type {Todo} from "../../types/todo.ts";
import {createTodo} from "../../api/jsonPlaceholderApi.ts";
import {useAuth} from "../../composables/authContext.ts";

const title = ref('');
const error = ref('');
const isSubmitting = ref(false);
const {currentUser} = useAuth();

const emit = defineEmits<{
  (e: 'created', todo: Todo): void
}>();

function validateTitle() {
  if (!title.value.trim()) {
    error.value = 'Title is required';
  } else if (title.value.length > 255) {
    error.value = 'Title must be less than 255 characters';
  } else {
    error.value = '';
  }
}

async function onAddTodo() {
  if (isSubmitting.value) return;
  validateTitle();
  if (error.value) return;

  isSubmitting.value = true;
  try {
    const todo = await createTodo({ userId: currentUser.value?.id || 0, title: title.value });
    title.value = '';
    emit('created', todo);
  } catch (e) {
    console.error('Error:', e);
    error.value = 'Failed to create todo';
  } finally {
    isSubmitting.value = false;
  }
}

</script>

<template>
  <div class="flex items-start gap-4">
    <Input
      placeholder="What will you tackle today?"
      id="new-todo"
      class="grow"
      v-model="title"
      @input="validateTitle"
      :error="error"
      :disabled="isSubmitting"
    />
    <Button @click="onAddTodo" :disabled="isSubmitting">Add</Button>
  </div>
</template>
