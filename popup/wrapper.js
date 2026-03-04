// src/wrapper.js
var sandboxFrame = document.getElementById("sandbox-frame");
sandboxFrame.src = "ui.html";
var sandbox = sandboxFrame.contentWindow;
window.addEventListener("message", async (event) => {
  if (event.origin !== "null") {
    return;
  }
  if (event.data.type === "GET_TAB_URL") {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      sandbox.postMessage({ type: "TAB_URL", url: tab.url }, "null");
    } catch (e) {
      console.error("Error fetching tab URL:", e);
    }
  }
});
