const sandboxFrame = document.getElementById('sandbox-frame');
sandboxFrame.src = 'ui.html';
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
