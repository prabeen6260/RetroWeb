chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      css: "body { background-color: #222; color: #fff; }"
    });
  });