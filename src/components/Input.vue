<template>
  <div class="space-y-1">
    <label v-if="label" :for="id" class="block text-xs font-medium text-gray-500">{{ label }}</label>
    <input
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="block w-full rounded-md border-gray-300 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blue-500 text-base px-3 py-2 border"
      v-bind="$attrs"
    />
  </div>
</template>

<script setup>
// Attributes (type, placeholder, etc.) belong on the <input>, not the wrapper.
defineOptions({ inheritAttrs: false });

defineProps({
  modelValue: String,
  label: String,
  id: String
});

defineEmits(['update:modelValue']);
</script>
