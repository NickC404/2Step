// src/wrapper.js
var sandboxFrame = document.getElementById("sandbox-frame");
sandboxFrame.src = "ui.html";
var postToSandbox = (message) => {
  sandboxFrame.contentWindow?.postMessage(message, "*");
};
window.addEventListener("message", async (event) => {
  if (event.origin !== "null") {
    return;
  }
  if (event.data.type === "GET_TAB_URL") {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      postToSandbox({ type: "TAB_URL", url: tab.url });
    } catch (e) {
      console.error("Error fetching tab URL:", e);
    }
  }
  if (event.data.type === "OPEN_URL") {
    const url = event.data.url;
    if (typeof url === "string" && /^https?:\/\//i.test(url)) {
      chrome.tabs.create({ url });
    }
  }
  if (event.data.type === "GET_TIPS") {
    try {
      const stored = localStorage.getItem("2step-done-tips");
      const ids = JSON.parse(stored || "[]");
      postToSandbox({ type: "TIPS_DATA", ids: Array.isArray(ids) ? ids : [] });
    } catch {
      postToSandbox({ type: "TIPS_DATA", ids: [] });
    }
  }
  if (event.data.type === "SAVE_TIPS") {
    try {
      const ids = event.data.ids;
      if (Array.isArray(ids) && ids.every((id) => typeof id === "string")) {
        localStorage.setItem("2step-done-tips", JSON.stringify(ids));
      }
    } catch {
    }
  }
});
