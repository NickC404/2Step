<template>
  <div class="bg-surface rounded-xl shadow-sm border border-gray-100 overflow-hidden">

    <!-- Status Banner -->
    <div :class="['px-6 py-4 flex items-center gap-3', status.banner]">
      <div
        :class="['w-8 h-8 rounded-full flex items-center justify-center shrink-0', status.icon]"
        aria-hidden="true"
      >
        <svg v-if="site.has2FA" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/>
        </svg>
        <svg v-else-if="site.listed" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      </div>
      <div>
        <p :class="['font-bold text-sm', status.title]" role="status" aria-live="polite">
          {{ status.heading }}
        </p>
        <p :class="['text-xs mt-0.5', status.text]">{{ status.message }}</p>
      </div>
    </div>

    <!-- Site Identity -->
    <div class="px-6 py-4 flex items-center gap-3 border-b border-gray-100">
      <div
        :class="['w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 select-none', status.avatar]"
        aria-hidden="true"
      >
        {{ domainInitial }}
      </div>
      <div>
        <h2 class="text-base font-bold text-gray-900 tracking-tight">{{ site.domain }}</h2>
        <p class="text-xs text-gray-500 mt-0.5">{{ status.summary }}</p>
      </div>
    </div>

    <!-- Methods (if 2FA supported) -->
    <div v-if="site.has2FA && site.methods && site.methods.length" class="px-6 py-4 border-b border-gray-100">
      <h3 class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Authentication Methods</h3>
      <ul class="space-y-2">
        <li
          v-for="method in rankedMethods"
          :key="method.id"
          class="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
        >
          <div
            :class="['w-8 h-8 rounded-lg flex items-center justify-center shrink-0', method.colorClass]"
            aria-hidden="true"
          >
            <component :is="method.icon" class="w-4 h-4" />
          </div>
          <div class="grow min-w-0">
            <div class="flex items-center justify-between gap-2 flex-wrap">
              <span class="text-[13px] font-semibold text-gray-800">{{ method.label }}</span>
              <span :class="['text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full shrink-0', method.strengthBadgeClass]">
                {{ method.strength }}
              </span>
            </div>
            <p class="text-[11px] text-gray-500 mt-0.5 leading-snug">{{ method.description }}</p>
          </div>
        </li>
      </ul>

      <div v-if="site.documentation" class="mt-4">
        <a
          :href="site.documentation"
          @click.prevent="openUrl(site.documentation)"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`Open 2FA setup guide for ${site.domain} (opens in new tab)`"
          class="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Open Setup Guide
        </a>
      </div>
    </div>

    <!-- No 2FA: Actionable advice -->
    <div v-if="!site.has2FA" class="px-6 py-4">
      <h3 class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">What you can do</h3>
      <div class="space-y-2">
        <div class="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
          <div class="w-8 h-8 rounded-lg bg-blue-50 text-link flex items-center justify-center shrink-0" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <div>
            <p class="text-[13px] font-bold text-gray-800">Use a strong, unique password</p>
            <p class="text-[11px] text-gray-500 mt-0.5 leading-snug">
              {{ site.listed
                ? "Since 2FA isn't available, a unique password is your best defence. Consider a password manager."
                : "Look for 2FA in the site's security settings. Either way, a unique password from a password manager is your best defence." }}
            </p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed, h } from 'vue';
import { getMethod } from '../methodConfig.js';

const props = defineProps({
  site: {
    type: Object,
    required: true
  }
});

// The sandboxed iframe can't open tabs itself, so ask the wrapper to.
const openUrl = (url) => {
  if (url) window.parent.postMessage({ type: 'OPEN_URL', url }, '*');
};

// Three states: supported, listed without 2FA, and not in the directory at all.
// A site missing from the directory may still offer 2FA, so it's shown in
// neutral grey rather than as unsupported.
const status = computed(() => {
  const count = props.site.methods?.length || 0;
  if (props.site.has2FA) {
    return {
      banner: 'bg-emerald-100',
      icon: 'bg-emerald-200 text-emerald-600',
      title: 'text-emerald-800',
      text: 'text-emerald-700',
      avatar: 'bg-emerald-100 text-emerald-700',
      heading: '2FA Supported',
      message: 'This site can be secured with two-factor authentication.',
      summary: `${count} authentication method${count !== 1 ? 's' : ''} available`
    };
  }
  if (props.site.listed) {
    return {
      banner: 'bg-amber-100',
      icon: 'bg-amber-200 text-amber-600',
      title: 'text-amber-800',
      text: 'text-amber-700',
      avatar: 'bg-amber-100 text-amber-800',
      heading: '2FA Not Supported',
      message: 'This site does not currently support 2FA.',
      summary: 'No 2FA methods available'
    };
  }
  return {
    banner: 'bg-gray-100',
    icon: 'bg-gray-200 text-gray-600',
    title: 'text-gray-800',
    text: 'text-gray-700',
    avatar: 'bg-gray-100 text-gray-700',
    heading: 'Not in the 2FA Directory',
    message: "2Step has no record for this site, so it can't say whether 2FA is offered.",
    summary: 'No directory entry'
  };
});

const domainInitial = computed(() => {
  return (props.site.domain || '?').charAt(0).toUpperCase();
});

// SVG icon components keyed by method strength group
const IconHardwareKey = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4' }),
  ]);

const IconPhone = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('rect', { x: '5', y: '2', width: '14', height: '20', rx: '2', ry: '2' }),
    h('line', { x1: '12', y1: '18', x2: '12.01', y2: '18' }),
  ]);

const IconClock = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('circle', { cx: '12', cy: '12', r: '10' }),
    h('polyline', { points: '12 6 12 12 16 14' }),
  ]);

const IconMail = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' }),
    h('polyline', { points: '22,6 12,13 2,6' }),
  ]);

const IconVoice = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' }),
  ]);

const IconLock = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('rect', { x: '3', y: '11', width: '18', height: '11', rx: '2', ry: '2' }),
    h('path', { d: 'M7 11V7a5 5 0 0 1 10 0v4' }),
  ]);

const IconMessage = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' }),
  ]);

// Map method IDs to SVG icon components (mirrors methodConfig.js).
// Unknown IDs fall back to IconLock below.
const methodIcons = {
  u2f:               IconHardwareKey,
  'custom-hardware': IconHardwareKey,
  totp:              IconClock,
  'custom-software': IconPhone,
  email:             IconMail,
  call:              IconVoice,
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
