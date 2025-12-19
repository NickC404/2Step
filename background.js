let sitesData = null;

async function loadSitesData() {
    if (sitesData) return sitesData;
    try {
        // Fetch the sites.json from the extension's folder
        const url = chrome.runtime.getURL('2fa.directory/sites.json');
        const response = await fetch(url);
        sitesData = await response.json();
        return sitesData;
    } catch (e) {
        console.error('Failed to load sites data:', e);
        return {};
    }
}

function getCleanDomain(url) {
    try {
        const hostname = new URL(url).hostname.toLowerCase();
        return hostname.replace(/^www\./, '');
    } catch (e) {
        return '';
    }
}

async function createIconImageData(has2FA) {
    const size = 32;
    const canvas = new OffscreenCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Drawing the shield shape
    ctx.clearRect(0, 0, size, size);

    // Gradient for premium look
    const gradient = ctx.createLinearGradient(0, 0, 0, size);
    if (has2FA === true) {
        gradient.addColorStop(0, '#10b981'); // Emerald-500
        gradient.addColorStop(1, '#059669'); // Emerald-600
    } else if (has2FA === false) {
        gradient.addColorStop(0, '#f43f5e'); // Rose-500
        gradient.addColorStop(1, '#e11d48'); // Rose-600
    } else {
        gradient.addColorStop(0, '#94a3b8'); // Slate-400
        gradient.addColorStop(1, '#64748b'); // Slate-500
    }

    ctx.fillStyle = gradient;

    // Shield path
    ctx.beginPath();
    ctx.moveTo(16, 2);
    ctx.lineTo(4, 6);
    ctx.lineTo(4, 16);
    ctx.bezierCurveTo(4, 24, 16, 30, 16, 30);
    ctx.bezierCurveTo(16, 30, 28, 24, 28, 16);
    ctx.lineTo(28, 6);
    ctx.closePath();
    ctx.fill();

    // Symbol (Check or X)
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (has2FA === true) {
        ctx.beginPath();
        ctx.moveTo(11, 16);
        ctx.lineTo(15, 20);
        ctx.lineTo(21, 13);
        ctx.stroke();
    } else if (has2FA === false) {
        ctx.beginPath();
        ctx.moveTo(12, 12);
        ctx.lineTo(20, 20);
        ctx.moveTo(20, 12);
        ctx.lineTo(12, 20);
        ctx.stroke();
    }

    return ctx.getImageData(0, 0, size, size);
}

async function updateAction(tabId, url) {
    if (!url || !url.startsWith('http')) {
        const imageData = await createIconImageData(null);
        chrome.action.setIcon({ tabId, imageData });
        chrome.action.setBadgeText({ tabId, text: '' });
        return;
    }

    const data = await loadSitesData();
    const domain = getCleanDomain(url);

    let has2FA = false;
    const parts = domain.split('.');
    for (let i = 0; i < parts.length - 1; i++) {
        const checkDomain = parts.slice(i).join('.');
        if (data[checkDomain]) {
            has2FA = true;
            break;
        }
    }

    const imageData = await createIconImageData(has2FA);
    chrome.action.setIcon({ tabId, imageData });

    // Clear badge as we are now using the icon itself
    chrome.action.setBadgeText({ tabId, text: '' });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        updateAction(tabId, tab.url);
    }
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    try {
        const tab = await chrome.tabs.get(activeInfo.tabId);
        if (tab.url) {
            updateAction(activeInfo.tabId, tab.url);
        }
    } catch (e) {
        // Tab might be closed
    }
});
