document.getElementById("btn").addEventListener("click", event => {
    changeBackground(event.target.value)
  })
  function changeBackground(color) {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: changeBackgroundColor,
        args: [color],
      })
    })
  }
  function changeBackgroundColor(color) {
    document.body.style.backgroundColor = "red"
    document.body.style.border = "10px solid black"
  }