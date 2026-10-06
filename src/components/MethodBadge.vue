<template>
  <div
    class="relative inline-block"
    :tabindex="presentational ? undefined : 0"
    :aria-describedby="presentational ? undefined : `tooltip-${method}`"
    @mouseenter="tooltipVisible = true"
    @mouseleave="tooltipVisible = false"
    @focus="tooltipVisible = true"
    @blur="tooltipVisible = false"
    @keydown.esc="tooltipVisible = false"
  >
    <div
      :class="[
        'border rounded-lg font-bold uppercase tracking-tight flex items-center gap-1.5 transition-all',
        presentational ? '' : 'cursor-help',
        siteColorClass,
        compact ? 'px-1.5 py-0.5 text-[10px]' : 'px-3 py-1.5 text-xs'
      ]"
    >
      <div v-if="!compact" class="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true"></div>
      {{ method.toUpperCase() }}
    </div>

    <!-- Tooltip -->
    <div
      v-if="!presentational"
      :id="`tooltip-${method}`"
      role="tooltip"
      :class="[
        'absolute left-1/2 -translate-x-1/2 w-48 bg-white text-[10px] rounded-xl pointer-events-none transition-all duration-200 z-50 shadow-2xl border border-gray-100 overflow-hidden',
        tooltipVisible ? 'opacity-100 translate-y-0' : 'opacity-0',
        side === 'bottom' ? 'top-full mt-2 translate-y-1' : 'bottom-full mb-2 -translate-y-1'
      ]"
    >
      <div class="font-bold bg-blue-600 text-white px-3 py-2 flex items-center justify-between">
        <span>{{ method.toUpperCase() }}</span>
        <span class="text-[8px] opacity-70 border border-white/20 px-1 rounded">METHOD</span>
      </div>
      <div class="p-3">
        <p class="leading-relaxed font-semibold text-gray-600">
          {{ description }}
        </p>
      </div>
      <!-- Arrow -->
      <div
        :class="[
          'absolute left-1/2 -translate-x-1/2 border-[6px] border-transparent',
          arrowClass
        ]"
        aria-hidden="true"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { getMethod } from '../methodConfig.js';

const props = defineProps({
  method: {
    type: String,
    required: true
  },
  compact: {
    type: Boolean,
    default: false
  },
  side: {
    type: String,
    default: 'top',
    validator: (v) => ['top', 'bottom'].includes(v)
  },
  // When true, render as a non-interactive label (no tooltip, not focusable).
  // Used inside the directory result rows, which are themselves buttons —
  // a nested focusable/tooltip there would be an invalid interactive nesting.
  presentational: {
    type: Boolean,
    default: false
  }
});

const tooltipVisible = ref(false);

const siteColorClass = computed(() => {
  return props.compact
    ? 'bg-emerald-50 border-emerald-100/50 text-emerald-700 hover:bg-emerald-100'
    : 'bg-gray-50 border-gray-100 text-gray-700 hover:border-blue-200 hover:bg-blue-50/50';
});

const arrowClass = computed(() => {
  if (props.side === 'bottom') {
    // Tooltip is below trigger: arrow at top of tooltip, pointing up
    return '-top-[6px] border-b-blue-600';
  }
  // Tooltip is above trigger: arrow at bottom of tooltip, pointing down
  return '-bottom-[6px] border-t-white';
});

const description = computed(() => getMethod(props.method).description);
</script>
