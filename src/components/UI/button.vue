<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const { color = 'primary', fullWidth } = defineProps<{
  color?: 'primary' | 'secondary',
  fullWidth?: boolean,
}>()
</script>

<template>
  <button
      v-bind="$attrs"
      :class="[
      'p-3 rounded-[5px] text-white',
      color === 'primary' && 'bg-(--primary)',
      color === 'secondary' && 'bg-(--secondary) ',
      fullWidth && 'w-full',
    ]"
  >
    <slot />
  </button>
</template>