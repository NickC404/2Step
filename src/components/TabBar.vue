<template>
  <div
    class="flex px-3 pb-2 gap-0.5"
    role="tablist"
    aria-label="Extension sections"
    @keydown="handleKeydown"
  >
    <button
      v-for="tab in tabs"
      :key="tab.id"
      role="tab"
      :aria-selected="modelValue === tab.id"
      :aria-controls="`tabpanel-${tab.id}`"
      :id="`tab-${tab.id}`"
      :tabindex="modelValue === tab.id ? 0 : -1"
      @click="$emit('update:modelValue', tab.id)"
      :class="[
        'relative flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-semibold transition-all duration-200 cursor-pointer uppercase tracking-tight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
        modelValue === tab.id
          ? 'bg-white/15 text-white font-bold'
          : 'text-white/80 hover:bg-white/10 hover:text-white'
      ]"
    >
      {{ tab.label }}

      <!-- Active underline indicator -->
      <span
        v-if="modelValue === tab.id"
        class="absolute bottom-0 left-2 right-2 h-0.5 bg-current rounded-full"
        aria-hidden="true"
      ></span>
    </button>
  </div>
</template>

<script setup>
import { nextTick } from 'vue';

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

// Select a tab and move keyboard focus to it, so focus follows selection.
const selectTab = (id) => {
  emit('update:modelValue', id);
  nextTick(() => document.getElementById(`tab-${id}`)?.focus());
};

const handleKeydown = (e) => {
  const tabIds = props.tabs.map(t => t.id);
  const currentIndex = tabIds.indexOf(props.modelValue);

  if (e.key === 'ArrowRight') {
    e.preventDefault();
    selectTab(tabIds[(currentIndex + 1) % tabIds.length]);
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    selectTab(tabIds[(currentIndex - 1 + tabIds.length) % tabIds.length]);
  } else if (e.key === 'Home') {
    e.preventDefault();
    selectTab(tabIds[0]);
  } else if (e.key === 'End') {
    e.preventDefault();
    selectTab(tabIds[tabIds.length - 1]);
  }
};
</script>
