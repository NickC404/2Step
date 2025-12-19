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
            class="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors group mb-2"
          >
            <div class="w-8 h-8 rounded-lg bg-white shadow-sm border border-gray-100 flex items-center justify-center group-hover:border-blue-200 group-hover:shadow-md transition-all">
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
  import Button from './components/Button.vue';
  import Input from './components/Input.vue';
  import TabBar from './components/TabBar.vue';
  import SiteDetails from './components/SiteDetails.vue';
  import sitesData from '../2fa.directory/sites.json';

  const tabs = [
    { id: 'currentSite', label: 'Current Site' },
    { id: 'allSites', label: 'Directory' }
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

  const filteredSites = computed(() => {
    const query = settings.value.search.toLowerCase();
    if (!query) return [];
    
    return Object.entries(sitesData)
      .filter(([domain]) => domain.includes(query))
      .slice(0, 50)
      .map(([domain, data]) => ({
        domain,
        has2FA: Object.keys(data).length > 0,
        methods: data.methods || []
      }));
  });

  const getSiteData = (domain) => {
    // Normalize domain
    const cleanDomain = domain.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
    const siteData = sitesData[cleanDomain];
    
    if (siteData) {
      return {
        domain: cleanDomain,
        has2FA: true,
        methods: siteData.methods || [],
        documentation: siteData.documentation || '',
        loading: false
      };
    } else {
      return {
        domain: cleanDomain,
        has2FA: false,
        methods: [],
        loading: false
      };
    }
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
