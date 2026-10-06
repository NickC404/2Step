<template>
  <div class="h-full bg-gray-50 flex flex-col">

    <!-- Header -->
    <header class="bg-gradient-to-br from-blue-800 via-blue-700 to-blue-600 text-white shadow-md z-10">
      <div class="flex items-center justify-between px-4 py-3">
        <!-- Logo + title -->
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white/90 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/>
          </svg>
          <h1 class="text-base font-bold tracking-tight">2Step</h1>
        </div>

        <!-- Current site status chip (always visible) -->
        <div
          v-if="!currentSite.loading && currentSite.domain"
          class="flex items-center gap-1.5 bg-white/15 rounded-lg px-2.5 py-1 max-w-[160px]"
          :aria-label="`Current site: ${currentSite.domain}, 2FA ${currentSite.has2FA ? 'supported' : 'not supported'}`"
        >
          <span
            :class="['w-1.5 h-1.5 rounded-full flex-shrink-0', currentSite.has2FA ? 'bg-emerald-400' : 'bg-amber-400']"
            aria-hidden="true"
          ></span>
          <span class="text-xs font-medium text-white truncate">{{ currentSite.domain }}</span>
        </div>
        <div v-else-if="currentSite.loading" class="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" aria-label="Loading current site" role="status"></div>
      </div>

      <TabBar
        :tabs="tabs"
        v-model="currentTab"
      />
    </header>

    <!-- Main Content -->
    <main class="flex-grow overflow-y-auto p-4">

      <!-- Directory Tab -->
      <div
        id="tabpanel-allSites"
        role="tabpanel"
        aria-labelledby="tab-allSites"
        tabindex="0"
        v-show="currentTab === 'allSites'"
        class="space-y-4 focus:outline-none"
      >
        <!-- Site detail view -->
        <div v-if="selectedDirectorySite" class="space-y-4">
          <button
            ref="backButton"
            @click="goBackToList"
            class="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-blue-600 transition-colors group mb-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 rounded-md"
          >
            <div class="w-8 h-8 rounded-md bg-white shadow-sm border border-gray-100 flex items-center justify-center group-hover:border-blue-200 group-hover:shadow-md transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            </div>
            Back to list
          </button>

          <SiteDetails :site="selectedDirectorySite" />
        </div>

        <!-- Search + directory list -->
        <div v-else class="bg-white rounded-xl shadow-sm border border-gray-100">
          <div class="p-6 pb-4">
            <div class="text-center mb-5">
              <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </div>
              <h2 class="text-sm font-bold text-gray-900">Directory Search</h2>
              <p class="text-xs text-gray-500 mt-1">Search {{ Object.keys(sitesData).length.toLocaleString() }} sites in the 2FA Directory.</p>
            </div>
            <Input ref="searchInputRef" v-model="settings.search" placeholder="Search domains (e.g. google.com)..." aria-label="Search sites" />
            <!-- Screen-reader-only announcement of search results -->
            <p class="sr-only" role="status" aria-live="polite">{{ searchStatus }}</p>
          </div>

          <!-- Results with count -->
          <div v-if="settings.search && filteredSites.length" class="pb-4">
            <p class="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-6 mb-2">
              {{ filteredCount }} result{{ filteredCount !== 1 ? 's' : '' }} for "{{ settings.search }}"<span v-if="filteredCount > filteredSites.length"> · showing first {{ filteredSites.length }}</span>
            </p>
            <div class="space-y-1 max-h-[300px] overflow-y-auto px-3 custom-scrollbar">
              <div
                v-for="site in filteredSites"
                :key="site.domain"
                @click="selectedDirectorySite = getSiteData(site.domain)"
                @keydown.enter="selectedDirectorySite = getSiteData(site.domain)"
                @keydown.space.prevent="selectedDirectorySite = getSiteData(site.domain)"
                role="button"
                tabindex="0"
                :aria-label="`${site.domain}, 2FA ${site.has2FA ? 'supported' : 'not supported'}`"
                class="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/20 transition-all cursor-pointer group shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1"
              >
                <div class="flex items-center gap-3">
                  <div :class="[
                    'w-8 h-8 rounded-xl flex items-center justify-center transition-colors shadow-sm flex-shrink-0',
                    site.has2FA ? 'bg-emerald-100 text-emerald-500' : 'bg-gray-100 text-gray-400'
                  ]" aria-hidden="true">
                    <svg v-if="site.has2FA" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                  </div>
                  <div>
                    <div class="text-[14px] font-semibold text-gray-900 tracking-tight">{{ site.domain }}</div>
                    <div v-if="site.has2FA" class="flex gap-1 mt-1 flex-wrap">
                      <MethodBadge
                        v-for="m in site.methods.slice(0, 2)"
                        :key="m"
                        :method="m"
                        compact
                        presentational
                        side="bottom"
                      />
                      <span v-if="site.methods.length > 2" class="text-[10px] px-2 py-0.5 bg-gray-50 border border-gray-100 text-gray-500 rounded-lg font-bold">
                        +{{ site.methods.length - 2 }}
                      </span>
                    </div>
                    <div v-else class="text-[10px] text-gray-500 mt-0.5">No 2FA</div>
                  </div>
                </div>
                <div class="opacity-0 group-hover:opacity-100 p-2 text-blue-600 hover:bg-white rounded-xl transition-all shadow-sm hover:shadow-blue-100 flex-shrink-0" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </div>
            </div>
          </div>

          <!-- No results -->
          <div v-else-if="settings.search && !filteredSites.length" class="text-center py-8 px-6">
            <p class="text-sm text-gray-500">No sites found matching "{{ settings.search }}"</p>
            <p class="text-xs text-gray-500 mt-1">Try a domain like "google.com"</p>
          </div>

          <!-- Empty state: popular sites -->
          <div v-else class="px-6 pb-6">
            <p class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Popular sites</p>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="popular in popularSites"
                :key="popular.domain"
                @click="selectedDirectorySite = getSiteData(popular.domain)"
                class="flex items-center gap-2 p-2.5 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1"
              >
                <div class="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 flex-shrink-0 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                  {{ popular.label.charAt(0) }}
                </div>
                <span class="text-xs font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">{{ popular.label }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Current Site Tab -->
      <div
        id="tabpanel-currentSite"
        role="tabpanel"
        aria-labelledby="tab-currentSite"
        tabindex="0"
        v-show="currentTab === 'currentSite'"
        class="space-y-4 focus:outline-none"
      >
        <div v-if="currentSite.loading" class="flex flex-col items-center justify-center p-12 space-y-4">
          <div class="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" role="status" aria-label="Checking site security"></div>
          <p class="text-sm text-gray-500 font-medium">Checking security...</p>
        </div>

        <!-- Pages that can't be checked (chrome://, new tab, local files, etc.) -->
        <div v-else-if="currentSite.unknown" class="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-8 text-center">
          <div class="w-12 h-12 bg-gray-100 text-gray-500 rounded-full flex items-center justify-center mx-auto mb-3" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          </div>
          <h2 class="text-sm font-bold text-gray-900">This page can't be checked</h2>
          <p class="text-xs text-gray-500 mt-1 leading-relaxed">2Step works on regular websites. Open a site, then reopen 2Step to see its 2FA options — or use the <span class="font-semibold text-gray-700">Directory</span> tab above to look one up.</p>
        </div>

        <SiteDetails v-else :site="currentSite" />
      </div>

      <!-- FAQ Tab -->
      <div
        id="tabpanel-faqs"
        role="tabpanel"
        aria-labelledby="tab-faqs"
        tabindex="0"
        v-show="currentTab === 'faqs'"
        class="space-y-4 focus:outline-none"
      >
        <div v-if="faqs.loading" class="flex flex-col items-center justify-center p-12 space-y-4">
          <div class="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" role="status" aria-label="Loading FAQs"></div>
          <p class="text-sm text-gray-500 font-medium">Loading FAQs...</p>
        </div>

        <div v-else class="space-y-5">
          <h2 class="sr-only">Frequently asked questions</h2>
          <!-- Category pill filters -->
          <div class="flex gap-2 flex-wrap" role="group" aria-label="Filter FAQs by category">
            <button
              @click="selectedFaqCategory = null"
              :class="[
                'px-3 py-1.5 rounded-full text-[11px] font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1',
                selectedFaqCategory === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-500 hover:border-blue-200 hover:text-blue-600'
              ]"
              :aria-pressed="selectedFaqCategory === null"
            >
              All
            </button>
            <button
              v-for="(cat, catId) in faqs.categories"
              :key="catId"
              @click="selectedFaqCategory = catId"
              :class="[
                'px-3 py-1.5 rounded-full text-[11px] font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1',
                selectedFaqCategory === catId
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-500 hover:border-blue-200 hover:text-blue-600'
              ]"
              :aria-pressed="selectedFaqCategory === catId"
            >
              {{ cat.name }}
            </button>
          </div>

          <!-- FAQ Accordion -->
          <div class="space-y-2">
            <div
              v-for="faq in filteredFaqsByCategory"
              :key="faq.id"
              class="bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <button
                :id="`faq-btn-${faq.id}`"
                @click="toggleAccordion(faq.id)"
                :aria-expanded="itemsOpen[faq.id] || false"
                :aria-controls="`faq-panel-${faq.id}`"
                class="w-full flex items-center justify-between p-4 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
              >
                <span class="text-[14px] font-semibold text-gray-800 group-hover:text-blue-600 transition-colors leading-snug pr-4">
                  {{ faq.question }}
                </span>
                <div :class="[
                  'w-6 h-6 rounded-lg flex items-center justify-center transition-all flex-shrink-0',
                  itemsOpen[faq.id] ? 'bg-blue-50 text-blue-600 rotate-180' : 'bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500'
                ]" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </button>

              <div
                :id="`faq-panel-${faq.id}`"
                role="region"
                :aria-labelledby="`faq-btn-${faq.id}`"
                v-show="itemsOpen[faq.id]"
                class="px-4 pb-4"
              >
                <div class="h-px bg-gray-50 mb-3"></div>
                <p class="text-sm text-gray-500 leading-relaxed">{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tips Tab -->
      <div
        id="tabpanel-tips"
        role="tabpanel"
        aria-labelledby="tab-tips"
        tabindex="0"
        v-show="currentTab === 'tips'"
        class="space-y-4 focus:outline-none"
      >
        <!-- Header + Progress -->
        <div class="bg-white rounded-xl p-5 border border-gray-100">
          <h2 class="text-sm font-bold text-gray-900 mb-1">Security Tips</h2>
          <p class="text-xs text-gray-500 mb-4">Quick wins to level up your digital security.</p>

          <div class="flex items-center justify-between text-[11px] font-bold mb-2">
            <span class="text-gray-500">Progress</span>
            <span :class="tipsProgress.done === tipsProgress.total && tipsProgress.total > 0 ? 'text-emerald-600' : 'text-blue-600'">
              {{ tipsProgress.done }} / {{ tipsProgress.total }} done
            </span>
          </div>
          <div class="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden" role="progressbar" :aria-valuenow="tipsProgress.done" :aria-valuemin="0" :aria-valuemax="tipsProgress.total" :aria-label="`${tipsProgress.done} of ${tipsProgress.total} tips completed`">
            <div
              :class="['h-full rounded-full transition-all duration-500', tipsProgress.done === tipsProgress.total && tipsProgress.total > 0 ? 'bg-emerald-500' : 'bg-blue-500']"
              :style="{ width: tipsProgress.pct + '%' }"
            ></div>
          </div>
        </div>

        <!-- Tip cards -->
        <div class="space-y-2">
          <div
            v-for="tip in orderedTips"
            :key="tip.id"
            :class="[
              'bg-white p-4 rounded-xl border transition-all group',
              isTipDone(tip.id) ? 'border-emerald-100 opacity-70' : 'border-gray-100 hover:border-emerald-100 shadow-sm'
            ]"
          >
            <div class="flex gap-3 items-start">
              <!-- Priority dot -->
              <div :class="[
                'w-2 h-2 rounded-full mt-1.5 flex-shrink-0',
                tip.priority === 'high' ? 'bg-red-300' : tip.priority === 'medium' ? 'bg-amber-200' : 'bg-emerald-200'
              ]" :aria-label="`${tip.priority} priority`"></div>

              <div class="flex-grow">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <span :class="[
                      'text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md inline-block mb-1',
                      tip.priority === 'high' ? 'bg-red-100 text-red-700' : tip.priority === 'medium' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-700'
                    ]">
                      {{ tip.priority }}
                    </span>
                    <p :class="['text-[13px] font-semibold leading-snug', isTipDone(tip.id) ? 'text-gray-500 line-through' : 'text-gray-800']">
                      {{ tip.text }}
                    </p>
                  </div>

                  <!-- Done toggle -->
                  <button
                    type="button"
                    class="flex-shrink-0 p-1.5 -m-1.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-1 rounded-lg"
                    :aria-label="isTipDone(tip.id) ? `Mark '${tip.text}' as not done` : `Mark '${tip.text}' as done`"
                    :aria-pressed="isTipDone(tip.id)"
                    @click="toggleTip(tip.id)"
                  >
                    <div :class="[
                      'w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all',
                      isTipDone(tip.id)
                        ? 'bg-emerald-500 border-emerald-500'
                        : 'border-gray-200 hover:border-emerald-400'
                    ]">
                      <svg v-if="isTipDone(tip.id)" xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="px-4 py-4 text-center text-[10px] text-gray-500 bg-gray-50/80 backdrop-blur-sm border-t border-gray-100/50">
      <p class="pb-1.5 font-medium">Made with ❤️ by <a class="text-blue-600 hover:text-blue-700 transition-colors" href="https://nickcotterill.co.uk" @click.prevent="openExternal('https://nickcotterill.co.uk')" target="_blank" rel="noopener noreferrer">Nick Cotterill</a></p>
      <p>Data sourced from <a class="text-blue-600 hover:text-blue-700 transition-colors" href="https://2fa.directory/gb/" @click.prevent="openExternal('https://2fa.directory/gb/')" target="_blank" rel="noopener noreferrer">2FA Directory</a> by <a class="text-blue-600 hover:text-blue-700 transition-colors" href="https://2factorauth-org.pages.dev/" @click.prevent="openExternal('https://2factorauth-org.pages.dev/')" target="_blank" rel="noopener noreferrer">2factorauth</a></p>
    </footer>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}
