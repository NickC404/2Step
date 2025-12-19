// src/wrapper.js
console.log("Wrapper loaded in privileged context");
var sandbox = document.getElementById("sandbox-frame").contentWindow;
window.addEventListener("message", async (event) => {
  if (event.data.type === "GET_TAB_URL") {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      sandbox.postMessage({ type: "TAB_URL", url: tab.url }, "*");
    } catch (e) {
      console.error("Error fetching tab URL:", e);
    }
  }
});
