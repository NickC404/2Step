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
        'relative flex items-center gap-1.5 px-3 py-1 rounded-md text-[12px] font-bold transition-all duration-200 cursor-pointer uppercase tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1 focus-visible:ring-offset-blue-600',
        modelValue === tab.id
          ? 'bg-white/15 text-white'
          : 'text-blue-100 hover:bg-white/10 hover:text-white'
      ]"
    >
      <!-- 2FA status dot on Current tab -->
      <span
        v-if="tab.id === 'currentSite' && has2FA !== null"
        :class="[
          'w-1.5 h-1.5 rounded-full flex-shrink-0',
          has2FA ? 'bg-emerald-400' : 'bg-amber-400'
        ]"
        :aria-label="has2FA ? '2FA supported' : '2FA not supported'"
        aria-hidden="true"
      ></span>

      {{ tab.label }}

      <!-- Active underline indicator -->
      <span
        v-if="modelValue === tab.id"
        class="absolute bottom-0 left-2 right-2 h-0.5 bg-white rounded-full"
        aria-hidden="true"
      ></span>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  tabs: {
    type: Array,
    required: true,
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

const emit = defineEmits(['update:modelValue']);

const handleKeydown = (e) => {
  const tabIds = props.tabs.map(t => t.id);
  const currentIndex = tabIds.indexOf(props.modelValue);

  if (e.key === 'ArrowRight') {
    e.preventDefault();
    const nextIndex = (currentIndex + 1) % tabIds.length;
    emit('update:modelValue', tabIds[nextIndex]);
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    const prevIndex = (currentIndex - 1 + tabIds.length) % tabIds.length;
    emit('update:modelValue', tabIds[prevIndex]);
  } else if (e.key === 'Home') {
    e.preventDefault();
    emit('update:modelValue', tabIds[0]);
  } else if (e.key === 'End') {
    e.preventDefault();
    emit('update:modelValue', tabIds[tabIds.length - 1]);
  }
};
</script>
