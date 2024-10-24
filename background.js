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



// Event listener for the button click
document.getElementById("btn").addEventListener("click", event => {
    changeToRetroStyles();
  });
  
  // Function to remove existing styles and apply new retro styles
  function changeToRetroStyles() {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: applyRetroStyles,
      });
    });
  }
  
  // Function that will run in the context of the webpage to change the styles
  function applyRetroStyles() {
    // Remove all existing stylesheets
    let stylesheets = document.querySelectorAll('link[rel="stylesheet"], style');
    stylesheets.forEach(style => style.remove());
  
    // Apply new retro styles (CSS rules from the 90s)
    const style = document.createElement('style');
    style.innerHTML = `
      /* Retro 90's style example */
body, div, p, a, h1, h2, h3, h4, h5, h6, ul, ol {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* 90s-style body */
body {
    background-color: lightgray;
    font-family: "Courier New", monospace;
    color: black;
    font-size: 16px;
    line-height: 1.5;
    margin: 20px;
    padding: 10px;
    border: none;
}

/* 90s Heading Styles */
h1, h2, h3 {
    color: blue;
    text-align: center;
    font-family: "Comic Sans MS", cursive, sans-serif;
    margin: 10px 0;
    text-shadow: 1px 1px yellow;
}

/* Paragraph styling - common in 90's websites */
p {
    color: green;
    font-size: 14px;
    line-height: 1.7;
    padding: 10px;
    background-color: white;
    border: 1px solid black;
    margin: 20px 0;
}

/* Links */
a {
    color: purple;
    text-decoration: underline;
    font-weight: bold;
}

/* Basic button styling */
button {
    font-family: "Courier New", monospace;
    font-size: 16px;
    padding: 10px;
    background-color: yellow;
    color: black;
    border: 2px solid black;
    cursor: pointer;
    margin: 10px;
}

/* Inputs and form elements */
input, select, textarea {
    font-family: "Courier New", monospace;
    font-size: 14px;
    padding: 5px;
    margin: 10px 0;
    border: 2px solid black;
}

/* Images and tables */
img, table {
    border: 2px solid black;
    margin: 10px;
    padding: 5px;
}

/* Table Styling */
table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    margin: 20px 0;
}

th, td {
    border: 1px solid black;
    padding: 10px;
    text-align: left;
}

th {
    background-color: yellow;
    color: black;
}

td {
    background-color: lightblue;
}

/* No border for divs by default */
div {
    border: none;
}

/* Horizontal rule styling */
hr {
    border: 1px solid black;
    margin: 20px 0;
}

    `;
    
    document.head.appendChild(style);
  }
  