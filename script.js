const scrapeBtn = document.getElementById("btn");
const list = document.getElementById('emailList');

// Handler to receive the emails
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    let emails = request.emails;
    

    //Display the items
    if (emails == null || emails.length == 0) {
        let li = document.createElement('li');
        li.innerText = "No emails found";
        list.appendChild(li);
    } else {
        emails.forEach((email) => {
            let li = document.createElement('li');
            li.innerText = email;
            list.appendChild(li);
        })
    }
})

scrapeBtn.addEventListener("click", async () => {
  //Get the current active tab

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  //Execute script to praise emails from page
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: scrapeEmailFromPage,
  });
});

//Function to scrape email

function scrapeEmailFromPage() {
  const emailRegEx = /[\w\.=-]+@[\w\.-]+\.[\w]{2,3}/gim;

  let emails = document.body.innerHTML.match(emailRegEx);

    chrome.runtime.sendMessage({emails});
}
