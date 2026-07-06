<script setup lang="ts">
import Input from "../UI/input.vue";

const {userIds} = defineProps<{userIds: string[]}>()
const search = defineModel<string>('search', { required: true })
const status = defineModel<string>('status', { required: true })
const author = defineModel<string>('author', { required: true })
</script>

<template>
<div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
  <Input placeholder="Search" id="search" v-model="search" />
  <select class="bg-white rounded-[5px] w-full outline-0 p-3" id="status" v-model="status">
    <option value="all">All statuses</option>
    <option value="completed">Completed</option>
    <option value="uncompleted">Uncompleted</option>
    <option value="favorites">Favorite</option>
  </select>
  <select class="bg-white rounded-[5px] w-full outline-0 p-3" id="author" v-model="author">
    <option value="all">All authors</option>
    <option v-for="userId in userIds" :key="userId" :value="userId">Author {{userId}}</option>
  </select>
</div>
</template>
