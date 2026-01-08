console.log('Wrapper loaded in privileged context');
const extensionOrigin = new URL(chrome.runtime.getURL('')).origin;
const sandboxFrame = document.getElementById('sandbox-frame');
// Pass extension origin to sandbox via URL parameter
sandboxFrame.src = `ui.html?origin=${encodeURIComponent(extensionOrigin)}`;
const sandbox = sandboxFrame.contentWindow;

// This script allows communication between the sandboxed UI and the background script
window.addEventListener('message', async (event) => {
    // Sandboxed iframes in Chrome extensions have an origin of 'null'
    if (event.origin !== 'null') {
        return;
    }

    if (event.data.type === 'GET_TAB_URL') {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            sandbox.postMessage({ type: 'TAB_URL', url: tab.url }, '*');
        } catch (e) {
            console.error('Error fetching tab URL:', e);
        }
    }
});
