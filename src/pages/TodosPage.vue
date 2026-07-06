<script setup lang="ts">
import {useAuth} from "../composables/authContext.ts";
import {onMounted} from "vue";
import {useRouter} from "vue-router";
import UserCard from "../components/todos/user-card.vue";
import TodosList from "../components/todos/todos-list.vue";

const {currentUser} = useAuth();
const router = useRouter();

onMounted(() => {
  if (!currentUser.value) {
    router.push('/')
  }
})
</script>

<template>
  <header class="bg-(--bg-header) p-3.75">
    <div class="max-w-5xl mx-auto p-4">
      <h1 class="font-normal text-[17px] leading-5.25">Todos List</h1>
    </div>
  </header>
  <main class="max-w-5xl mx-auto p-4">
    <UserCard v-if="currentUser" :user="currentUser" />
    <TodosList />
  </main>
</template>
