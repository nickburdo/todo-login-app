<script setup lang="ts">
import {useAuth} from "../composables/authContext.ts";
import {onMounted} from "vue";
import {useRouter} from "vue-router";

const {currentUser} = useAuth();
const router = useRouter();

onMounted(() => {
  if (!currentUser.value) {
    router.push('/')
  }
})
</script>

<template>
  <h1>TODOS</h1>
  <pre>{{JSON.stringify(currentUser, null, 2)}}</pre>
</template>

<style scoped>

</style>