import * as $ from 'jquery';

function modifyDOM(command) {
  //You can play with your DOM here or check URL against your regex
  console.log('Tab script: ' + command);
  console.log(document.body);
  let currentlyPlaying = !!document.body.querySelector('button[data-qa-id="pauseButton"]');
  console.log('play hidden ?', !!document.body.querySelector('button[data-qa-id="pauseButton"]'));

  if (command == 'prev') {
    (document.body.querySelector('button[data-qa-id="previousButton"]') as HTMLElement).click();
  } else if (command == 'next') {
    (document.body.querySelector('button[data-qa-id="nextButton"]') as HTMLElement).click();
  } else if (command == 'playPause' && currentlyPlaying) {
    (document.body.querySelector('button[data-qa-id="pauseButton"]') as HTMLElement).click();
  } else if (command == 'playPause' && !currentlyPlaying) {
    (document.body.querySelector('button[data-qa-id="resumeButton"]') as HTMLElement).click();
  } else if (command == 'stop') {
    (document.body.querySelector('button[data-qa-id="closeButton"]') as HTMLElement).click();
  } else {
    console.error('Error while sending action to Plex. [' + command + ']');
  }

  chrome.runtime.sendMessage({playingStatus: currentlyPlaying ? "playing" : "paused"}, function (response) {
    console.log(response);
  });

  return document.body.innerHTML;
}

$(function () {
  let plexTab = null;
  let pmsAction = '';
  let debouncer;

  //chrome.browserAction.setBadgeText({text: '►'});

  function processTabs() {
    chrome.tabs.query({}, function (tabs) {
      $.each(tabs, function (index, tab) {
        if (tab.url.indexOf('32400') > -1 || tab.url.indexOf('plex.tv') > -1) {
          plexTab = tab;
          console.log('get', tab);

          chrome.commands.onCommand.addListener(function (command) {
            clearTimeout(debouncer);
            pmsAction = command;

            debouncer = setTimeout(() => {
              chrome.tabs.executeScript(tab.id, {
                code: '(' + modifyDOM + ')("' + command + '");'
              }, (results) => {
                //Here we have just the innerHTML and not DOM structure
                console.log('Popup script:');
                console.log(results[0]);
              });
            }, 200);
          });
        }
      });
    });
  }

  processTabs();

  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    processTabs();
  });

  chrome.tabs.onCreated.addListener(function (tab) {
    processTabs()
  });

});
