<template>
  <div class="h-full bg-gray-50 flex flex-col">

    <!-- Header -->
    <header class="bg-linear-to-br from-header-from via-header-via to-header-to text-white shadow-md z-10">
      <div class="flex items-center justify-between px-4 py-3">
        <!-- Logo + title -->
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white/90 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/>
          </svg>
          <h1 class="text-base font-bold tracking-tight">2Step</h1>
        </div>

        <!-- Current site status chip (always visible) -->
        <div
          v-if="!currentSite.loading && currentSite.domain"
          class="flex items-center gap-1.5 bg-white/15 rounded-lg px-2.5 py-1 max-w-[160px]"
          :aria-label="`Current site: ${currentSite.domain}, ${currentSite.has2FA ? '2FA supported' : currentSite.listed ? '2FA not supported' : 'not in the 2FA Directory'}`"
        >
          <span
            :class="['w-1.5 h-1.5 rounded-full shrink-0', currentSite.has2FA ? 'bg-emerald-400' : currentSite.listed ? 'bg-amber-400' : 'bg-white/60']"
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
    <main class="grow overflow-y-auto p-4">

      <!-- Directory Tab -->
      <div
        id="tabpanel-allSites"
        role="tabpanel"
        aria-labelledby="tab-allSites"
        tabindex="0"
        v-show="currentTab === 'allSites'"
        class="space-y-4 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      >
        <!-- Site detail view -->
        <div v-if="selectedDirectorySite" class="space-y-4">
          <button
            type="button"
            ref="backButton"
            @click="goBackToList"
            class="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-link transition-colors group mb-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded-md"
          >
            <span class="w-8 h-8 rounded-md bg-surface shadow-sm border border-gray-100 flex items-center justify-center group-hover:border-blue-200 group-hover:shadow-md transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            </span>
            Back to list
          </button>

          <SiteDetails :site="selectedDirectorySite" />
        </div>

        <!-- Search + directory list -->
        <div v-else class="bg-surface rounded-xl shadow-sm border border-gray-100">
          <div class="p-6 pb-4">
            <div class="text-center mb-5">
              <div class="w-12 h-12 bg-blue-50 text-link rounded-full flex items-center justify-center mx-auto mb-3" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </div>
              <h2 class="text-sm font-bold text-gray-900">Directory Search</h2>
            </div>
            <search>
              <Input
                ref="searchInputRef"
                id="directory-search"
                type="search"
                v-model="settings.search"
                :label="`Search ${Object.keys(sitesData).length.toLocaleString()} sites in the 2FA Directory`"
                placeholder="Search domains (e.g. google.com)..."
                autocorrect="off"
                autocapitalize="off"
                spellcheck="false"
                enterkeyhint="search"
              />
            </search>
            <!-- Screen-reader-only announcement of search results -->
            <p class="sr-only" role="status" aria-live="polite">{{ searchStatus }}</p>
          </div>

          <!-- Results with count -->
          <div v-if="settings.search && filteredSites.length" class="pb-4">
            <p class="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-6 mb-2">
              {{ filteredCount }} result{{ filteredCount !== 1 ? 's' : '' }} for "{{ settings.search }}"<span v-if="filteredCount > filteredSites.length"> · showing first {{ filteredSites.length }}</span>
            </p>
            <ul id="directory-results" class="space-y-1 max-h-[300px] overflow-y-auto px-3 py-1 custom-scrollbar">
              <li v-for="site in filteredSites" :key="site.domain">
              <button
                type="button"
                @click="selectedDirectorySite = getSiteData(site.domain)"
                class="w-full text-left flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/20 transition-all cursor-pointer group shadow-sm hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                <span class="flex items-center gap-3">
                  <span :class="[
                    'w-8 h-8 rounded-xl flex items-center justify-center transition-colors shadow-sm shrink-0',
                    site.has2FA ? 'bg-emerald-100 text-emerald-500' : 'bg-gray-100 text-gray-400'
                  ]" aria-hidden="true">
                    <svg v-if="site.has2FA" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                  </span>
                  <span class="block">
                    <span class="block text-[14px] font-semibold text-gray-900 tracking-tight">{{ site.domain }}</span>
                    <span v-if="site.has2FA" class="flex gap-1 mt-1 flex-wrap">
                      <MethodBadge v-for="m in site.methods.slice(0, 2)" :key="m" :method="m" />
                      <span v-if="site.methods.length > 2" class="text-[10px] px-2 py-0.5 bg-gray-50 border border-gray-100 text-gray-500 rounded-lg font-bold">
                        +{{ site.methods.length - 2 }}
                      </span>
                    </span>
                    <span v-else class="block text-[10px] text-gray-500 mt-0.5">No 2FA</span>
                  </span>
                </span>
                <span class="opacity-0 group-hover:opacity-100 p-2 text-link hover:bg-surface rounded-xl transition-all shadow-sm hover:shadow-blue-100 shrink-0" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </button>
              </li>
            </ul>
          </div>

          <!-- No results -->
          <div v-else-if="settings.search && !filteredSites.length" class="text-center py-8 px-6">
            <p class="text-sm text-gray-500">No sites found matching "{{ settings.search }}"</p>
            <p class="text-xs text-gray-500 mt-1">Try a domain like "google.com"</p>
          </div>

          <!-- Empty state: popular sites -->
          <div v-else class="px-6 pb-6">
            <p class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Popular sites</p>
            <ul class="grid grid-cols-2 gap-2">
              <li v-for="popular in popularSites" :key="popular.domain">
              <button
                type="button"
                @click="selectedDirectorySite = getSiteData(popular.domain)"
                class="w-full flex items-center gap-2 p-2.5 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all text-left group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                <span class="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 shrink-0 group-hover:bg-blue-100 group-hover:text-link transition-colors" aria-hidden="true">
                  {{ popular.label.charAt(0) }}
                </span>
                <span class="text-xs font-semibold text-gray-700 group-hover:text-link transition-colors">{{ popular.label }}</span>
              </button>
              </li>
            </ul>
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
        class="space-y-4 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      >
        <div v-if="currentSite.loading" class="flex flex-col items-center justify-center p-12 space-y-4">
          <div class="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" role="status" aria-label="Checking site security"></div>
          <p class="text-sm text-gray-500 font-medium">Checking security...</p>
        </div>

        <!-- Pages that can't be checked (chrome://, new tab, local files, etc.) -->
        <div v-else-if="currentSite.unknown" class="bg-surface rounded-xl shadow-sm border border-gray-100 px-6 py-8 text-center">
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
        class="space-y-4 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
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
                'px-3 py-1.5 rounded-full text-[11px] font-bold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
                selectedFaqCategory === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-surface border border-gray-200 text-gray-500 hover:border-blue-200 hover:text-link'
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
                'px-3 py-1.5 rounded-full text-[11px] font-bold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
                selectedFaqCategory === catId
                  ? 'bg-blue-600 text-white'
                  : 'bg-surface border border-gray-200 text-gray-500 hover:border-blue-200 hover:text-link'
              ]"
              :aria-pressed="selectedFaqCategory === catId"
            >
              {{ cat.name }}
            </button>
          </div>

          <!-- FAQ Accordion -->
          <ul class="space-y-2">
            <li
              v-for="faq in filteredFaqsByCategory"
              :key="faq.id"
              class="bg-surface rounded-xl border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <details class="group">
                <summary class="flex items-center justify-between p-4 cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-500">
                  <span class="text-[14px] font-semibold text-gray-800 group-hover:text-link transition-colors leading-snug pr-4">
                    {{ faq.question }}
                  </span>
                  <span class="w-6 h-6 rounded-lg flex items-center justify-center transition-all shrink-0 bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-link group-open:bg-blue-50 group-open:text-link group-open:rotate-180" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </span>
                </summary>
                <div class="px-4 pb-4">
                  <div class="h-px bg-gray-50 mb-3"></div>
                  <p class="text-sm text-gray-500 leading-relaxed">{{ faq.answer }}</p>
                </div>
              </details>
            </li>
          </ul>
        </div>
      </div>

      <!-- Tips Tab -->
      <div
        id="tabpanel-tips"
        role="tabpanel"
        aria-labelledby="tab-tips"
        tabindex="0"
        v-show="currentTab === 'tips'"
        class="space-y-4 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      >
        <!-- Header + Progress -->
        <div class="bg-surface rounded-xl p-5 border border-gray-100">
          <h2 class="text-sm font-bold text-gray-900 mb-1">Security Tips</h2>
          <p class="text-xs text-gray-500 mb-4">Quick wins to level up your digital security.</p>

          <div class="flex items-center justify-between text-[11px] font-bold mb-2">
            <span class="text-gray-500">Progress</span>
            <span :class="tipsProgress.done === tipsProgress.total && tipsProgress.total > 0 ? 'text-emerald-600' : 'text-link'">
              {{ tipsProgress.done }} / {{ tipsProgress.total }} done
            </span>
          </div>
          <progress
            :class="['tips-progress', { 'is-complete': tipsProgress.done === tipsProgress.total && tipsProgress.total > 0 }]"
            :value="tipsProgress.done"
            :max="tipsProgress.total"
            :aria-label="`${tipsProgress.done} of ${tipsProgress.total} tips completed`"
          ></progress>
        </div>

        <!-- Tip cards -->
        <ul class="space-y-2">
          <li
            v-for="tip in orderedTips"
            :key="tip.id"
            :class="[
              'bg-surface p-4 rounded-xl border transition-all group',
              isTipDone(tip.id) ? 'border-emerald-100 opacity-70' : 'border-gray-100 hover:border-emerald-100 shadow-sm'
            ]"
          >
            <div class="flex gap-3 items-start">
              <!-- Priority dot -->
              <div :class="[
                'w-2 h-2 rounded-full mt-1.5 shrink-0',
                tip.priority === 'high' ? 'bg-red-300' : tip.priority === 'medium' ? 'bg-amber-200' : 'bg-emerald-200'
              ]" :data-priority="tip.priority" aria-hidden="true"></div>

              <div class="grow">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <span :class="[
                      'text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md inline-block mb-1',
                      tip.priority === 'high' ? 'bg-red-100 text-red-700' : tip.priority === 'medium' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-700'
                    ]">
                      {{ tip.priority }}
                    </span>
                    <label :for="`tip-${tip.id}`" :class="['block text-[13px] font-semibold leading-snug cursor-pointer', isTipDone(tip.id) ? 'text-gray-500 line-through' : 'text-gray-800']">
                      {{ tip.text }}
                    </label>
                  </div>

                  <input
                    type="checkbox"
                    :id="`tip-${tip.id}`"
                    :checked="isTipDone(tip.id)"
                    @change="toggleTip(tip.id)"
                    class="w-5 h-5 mt-0.5 shrink-0 cursor-pointer accent-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                  />
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </main>

    <footer class="px-4 py-4 text-center text-[10px] text-gray-500 bg-gray-50/80 backdrop-blur-sm border-t border-gray-100/50">
      <p class="pb-1.5 font-medium">Made with ❤️ by <a class="text-link hover:text-link underline transition-colors" href="https://nickcotterill.co.uk" @click.prevent="openExternal('https://nickcotterill.co.uk')" target="_blank" rel="noopener noreferrer">Nick Cotterill</a></p>
      <p>Data sourced from <a class="text-link hover:text-link underline transition-colors" href="https://2fa.directory/gb/" @click.prevent="openExternal('https://2fa.directory/gb/')" target="_blank" rel="noopener noreferrer">2FA Directory</a> by <a class="text-link hover:text-link underline transition-colors" href="https://2factorauth-org.pages.dev/" @click.prevent="openExternal('https://2factorauth-org.pages.dev/')" target="_blank" rel="noopener noreferrer">2factorauth</a></p>
    </footer>
  </div>
