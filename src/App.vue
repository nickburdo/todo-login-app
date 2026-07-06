<script setup lang="ts">
import {provideAuth} from "./composables/authContext.ts";

provideAuth();
</script>

<template>
  <RouterView />
</template>
