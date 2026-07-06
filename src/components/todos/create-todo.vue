<script setup lang="ts">
import Input from "../UI/input.vue";
import Button from "../UI/button.vue";
import {ref} from "vue";

const title = ref('');
const error = ref('');

const emit = defineEmits<{
  (e: 'createTodo', title: string): void
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

function onAddTodo() {
  validateTitle();
  if (error.value) return;
  emit('createTodo', title.value);
  title.value = '';
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
    />
    <Button @click="onAddTodo">Add</Button>
  </div>
</template>
