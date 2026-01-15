<template>
  <div class="relative inline-block group/badge">
    <div
      :class="[
        'px-2 py-1 border rounded-lg font-bold uppercase tracking-tight flex items-center gap-1.5 transition-all cursor-help',
        siteColorClass,
        compact ? 'px-1.5 py-0.5 text-[10px]' : 'px-3 py-1.5 text-xs'
      ]"
    >
      <div v-if="!compact" class="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
      {{ method.toUpperCase() }}
    </div>
    
    <!-- Tooltip -->
    <div :class="[
      'absolute left-1/2 -translate-x-1/2 w-48 bg-white text-[10px] rounded-xl opacity-0 group-hover/badge:opacity-100 pointer-events-none transition-all duration-200 z-50 shadow-2xl border border-gray-100 overflow-hidden',
      tooltipPositionClass
    ]">
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
      <div :class="[
        'absolute left-1/2 -translate-x-1/2 border-[6px] border-transparent',
        arrowClass
      ]"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

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
  }
});

const siteColorClass = computed(() => {
  return props.compact 
    ? 'bg-emerald-50 border-emerald-100/50 text-emerald-700 hover:bg-emerald-100' 
    : 'bg-gray-50 border-gray-100 text-gray-700 hover:border-blue-200 hover:bg-blue-50/50';
});

const tooltipPositionClass = computed(() => {
  if (props.side === 'bottom') {
    return 'top-full mt-2 transform translate-y-1 group-hover/badge:translate-y-0';
  }
  return 'bottom-full mb-2 transform translate-y-1 group-hover/badge:translate-y-0';
});

const arrowClass = computed(() => {
  if (props.side === 'bottom') {
    return 'bottom-full border-b-blue-600';
  }
  return 'top-full border-t-white';
});

const descriptions = {
  totp: 'Time-based One-Time Password. Uses an app like Google Authenticator or Authy to generate unique codes every 30 seconds.',
  u2f: 'Universal 2nd Factor. The most secure method, using physical hardware keys like a Yubikey for hardware-level protection.',
  sms: 'Sends a one-time verification code to your mobile phone via SMS text message.',
  email: 'Sends a one-time verification code to your registered email address.',
  phone: 'Delivers a verification code via an automated voice call to your phone.',
  prop: 'A proprietary method unique to this service, typically a push notification or in-app approval step.',
  'custom-software': 'Uses a custom mobile app developed specifically by this service for secure authentication.',
  'custom-hardware': 'Requires a specific physical hardware device or token provided by the service.',
  hardware: 'Requires a physical security device or token to authenticate.',
  software: 'Uses a software-based authenticator app on your computer or mobile device.',
  push: 'Sends a push notification to your mobile device for quick, one-tap approval.',
  biometric: 'Uses fingerprint, facial recognition, or other biological markers to verify your identity.',
};

const description = computed(() => {
  return descriptions[props.method.toLowerCase()] || 'An additional security method used to verify your identity beyond just a password.';
});
</script>
