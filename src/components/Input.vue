<template>
  <div class="space-y-1">
    <label v-if="label" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
      v-bind="$attrs"
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  label: String
});

defineEmits(['update:modelValue']);
</script>