</template>

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

  // Tips the user has ticked off. They are saved through the wrapper page,
  // because the sandboxed UI has no storage of its own.
  const doneTipIds = ref([]);

  // Ticks made before the saved list arrives are replayed on top of it, so
  // the stored list doesn't overwrite them.
  let tipsLoaded = false;
  const pendingTipToggles = [];

  const isTipDone = (id) => doneTipIds.value.includes(id);

  const flipTip = (id) => {
    const idx = doneTipIds.value.indexOf(id);
    if (idx >= 0) {
      doneTipIds.value.splice(idx, 1);
    } else {
      doneTipIds.value.push(id);
    }
  };

  const saveTips = () => {
    window.parent.postMessage({ type: 'SAVE_TIPS', ids: [...doneTipIds.value] }, '*');
  };

  const toggleTip = (id) => {
    flipTip(id);
    if (!tipsLoaded) pendingTipToggles.push(id);
    saveTips();
  };

  const applySavedTips = (ids) => {
    tipsLoaded = true;
    doneTipIds.value = Array.isArray(ids) ? ids.filter(id => typeof id === 'string') : [];
    if (pendingTipToggles.length) {
      pendingTipToggles.splice(0).forEach(flipTip);
      saveTips();
    }
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
    // Directory data is third-party: only ever link to https pages.
    const documentation = /^https:\/\//i.test(siteData?.documentation || '') ? siteData.documentation : '';
    const has2FA = !!(siteData && (siteData.methods?.length || documentation));

    return {
      domain: cleanDomain,
      has2FA,
      listed: !!siteData,
      methods: siteData?.methods || [],
      documentation,
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
    // Opened on its own (not inside the popup wrapper) there is no page to ask
    // for the active tab, so nothing can be checked.
    if (window.parent === window) {
      setUncheckable();
      return;
    }

    // The sandbox has an opaque origin, but its URL still carries this
    // extension's own origin (chrome-extension://<id>).
    const extensionOrigin = new URL(window.location.href).origin;

    window.addEventListener('message', (event) => {
      // Only accept messages from our own wrapper page: this extension's origin,
      // sent by the parent window.
      if (event.origin !== extensionOrigin || event.source !== window.parent) {
        return;
      }
      if (!event.data || typeof event.data !== 'object') {
        return;
      }

      if (event.data.type === 'TAB_URL') {
        try {
          const url = new URL(event.data.url);
          if (url.protocol === 'http:' || url.protocol === 'https:') {
            checkSite(url.hostname);
          } else {
            // chrome:// pages, the new-tab page, local files
            setUncheckable();
          }
        } catch (e) {
          setUncheckable();
        }
      }

      if (event.data.type === 'TIPS_DATA') {
        applySavedTips(event.data.ids);
      }
    });

    // Use '*' as target — parent is always the extension popup page.
    window.parent.postMessage({ type: 'GET_TAB_URL' }, '*');
    window.parent.postMessage({ type: 'GET_TIPS' }, '*');

    // The wrapper always answers, but if its reply never arrives (it failed to
    // load, or the reply was dropped) don't leave the spinner up for good.
    // A reply that turns up later still replaces this.
    setTimeout(() => {
      if (currentSite.value.loading) setUncheckable();
    }, 1500);
  });
</script>
