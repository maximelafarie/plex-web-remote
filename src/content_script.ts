chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    function setBadge(isPlaying) {
        if (isPlaying) {
            chrome.browserAction.setBadgeText({text: '►'});
        } else {
            chrome.browserAction.setBadgeText({text: '❙❙'});
        }
    }

    if (msg.playingStatus == "playing") {
        setBadge(true);
    } else {
        setBadge(false);
    }
        sendResponse({farewell: "goodbye"});

    if (msg.text === 'report_back') {
        // Call the specified callback, passing
        // the web-page's DOM content as argument
        sendResponse(document.all[0].outerHTML);
    }

    if (msg.color) {
        console.log('Receive color = ' + msg.color);
        document.body.style.backgroundColor = msg.color;
        sendResponse('Change color to ' + msg.color);
    } else {
        sendResponse('Color message is none.');
    }
});
