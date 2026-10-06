const sandboxFrame = document.getElementById('sandbox-frame');
sandboxFrame.src = 'ui.html';

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

    if (event.data.type === 'GET_TAB_URL') {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            postToSandbox({ type: 'TAB_URL', url: tab.url });
        } catch (e) {
            console.error('Error fetching tab URL:', e);
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

    if (event.data.type === 'GET_TIPS') {
        try {
            const stored = localStorage.getItem('2step-done-tips');
            const ids = JSON.parse(stored || '[]');
            postToSandbox({ type: 'TIPS_DATA', ids: Array.isArray(ids) ? ids : [] });
        } catch {
            postToSandbox({ type: 'TIPS_DATA', ids: [] });
        }
    }

    if (event.data.type === 'SAVE_TIPS') {
        try {
            const ids = event.data.ids;
            if (Array.isArray(ids) && ids.every(id => typeof id === 'string')) {
                localStorage.setItem('2step-done-tips', JSON.stringify(ids));
            }
        } catch { /* ignore */ }
    }
});