</style>

<script setup>
  import { ref, onMounted, computed, nextTick } from 'vue';
  import Input from './components/Input.vue';
  import TabBar from './components/TabBar.vue';
  import SiteDetails from './components/SiteDetails.vue';
  import MethodBadge from './components/MethodBadge.vue';
  import sitesData from '../2fa.directory/sites.json';
  import faqData from '../faq/tips-faq.json';

  const tabs = [
    { id: 'currentSite', label: 'Current' },
    { id: 'allSites', label: 'Directory' },
    { id: 'faqs', label: 'FAQ' },
    { id: 'tips', label: 'Tips' },
  ];

  const currentTab = ref('currentSite');
  const settings = ref({ search: '' });
  const selectedDirectorySite = ref(null);
  const searchInputRef = ref(null);
  const backButton = ref(null);

  const currentSite = ref({
    domain: '',
    has2FA: false,
    methods: [],
    documentation: '',
    loading: true,
    unknown: false
  });

  const faqs = ref({
    loading: false,
    ...faqData
  });

  const selectedFaqCategory = ref(null);
  const itemsOpen = ref({});

  const toggleAccordion = (id) => {
    itemsOpen.value[id] = !itemsOpen.value[id];
  };

  // Popular sites for directory empty state
  const popularSites = [
    { domain: 'gmail.com',   label: 'Gmail' },
    { domain: 'github.com',  label: 'GitHub' },
    { domain: 'amazon.com',  label: 'Amazon' },
    { domain: 'paypal.com',  label: 'PayPal' },
    { domain: 'twitter.com', label: 'Twitter' },
    { domain: 'outlook.com', label: 'Outlook' },
  ];

  // FAQ filtering
  const filteredFaqsByCategory = computed(() => {
    if (!selectedFaqCategory.value) return faqs.value.faqs;
    return faqs.value.faqs.filter(f => f.category === selectedFaqCategory.value);
  });

  // Tips persistence — routed through the wrapper (non-sandboxed) via postMessage,
  // because ui.html runs in a sandboxed context where localStorage is blocked.
  const doneTipIds = ref([]);

  const isTipDone = (id) => doneTipIds.value.includes(id);

  const toggleTip = (id) => {
    const idx = doneTipIds.value.indexOf(id);
    if (idx >= 0) {
      doneTipIds.value.splice(idx, 1);
    } else {
      doneTipIds.value.push(id);
    }
    window.parent.postMessage({ type: 'SAVE_TIPS', ids: [...doneTipIds.value] }, '*');
  };

  const orderedTips = computed(() => {
    const priorityMap = { 'high': 1, 'medium': 2, 'low': 3 };
    return [...faqs.value.tips].sort((a, b) => {
      return (priorityMap[a.priority] || 99) - (priorityMap[b.priority] || 99);
    });
  });

  const tipsProgress = computed(() => {
    const total = orderedTips.value.length;
    const done = orderedTips.value.filter(t => isTipDone(t.id)).length;
    return { done, total, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
  });

  // Directory helpers
  const MAX_RESULTS = 50;

  // All domains matching the query (used for an accurate total count).
  const matchedDomains = computed(() => {
    const query = settings.value.search.toLowerCase().trim();
    if (!query) return [];
    return Object.entries(sitesData).filter(([domain]) => domain.includes(query));
  });

  const filteredCount = computed(() => matchedDomains.value.length);

  // The capped slice that actually gets rendered.
  const filteredSites = computed(() =>
    matchedDomains.value.slice(0, MAX_RESULTS).map(([domain, data]) => ({
      domain,
      has2FA: !!(data.methods?.length || data.documentation),
      methods: data.methods || []
    }))
  );

  // Announced to screen readers when the search results change (WCAG 4.1.3).
  const searchStatus = computed(() => {
    const query = settings.value.search.trim();
    if (!query) return '';
    const total = filteredCount.value;
    if (total === 0) return `No sites found matching ${query}`;
    const shown = filteredSites.value.length;
    const base = `${total} result${total !== 1 ? 's' : ''} for ${query}`;
    return total > shown ? `${base}, showing the first ${shown}` : base;
  });

  const getSiteData = (domain) => {
    const cleanDomain = domain.toLowerCase().replace(/^www\./, '');
    const parts = cleanDomain.split('.');
    let siteData = null;
    let matchedDomain = cleanDomain;
    for (let i = 0; i < parts.length - 1; i++) {
      const candidate = parts.slice(i).join('.');
      if (sitesData[candidate]) {
        siteData = sitesData[candidate];
        matchedDomain = candidate;
        break;
      }
    }
    const has2FA = !!(siteData && (siteData.methods?.length || siteData.documentation));

    return {
      domain: cleanDomain,
      has2FA,
      methods: siteData?.methods || [],
      documentation: siteData?.documentation || '',
      loading: false,
      unknown: false
    };
  };

  // Used when the active tab isn't a checkable website
  // (chrome:// pages, the new-tab page, local files, or an unreadable URL).
  const setUncheckable = () => {
    currentSite.value = {
      domain: '',
      has2FA: false,
      methods: [],
      documentation: '',
      loading: false,
      unknown: true
    };
  };

  const goBackToList = () => {
    selectedDirectorySite.value = null;
    nextTick(() => {
      const input = searchInputRef.value?.$el?.querySelector('input');
      input?.focus();
    });
  };

  const checkSite = (domain) => {
    currentSite.value = getSiteData(domain);
  };

  // Open external links via the wrapper — the sandboxed iframe can't do it itself.
  const openExternal = (url) => {
    window.parent.postMessage({ type: 'OPEN_URL', url }, '*');
  };

  onMounted(() => {
    window.addEventListener('message', (event) => {
      // Only accept messages from extension pages (chrome-extension:// origin).
      // ancestorOrigins is unreliable in Chrome's sandbox context, so we check the prefix.
      if (!event.origin.startsWith('chrome-extension://')) {
        return;
      }

      if (event.data.type === 'TAB_URL') {
        try {
          const url = new URL(event.data.url);
          if (url.protocol === 'http:' || url.protocol === 'https:') {
            checkSite(url.hostname);
          } else {
            setUncheckable();
          }
        } catch (e) {
          setUncheckable();
        }
      }

      if (event.data.type === 'TIPS_DATA') {
        doneTipIds.value = Array.isArray(event.data.ids) ? event.data.ids : [];
      }
    });

    // Use '*' as target — parent is always the extension popup page.
    window.parent.postMessage({ type: 'GET_TAB_URL' }, '*');
    window.parent.postMessage({ type: 'GET_TIPS' }, '*');

    setTimeout(() => {
      if (currentSite.value.loading) {
        // No response in time — we can't determine the page, so show the
        // "can't be checked" state rather than a misleading "not supported".
        setUncheckable();
      }
    }, 500);
  });
</script>
