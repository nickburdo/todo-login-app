<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const model = defineModel<string>()

defineProps<{
  label?: string
  error?: string
}>()
</script>

<template>
  <div>
    <label v-if="label">{{ label }}</label>

    <input
        v-model="model"
        v-bind="$attrs"
        :class="['bg-white rounded-[5px] p-3 w-full outline-0', error && 'border border-red-600']"
    />

    <p class="text-red-600" v-if="error">{{ error }}</p>
  </div>
</template>