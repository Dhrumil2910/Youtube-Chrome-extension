var opened = false;
var panel = 0;

chrome.browserAction.onClicked.addListener(function() {
    // Allow only one instance
    if (!opened) {
        opened = true;
        chrome.windows.create({
                url: "",
                type: "popup",
                focused: true,
                width: 100,
                height: 100
            },
            function(window) { panel = window.id }
        )
    }

    // Focus on clicking the extension icon
    else if (opened) { chrome.windows.update(panel, { focused: true }) }
    // Remove when remo
    chrome.windows.onRemoved.addListener(function(windowId) {
        if (windowId == panel) {
            panel = 0;
            opened = false;
        }
    });
});

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    if (details.frameId === 0) {
        // Fires only when details.url === currentTab.url
        chrome.tabs.get(details.tabId, function(tab) {
            if (tab.url != details.url) {
                chrome.tabs.reload(tab.id);
            }
        });
    }
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.command == "videoUrl") {
            chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function(tabs) {
                var videoUrl = tabs[0].url;
                sendResponse({ reply: videoUrl });

            });
        } else if (request.command == "access_token") {
            localStorage.access_token = request.token; // storing in the scope of all the content and extension scripts
            sendResponse({ farewell: "success" });
        }
        else if (request.command == "get_access_token") {
            sendResponse({ token: localStorage.access_token });
        }
    });
