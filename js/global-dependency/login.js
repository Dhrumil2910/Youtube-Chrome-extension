chrome.runtime.sendMessage({ command: "access_token", token: localStorage.accessToken }, function(response) {
    console.log(response.farewell);
});


