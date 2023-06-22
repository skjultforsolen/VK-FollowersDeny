const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click",() => {
  chrome.tabs.query({active: true}, function(tabs) {
    var tab = tabs[0];
    if (tab) {
        chrome.scripting.executeScript(
            {
                target:{tabId: tab.id, allFrames: true},
                func:startScript
            }
        )
    } else {
        alert("There are no active tabs")
    }
})
})
function startScript(){
    function scroll(){
        window.scrollTo(0, window.scrollY + 100);
    }
    function findAndClickDenyButton() {
        const denyButton = document.querySelector('.FlatButton.FlatButton--tertiary.FlatButton--size-s.friends_deny_request');
        if(denyButton) {
            denyButton.click();
            scroll();
        } else {
            clearInterval(interval);
            alert("You do not have any active friend requests or the connection to the site has been interrupted!")
        }
    }
    const interval = setInterval(findAndClickDenyButton, 1000);
}
