<script setup lang="ts">
const { isFavorite } = defineProps<{ isFavorite: boolean }>();

const emit = defineEmits<{
  (e: 'toggleFavorite'): void
}>()

function onToggleFavorite() {
  emit('toggleFavorite')
}
</script>

<template>
  <button
    class="shrink-0 w-10 h-10 flex items-center justify-center"
    @click="onToggleFavorite"
  >
    <svg
      v-if="isFavorite"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="text-yellow-500"
    >
      <path
        d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.47L12 17.27l-5.8 3.1 1.1-6.47-4.69-4.58 6.48-.94L12 2.5z"
      />
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.47L12 17.27l-5.8 3.1 1.1-6.47-4.69-4.58 6.48-.94L12 2.5z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>
