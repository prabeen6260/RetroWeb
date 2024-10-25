chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'callGeminiAPI') {
      console.log("Calling Gemini API with extracted HTML and CSS.");
      const { html, css } = message;
      callGeminiAPI(html, css);
    }
  });
  
  // Function to call the Gemini API
  async function callGeminiAPI(html, css) {
    const apiKey = 'AIzaSyBCag4JyNXDZDsZhUdltv-ftc-0Jfcy7GM'; // Replace with your API key
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`;
  
    // Create the prompt using the extracted HTML and CSS
    const prompt = `
        Here is the HTML and CSS of a webpage:
        HTML:
        ${html}
        CSS:
        ${css}
        
        Please modify this to give it a retro look with 90's style CSS.
    `;
    const data = {
        contents: [{
            parts: [{
                text: prompt
        }]
    }]
    };
    return fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            // if(data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
                console.log(data.candidates[0].content.parts[0].text);
                const result = data.candidates[0].content.parts[0].text;
            injectStylesToPage(result);
        })
        .catch((error) => {
            console.error('Error:', error);
            return { error: error.toString() };
        });
}

  
//   // Function to apply the new styles to the page
//   function applyStylesToPage(result) {
//     chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
//       if (tabs[0]?.id) {
//         chrome.scripting.executeScript({
//           target: { tabId: tabs[0].id },
//           function: applyNewStyles,
//           args: [result]
//         }).catch(error => {
//           console.error('Error executing script:', error);
//         });
//       } else {
//         console.error('No active tab found');
//       }
//     });
//   }
  
//   // Function that applies the new styles to the webpage
//   function applyNewStyles(newStyles) {
//     try {
//       const styleElement = document.createElement('style');
//       styleElement.textContent = newStyles;
//       document.head.appendChild(styleElement);
//       console.log("Retro styles applied to the page.");
//     } catch (error) {
//       console.error('Error applying styles:', error);
//     }
//   }

// Inject the retro styles into the active tab
function injectStylesToPage(styles) {
    chrome.windows.getLastFocused({ populate: true }, window => {
        const activeTab = window.tabs.find(tab => tab.active);
        
        if (activeTab && activeTab.id) {
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                func: injectCSSIntoPage,
                args: [styles],
            }, (result) => {
                console.log("Retro styles injected successfully.", result);
            }).catch(error => {
                console.error('Error executing script:', error);
            });
        } else {
            console.error('No active tab found.');
        }
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