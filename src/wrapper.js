const sandboxFrame = document.getElementById('sandbox-frame');
sandboxFrame.src = 'ui.html';

const TIPS_KEY = 'doneTips';

// Always read contentWindow at send time — the navigation from about:blank to the
// sandboxed ui.html (null origin) creates a new Window object, so a reference
// captured before navigation would be stale.
//
// targetOrigin must be '*': the sandboxed frame has an opaque ("null") origin,
// which cannot be named as a target. Passing the string 'null' makes postMessage
// throw a SyntaxError ("Invalid target origin"), so the message is never delivered.
// '*' still only delivers to this specific contentWindow, so it stays scoped.
const postToSandbox = (message) => {
    sandboxFrame.contentWindow?.postMessage(message, '*');
};

// This script allows communication between the sandboxed UI and the background script
window.addEventListener('message', async (event) => {
    // Sandboxed iframes in Chrome extensions have an origin of 'null'
    if (event.origin !== 'null') {
        return;
    }
    // ...and only from our own sandbox frame, not any other opaque-origin window.
    if (event.source !== sandboxFrame.contentWindow) {
        return;
    }
    if (!event.data || typeof event.data !== 'object') {
        return;
    }

    if (event.data.type === 'GET_TAB_URL') {
        // Always answer, so the app never waits on a reply that isn't coming.
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            postToSandbox({ type: 'TAB_URL', url: tab?.url ?? null });
        } catch (e) {
            console.error('Error fetching tab URL:', e);
            postToSandbox({ type: 'TAB_URL', url: null });
        }
    }

    // Open external links on the app's behalf. The sandboxed iframe can't
    // navigate or open tabs itself, so it asks the wrapper to do it. Only
    // http(s) URLs are honoured, to avoid javascript:/data: and similar.
    if (event.data.type === 'OPEN_URL') {
        const url = event.data.url;
        if (typeof url === 'string' && /^https?:\/\//i.test(url)) {
            chrome.tabs.create({ url });
        }
    }

    // Ticked tips live in extension storage; the sandbox has no storage of its own.
    if (event.data.type === 'GET_TIPS') {
        try {
            const stored = await chrome.storage.local.get(TIPS_KEY);
            const ids = stored[TIPS_KEY];
            postToSandbox({ type: 'TIPS_DATA', ids: Array.isArray(ids) ? ids.filter(id => typeof id === 'string') : [] });
        } catch {
            postToSandbox({ type: 'TIPS_DATA', ids: [] });
        }
    }

    if (event.data.type === 'SAVE_TIPS') {
        const ids = event.data.ids;
        if (Array.isArray(ids) && ids.every(id => typeof id === 'string')) {
            try {
                await chrome.storage.local.set({ [TIPS_KEY]: ids });
            } catch { /* ignore */ }
        }
    }
});
