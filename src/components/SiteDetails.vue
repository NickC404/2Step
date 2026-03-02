<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

    <!-- Status Banner -->
    <div
      :class="[
        'px-6 py-4 flex items-center gap-3',
        site.has2FA ? 'bg-emerald-100' : 'bg-amber-100'
      ]"
    >
      <div
        :class="[
          'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
          site.has2FA ? 'bg-emerald-200 text-emerald-600' : 'bg-amber-200 text-amber-600'
        ]"
        aria-hidden="true"
      >
        <svg v-if="site.has2FA" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      </div>
      <div>
        <p
          :class="['font-bold text-sm', site.has2FA ? 'text-emerald-800' : 'text-amber-800']"
          role="status"
          aria-live="polite"
        >
          {{ site.has2FA ? '2FA Supported' : '2FA Not Supported' }}
        </p>
        <p :class="['text-xs mt-0.5', site.has2FA ? 'text-emerald-700' : 'text-amber-700']">
          {{ site.has2FA
            ? 'This site can be secured with two-factor authentication.'
            : 'This site does not currently support 2FA.' }}
        </p>
      </div>
    </div>

    <!-- Site Identity -->
    <div class="px-6 py-4 flex items-center gap-3 border-b border-gray-100">
      <div
        :class="[
          'w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0 select-none',
          site.has2FA ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'
        ]"
        aria-hidden="true"
      >
        {{ domainInitial }}
      </div>
      <div>
        <h2 class="text-base font-bold text-gray-900 tracking-tight">{{ site.domain }}</h2>
        <p class="text-xs text-gray-400 mt-0.5">
          {{ site.has2FA
            ? `${site.methods.length} authentication method${site.methods.length !== 1 ? 's' : ''} available`
            : 'No 2FA methods available' }}
        </p>
      </div>
    </div>

    <!-- Methods (if 2FA supported) -->
    <div v-if="site.has2FA && site.methods && site.methods.length" class="px-6 py-4 border-b border-gray-100">
      <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Authentication Methods</h3>
      <div class="space-y-2">
        <div
          v-for="method in rankedMethods"
          :key="method.id"
          class="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
        >
          <div
            :class="['w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0', method.colorClass]"
            aria-hidden="true"
          >
            <component :is="method.icon" class="w-4 h-4" />
          </div>
          <div class="flex-grow min-w-0">
            <div class="flex items-center justify-between gap-2 flex-wrap">
              <span class="text-[13px] font-bold text-gray-800">{{ method.label }}</span>
              <span :class="['text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full flex-shrink-0', method.strengthBadgeClass]">
                {{ method.strength }}
              </span>
            </div>
            <p class="text-[11px] text-gray-500 mt-0.5 leading-snug">{{ method.description }}</p>
          </div>
        </div>
      </div>

      <div v-if="site.documentation" class="mt-4">
        <a
          :href="site.documentation"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`Open 2FA setup guide for ${site.domain} (opens in new tab)`"
          class="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors no-underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Open Setup Guide
        </a>
      </div>
    </div>

    <!-- No 2FA: Actionable advice -->
    <div v-if="!site.has2FA" class="px-6 py-4">
      <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">What you can do</h3>
      <div class="space-y-2">
        <div class="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
          <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <div>
            <p class="text-[13px] font-bold text-gray-800">Use a strong, unique password</p>
            <p class="text-[11px] text-gray-500 mt-0.5 leading-snug">Since 2FA isn't available, a unique password is your best defence. Consider a password manager.</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed, defineComponent, h } from 'vue';
import { getMethod } from '../methodConfig.js';

const props = defineProps({
  site: {
    type: Object,
    required: true
  }
});

const domainInitial = computed(() => {
  return (props.site.domain || '?').charAt(0).toUpperCase();
});

// SVG icon components keyed by method strength group
const IconHardwareKey = defineComponent({
  render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4' }),
  ])
});

const IconPhone = defineComponent({
  render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('rect', { x: '5', y: '2', width: '14', height: '20', rx: '2', ry: '2' }),
    h('line', { x1: '12', y1: '18', x2: '12.01', y2: '18' }),
  ])
});

const IconClock = defineComponent({
  render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('circle', { cx: '12', cy: '12', r: '10' }),
    h('polyline', { points: '12 6 12 12 16 14' }),
  ])
});

const IconBell = defineComponent({
  render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9' }),
    h('path', { d: 'M13.73 21a2 2 0 0 1-3.46 0' }),
  ])
});

const IconFingerprint = defineComponent({
  render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4' }),
    h('path', { d: 'M5 19.5C5.5 18 6 15 6 12c0-.7.12-1.37.34-2' }),
    h('path', { d: 'M17.29 21.02c.12-.6.43-2.3.5-3.02' }),
    h('path', { d: 'M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4' }),
    h('path', { d: 'M8.65 22c.21-.66.45-1.32.57-2' }),
    h('path', { d: 'M14 13.12c0 2.38 0 6.38-1 8.88' }),
    h('path', { d: 'M2 16h.01' }),
    h('path', { d: 'M21.8 16c.2-2 .131-5.354 0-6' }),
    h('path', { d: 'M9 6.8a6 6 0 0 1 9 5.2c0 .47 0 1.17-.02 2' }),
  ])
});

const IconMail = defineComponent({
  render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' }),
    h('polyline', { points: '22,6 12,13 2,6' }),
  ])
});

const IconVoice = defineComponent({
  render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' }),
  ])
});

const IconLock = defineComponent({
  render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('rect', { x: '3', y: '11', width: '18', height: '11', rx: '2', ry: '2' }),
    h('path', { d: 'M7 11V7a5 5 0 0 1 10 0v4' }),
  ])
});

const IconMessage = defineComponent({
  render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' }),
  ])
});

// Map method IDs to SVG icon components
const methodIcons = {
  hardware:          IconHardwareKey,
  u2f:               IconHardwareKey,
  'custom-hardware': IconHardwareKey,
  totp:              IconClock,
  software:          IconPhone,
  'custom-software': IconPhone,
  push:              IconBell,
  biometric:         IconFingerprint,
  email:             IconMail,
  phone:             IconVoice,
  prop:              IconLock,
  sms:               IconMessage,
};

const rankedMethods = computed(() => {
  return [...props.site.methods]
    .map(m => ({
      id: m,
      ...getMethod(m),
      icon: methodIcons[m.toLowerCase()] ?? IconLock,
    }))
    .sort((a, b) => a.strengthOrder - b.strengthOrder);
});
</script>
