<script setup lang="ts">
import type {User} from "../../types/user.ts";

const { user } = defineProps<{ user: User }>();
const defClass = 'font-semibold'
</script>

<template>
  <div v-if="user" class="grid grid-cols-1 sm:grid-cols-[max-content_1fr] md:grid-cols-[max-content_1fr_max-content_1fr] gap-4 bg-white rounded-[5px] p-4">
    <div :class="defClass">Name</div>
    <div>{{user.name ?? 'N/A'}}</div>
     <div :class="defClass">Username</div>
    <div>{{user.username ?? 'N/A'}}</div>
     <div :class="defClass">Email</div>
    <div>{{user.email ?? 'N/A'}}</div>
     <div :class="defClass">Phone number</div>
    <div>{{user.phone ?? 'N/A'}}</div>
     <div :class="defClass">Website</div>
    <div>{{user.website ?? 'N/A'}}</div>
     <div :class="defClass">Company name</div>
    <div>{{user.company?.name ?? 'N/A'}}</div>
     <div :class="defClass">City</div>
    <div>{{user.address?.city ?? 'N/A'}}</div>
  </div>
  <div v-else class="bg-white rounded-[5px] p-4 text-center">No data</div>
</template>

<style scoped>

</style>