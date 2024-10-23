// document.addEventListener('DOMContentLoaded', function () {
//     const changeCssButton = document.getElementById('change-css');
//     changeCssButton.addEventListener('click', function () {
//       chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         if (tabs.length > 0) {
//           const tabId = tabs[0].id;
//           chrome.scripting.executeScript({
//             target: { tabId: tabId },
//             function: (color) => {
//               document.body.style.backgroundColor = color;
//               document.body.style.border = "10px solid black";
//             },
//             args: ['red']
//           })
//           .then(() => console.log("Script executed"))
//           .catch((error) => console.error("Error executing script: ", error));
//         }
//       });
//     });
  
//     document.getElementById("colorPicker").addEventListener("input", event => {
//       changeBackground(event.target.value);
//     });
  
//     const colors = ["#fffaec", "#f8f3e7", "#d9d9d9", "#bdbdbd"];
  
//     for (var i = 0; i < 4; i++) {
//       let ele = document.getElementById(`color${i}`);
//       let color = colors[i];
//       ele.addEventListener("click", () => {
//         changeBackground(color);
//       });
//       ele.style.backgroundColor = color;
//     }
  
//     function changeBackground(color) {
//       chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
//         chrome.scripting.executeScript({
//           target: { tabId: tabs[0].id },
//           function: changeBackgroundColor,
//           args: [color],
//         });
//       });
//     }
  
//     function changeBackgroundColor(color) {
//       document.body.style.backgroundColor = color;
//       document.body.style.border = "10px solid black";
//     }
//   });










































document.getElementById("colorPicker").addEventListener("input", event => {
    changeBackground(event.target.value)
  })
  
  const colors = ["#fffaec", "#f8f3e7", "#d9d9d9", "#bdbdbd"]
  
  for (var i = 0; i < 4; i++) {
    let ele = document.getElementById(`color${i}`)
    let color = colors[i]
    ele.addEventListener("click", () => {
      changeBackground(color)
    })
    ele.style.backgroundColor = color
  }
  
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
    document.body.style.backgroundColor = color
    document.body.style.border = "10px solid black"
  }