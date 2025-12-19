<template>
  <div class="flex px-3 space-x-1 pb-2">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      @click="$emit('update:modelValue', tab.id)"
      :class="[
        'flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold transition-all duration-200 cursor-pointer relative uppercase tracking-tight',
        modelValue === tab.id
          ? 'bg-white text-blue-600 shadow-sm'
          : 'text-blue-100 hover:bg-white/10 hover:text-white'
      ]"
    >
      {{ tab.label }}
      
    </button>
  </div>
</template>

<script setup>
defineProps({
  tabs: {
    type: Array,
    required: true,
    // Expects objects with { id, label, icon }
  },
  modelValue: {
    type: String,
    required: true
  },
  has2FA: {
    type: Boolean,
    default: null
  }
});

defineEmits(['update:modelValue']);
</script>
