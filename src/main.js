/* global chrome, EventEmitter */
"use strict";
(function (window, chrome, undefined) {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.action && request.action === 'get') {
            console.log("XXXX");
            sendResponse({
                action: 'render',
                html: '<div id="alpha-sttb" style="position: fixed; bottom: 20px; right: 20px; z-index: 200000000; background: #789; width: 50px; height: 50px;"></div>',
                selector: '#alpha-sttb'
            });
        }
        return true;
    });
}(window, chrome));
