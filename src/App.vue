<template>
  <div class="h-full bg-gray-50 flex flex-col">
    <!-- Header -->
    <header class="bg-blue-600 text-white shadow-md z-10">
      <div class="flex items-center justify-between px-4 py-3">
        <h1 class="text-lg font-bold">2Step - 2FA Checker</h1>
      </div>
      
      <TabBar 
        :tabs="tabs" 
        v-model="currentTab" 
        :has2FA="currentSite.loading ? null : currentSite.has2FA"
      />
    </header>

    <!-- Main Content -->
    <main class="flex-grow overflow-y-auto p-4">
      <div v-show="currentTab === 'allSites'" class="space-y-4">
        <div v-if="selectedDirectorySite" class="space-y-4">
          <button 
            @click="selectedDirectorySite = null"
            class="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-blue-600 transition-colors group mb-2"
          >
            <div class="w-8 h-8 rounded-md bg-white shadow-sm border border-gray-100 flex items-center justify-center group-hover:border-blue-200 group-hover:shadow-md transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            </div>
            Back to list
          </button>
          
          <SiteDetails :site="selectedDirectorySite" />
        </div>

        <div v-else class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
           <div class="text-center mb-6">
             <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
               <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
             </div>
             <h3 class="text-sm font-bold text-gray-900">Directory Search</h3>
             <p class="text-xs text-gray-500 mt-1 mb-4">Search through {{ Object.keys(sitesData).length }} sites in our database.</p>
             <Input v-model="settings.search" placeholder="Search domains (e.g. google.com)..." />
           </div>

            <div v-if="filteredSites.length" class="space-y-3 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
              <div v-for="site in filteredSites" :key="site.domain" 
                   @click="selectedDirectorySite = getSiteData(site.domain)"
                   class="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/20 transition-all cursor-pointer group shadow-sm hover:shadow-md">
                <div class="flex items-center gap-4">
                  <div :class="[
                    'w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-sm',
                    site.has2FA ? 'bg-emerald-100/50 text-emerald-600' : 'bg-gray-100 text-gray-400'
                  ]">
                    <svg v-if="site.has2FA" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                  </div>
                  <div>
                    <div class="text-[15px] font-extrabold text-gray-900 tracking-tight">{{ site.domain }}</div>
                    <div v-if="site.has2FA" class="flex gap-1.5 mt-1">
                      <span v-for="m in site.methods.slice(0, 2)" :key="m" class="text-[10px] px-2 py-0.5 bg-emerald-50 border border-emerald-100/50 text-emerald-700 rounded-lg font-bold uppercase tracking-tight">
                        {{ m }}
                      </span>
                      <span v-if="site.methods.length > 2" class="text-[10px] px-2 py-0.5 bg-gray-50 border border-gray-100 text-gray-500 rounded-lg font-bold">
                        +{{ site.methods.length - 2 }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="opacity-0 group-hover:opacity-100 p-2.5 text-blue-600 hover:bg-white rounded-xl transition-all shadow-sm hover:shadow-blue-100">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </div>
            </div>
           
           <div v-else-if="settings.search" class="text-center py-8">
             <p class="text-sm text-gray-400">No sites found matching "{{ settings.search }}"</p>
           </div>
        </div>
      </div>

      <div v-show="currentTab === 'currentSite'" class="space-y-4">
        <div v-if="currentSite.loading" class="flex flex-col items-center justify-center p-12 space-y-4">
          <div class="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p class="text-sm text-gray-500 font-medium">Checking security...</p>
        </div>
        
        <SiteDetails v-else :site="currentSite" />
      </div>
      <div v-show="currentTab === 'faqs'" class="space-y-6">
        <div v-if="faqs.loading" class="flex flex-col items-center justify-center p-12 space-y-4">
          <div class="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p class="text-sm text-gray-500 font-medium">Loading FAQs...</p>
        </div>

        <div v-else class="space-y-8">
          <!-- Intro -->
          <div class="bg-white rounded-xl p-6 border border-gray-100 text-center mb-2">
            <h3 class="text-sm font-bold text-gray-900">How can we help?</h3>
            <p class="text-xs text-gray-500 mt-1">Common questions and simple answers.</p>
          </div>

          <!-- FAQ Groups -->
          <div v-for="(cat, catId) in faqs.categories" :key="catId" class="space-y-3">
            <div class="flex items-center gap-2 px-1">
              <span class="text-lg">{{ cat.icon }}</span>
              <h4 class="text-xs font-bold text-gray-400 uppercase tracking-widest">{{ cat.name }}</h4>
            </div>

            <div class="space-y-2">
              <div 
                v-for="faq in faqs.faqs.filter(f => f.category === catId)" 
                :key="faq.id"
                class="bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md"
              >
                <button 
                  @click="toggleAccordion(faq.id)"
                  class="w-full flex items-center justify-between p-4 text-left group"
                >
                  <span class="text-[14px] font-bold text-gray-800 group-hover:text-blue-600 transition-colors leading-snug pr-4">
                    {{ faq.question }}
                  </span>
                  <div :class="[
                    'w-6 h-6 rounded-lg flex items-center justify-center transition-all flex-shrink-0',
                    itemsOpen[faq.id] ? 'bg-blue-50 text-blue-600 rotate-180' : 'bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500'
                  ]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </button>
                
                <div 
                  v-show="itemsOpen[faq.id]" 
                  class="px-4 pb-4 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  <div class="h-px bg-gray-50 mb-3"></div>
                  <p class="text-sm text-gray-600 leading-relaxed font-semibold">
                    {{ faq.answer }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tips Tab -->
      <div v-show="currentTab === 'tips'" class="space-y-4">
        <div class="bg-white rounded-xl p-6 border border-gray-100 text-center mb-2">
          <h3 class="text-sm font-bold text-gray-900">Security Tips</h3>
          <p class="text-xs text-gray-500 mt-1">Quick wins to level up your digital security.</p>
        </div>

        <div class="grid gap-3">
          <div v-for="tip in orderedTips" :key="tip.id" 
               class="bg-white p-4 rounded-xl border border-gray-100 hover:border-emerald-100 transition-all group shadow-sm">
            <div class="flex gap-4">
              <div :class="[
                'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors',
                tip.priority === 'high' ? 'bg-orange-50 text-orange-600' : 'bg-emerald-50 text-emerald-600'
              ]">
                <svg v-if="tip.priority === 'high'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              </div>
              <div class="flex-grow">
                <div class="flex items-center justify-between mb-1">
                  <span :class="[
                    'text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md',
                    tip.priority === 'high' ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'
                  ]">
                    {{ tip.priority }} priority
                  </span>
                </div>
                <p class="text-[13px] text-gray-800 font-bold leading-snug group-hover:text-gray-900 transition-colors">
                  {{ tip.text }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer class="px-4 py-4 text-center text-[10px] text-gray-400 bg-gray-50/80 backdrop-blur-sm border-t border-gray-100/50">
      <p class="pb-1.5 font-medium">Made with ❤️ by <a class="text-blue-500 hover:text-blue-600 transition-colors" href="https://nickcotterill.co.uk" target="_blank">Nick Cotterill</a></p>
      <p>Data sourced from <a class="text-blue-500 hover:text-blue-600 transition-colors" href="https://2fa.directory/gb/" target="_blank">2FA Directory</a> by <a class="text-blue-500 hover:text-blue-600 transition-colors" href="https://2factorauth-org.pages.dev/" target="_blank">2factorauth</a></p>
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
  import { ref, onMounted, computed } from 'vue';
  import Input from './components/Input.vue';
  import TabBar from './components/TabBar.vue';
  import SiteDetails from './components/SiteDetails.vue';
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

  const currentSite = ref({
    domain: '',
    has2FA: false,
    methods: [],
    documentation: '',
    loading: true
  });

  const faqs = ref({ 
    loading: false,
    ...faqData
  });

  const selectedCategory = ref('basics');
  const itemsOpen = ref({});

  const toggleAccordion = (id) => {
    itemsOpen.value[id] = !itemsOpen.value[id];
  };

  const orderedTips = computed(() => {
    const priorityMap = { 'high': 1, 'medium': 2, 'low': 3 };
    return [...faqs.value.tips].sort((a, b) => {
      return (priorityMap[a.priority] || 99) - (priorityMap[b.priority] || 99);
    });
  });

  const filteredFaqs = computed(() => {
    if (!selectedCategory.value) return faqs.value.faqs;
    return faqs.value.faqs.filter(f => f.category === selectedCategory.value);
  });

  const filteredSites = computed(() => {
    const query = settings.value.search.toLowerCase();
    if (!query) return [];
    
    return Object.entries(sitesData)
      .filter(([domain]) => domain.includes(query))
      .slice(0, 50)
      .map(([domain, data]) => ({
        domain,
        has2FA: !!(data.methods?.length || data.documentation),
        methods: data.methods || []
      }));
  });

  const getSiteData = (domain) => {
    // Normalize domain
    const cleanDomain = domain.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
    const siteData = sitesData[cleanDomain];
    
    // Check if it really has 2FA info
    const has2FA = !!(siteData && (siteData.methods?.length || siteData.documentation));

    return {
      domain: cleanDomain,
      has2FA,
      methods: siteData?.methods || [],
      documentation: siteData?.documentation || '',
      loading: false
    };
  };

  const checkSite = (domain) => {
    currentSite.value = getSiteData(domain);
  };

  onMounted(() => {
    // Listen for messages from the wrapper script
    window.addEventListener('message', (event) => {
      if (event.data.type === 'TAB_URL') {
        try {
          const url = new URL(event.data.url);
          checkSite(url.hostname);
        } catch (e) {
          currentSite.value.loading = false;
        }
      }
    });

    // Request the current tab URL from the wrapper
    window.parent.postMessage({ type: 'GET_TAB_URL' }, '*');

    // Fallback if no message arrives in 500ms (likely dev environment)
    setTimeout(() => {
      if (currentSite.value.loading) {
        checkSite('github.com'); // Default for dev
      }
    }, 500);
  });
</script>
