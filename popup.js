
document.getElementById("btn").addEventListener("click", () => {
    console.log('Button clicked, attempting to apply Gemini styles...');
    applyGeminiStyles();
});

function applyGeminiStyles() {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        console.log("Tab found, extracting essential HTML and CSS...");
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: () => {
                const bodyHTML = document.body.outerHTML; // Get only the body content
                const stylesheets = Array.from(document.styleSheets).map(sheet => {
                    try {
                        // Only extract rules from non-cross-origin stylesheets
                        return Array.from(sheet.cssRules).map(rule => rule.cssText).join(' ');
                    } catch (e) {
                        return ''; // Handle cross-origin stylesheets error
                    }
                }).join(' ');

                return { html: bodyHTML, css: stylesheets };
            },
        }, (results) => {
            if (results && results[0] && results[0].result) {
                console.log("Essential HTML and CSS extracted successfully.");
                const pageData = results[0].result;
                
                console.log("Sending message to background script with HTML and CSS.");
                chrome.runtime.sendMessage({
                    action: 'callGeminiAPI',
                    html: pageData.html,
                    css: pageData.css
                });
            } else {
                console.error("Failed to extract essential HTML and CSS.");
            }
        });
    });
}


// const GEMINI_API_KEY = "AIzaSyBCag4JyNXDZDsZhUdltv-ftc-0Jfcy7GM";
// const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

// let btnGemini = document.getElementById("btn_gemini");
// let inputText = document.getElementById("input_text");
// let resultText = document.getElementById("result_text");

// btnGemini.addEventListener("click", () => {
//     btnGemini.disabled = true;

//     fetch(GEMINI_API_URL, {
//         method: "POST",
//         body: JSON.stringify({
//             contents: [{
//                 parts:[{
//                     text: inputText.value
//                 }]
//             }]
//         }),
//     })
//     .then((response) => {
//         return response.json();
//     })
//     .then((result) => {
//         btnGemini.disabled = false;
//         resultText.innerText = result["candidates"][0]["content"]["parts"][0]["text"];
//     });
// });