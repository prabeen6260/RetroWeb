// document.getElementById("btn").addEventListener("click", event => {
//     changeBackground(event.target.value)
//   })
//   function changeBackground(color) {
//     chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
//       chrome.scripting.executeScript({
//         target: { tabId: tabs[0].id },
//         function: changeBackgroundColor,
//         args: [color],
//       })
//     })
//   }
//   function changeBackgroundColor(color) {
//     document.body.style.backgroundColor = "red"
//     document.body.style.border = "10px solid black"
//   }

// AIzaSyBCag4JyNXDZDsZhUdltv-ftc-0Jfcy7GM

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message received in background script:", message); // Verify message receipt
    if (message.action === 'applyRetroStyles') {
        console.log("Applying retro styles directly to the page.");
        applyRetroStyles();
    }
});

// Function to apply the retro CSS styles
function applyRetroStyles() {
    console.log("Preparing to inject retro styles.");

    // Retro CSS with `!important` to override existing styles
    const retroCSS = `
        body {
            background-color: lightgray !important;
            font-family: "Courier New", monospace !important;
            color: black !important;
            font-size: 16px !important;
        }
        h1, h2, h3 {
            color: blue !important;
            font-family: "Comic Sans MS", cursive, sans-serif !important;
            text-align: center !important;
            text-shadow: 1px 1px yellow !important;
        }
        p {
            color: green !important;
            background-color: white !important;
            border: 1px solid black !important;
            padding: 10px !important;
            margin: 10px 0 !important;
        }
        a {
            color: purple !important;
            text-decoration: underline !important;
        }
        button {
            font-family: "Courier New", monospace !important;
            background-color: yellow !important;
            border: 2px solid black !important;
            color: black !important;
        }
        img {
            border: 2px solid black !important;
        }
        table {
            border-collapse: collapse !important;
            width: 100% !important;
        }
        th, td {
            border: 1px solid black !important;
            padding: 10px !important;
        }
        th {
            background-color: yellow !important;
        }
        td {
            background-color: lightblue !important;
        }
    `;

    // Apply the retro CSS to the active tab
    injectStylesToPage(retroCSS);
}

// Inject the retro styles into the active tab
function injectStylesToPage(styles) {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: injectCSSIntoPage,
            args: [styles],
        }, (result) => {
            console.log("Retro styles injected successfully.", result);
        });
    });
}

// Function that actually injects the styles into the current webpage
function injectCSSIntoPage(newStyles) {
    console.log("Injecting new styles:", newStyles);
    const styleElement = document.createElement('style');
    styleElement.innerHTML = newStyles;
    document.head.appendChild(styleElement);
    console.log("Styles applied to the page.");
}

