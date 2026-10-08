<template>
  <span class="inline-block border rounded-lg font-bold uppercase tracking-tight px-1.5 py-0.5 text-[10px] bg-emerald-50 border-emerald-100/50 text-emerald-700">
    {{ method.toUpperCase() }}
  </span>
</template>

<script setup>
defineProps({
  method: {
    type: String,
    required: true
  }
});
</script>
