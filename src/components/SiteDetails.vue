<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300">
    <div :class="[
      'p-8 flex flex-col items-center text-center space-y-4 transition-colors duration-500',
      site.has2FA ? 'bg-emerald-50/40' : 'bg-rose-50/40'
    ]">
      <div :class="[
        'w-16 h-16 rounded-full flex items-center justify-center shadow-sm transition-all duration-300 transform hover:scale-105',
        site.has2FA ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
      ]">
        <svg v-if="site.has2FA" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
      </div>
      
      <div>
        <h2 class="text-xl font-bold text-gray-900 tracking-tight">{{ site.domain }}</h2>
        <p :class="[
          'text-sm font-semibold mt-1.5 flex items-center justify-center gap-1.5',
          site.has2FA ? 'text-emerald-700' : 'text-rose-700'
        ]">
          <span v-if="site.has2FA">2FA Available</span>
          <span v-else>2FA Not Supported</span>
        </p>
      </div>
    </div>

    <div v-if="site.has2FA && site.methods && site.methods.length" class="p-6 bg-white border-t border-gray-100">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest">Security Methods</h3>
        <span class="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded-full font-bold uppercase tracking-tight">Verified</span>
      </div>
      <div class="flex flex-wrap gap-2">
        <div v-for="method in site.methods" :key="method" 
             class="px-3 py-1.5 bg-gray-50 border border-gray-100 text-gray-700 rounded-lg text-xs font-semibold flex items-center gap-2 hover:border-blue-200 hover:bg-blue-50/50 cursor-default transition-colors">
          <div class="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
          {{ method.toUpperCase() }}
        </div>
      </div>
      
      <div v-if="site.documentation" class="mt-4">
        <a :href="site.documentation" target="_blank" class="flex items-center justify-center gap-1.5 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-all shadow-sm shadow-blue-200 no-underline text-center uppercase tracking-tight">
          <span>Setup Guide</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>
      </div>
    </div>
    
    <div v-if="!site.has2FA" class="p-6 bg-white border-t border-gray-100">
      <p class="text-xs text-gray-500 text-center leading-relaxed">
        This site doesn't seem to support 2FA yet. We recommend using a strong, unique password and a password manager.
      </p>
    </div>

    <div class="py-3 bg-gray-50/80 border-t border-gray-100 text-center">
      <a href="#" class="text-[11px] uppercase tracking-widest font-bold text-gray-400 hover:text-blue-600 transition-colors no-underline inline-flex items-center gap-1.5">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
        Flag incorrect details
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  site: {
    type: Object,
    required: true
  }
});
</script>
