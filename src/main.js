/* global chrome */
"use strict";
(function (window, chrome, undefined) {
    var style = function (pos, type, color, opacity) {
        var getURL = chrome.runtime.getURL,
            fontFace = (function () {
                var style = '@font-face {font-family: "alpha-sttb"; src:url("{$url}.woff") format("woff"), url("{$url}.ttf") format("truetype"); font-weight: normal; font-style: normal;}';
                return style.replace(/\{\$url\}/ig, getURL('lib/alpha-sttb'));
            }()),
            position = {
                'tl': 'top: 20px; left: 20px;',
                'tc': 'top: 20px; left: 50%; margin-left: -25px;',
                'tr': 'top: 20px; right: 20px;',
                'ml': 'top: 50%; margin-top: -25px; left: 20px;',
                'mr': 'top: 50%; margin-top: -25px; right: 20px;',
                'bl': 'bottom: 20px; left: 20px;',
                'bc': 'bottom: 20px; left: 50%; margin-left: -25px;',
                'br': 'bottom: 20px; right: 20px;'
            },
            typeList = [
                ['border-radius: 5px;', 'content: "\\e600";'],
                ['', 'content: "\\e601";'],
                ['', 'content: "\\e602";'],
            ],
            css = ' #alpha-sttb {width: 50px; height: 50px; position: fixed; z-index: 10000000; {pos}{type1}overflow: hidden; text-align: center; font-family: "alpha-sttb"; speak: none; font-style: normal; font-weight: normal; font-variant: normal; text-transform: none; -webkit-font-smoothing: antialiased; cursor: pointer; -webkit-transition-duration: .4s; -webkit-transform:rotate(180deg); opacity: .1;} #alpha-sttb.rotate {-webkit-transform:rotate(0deg);} #alpha-sttb.fade {opacity: {opacity}; } #alpha-sttb:hover {opacity: .9; } #alpha-sttb:after {{type2} font-size: 50px; line-height: 50px; color: {color};}';

        return fontFace + css.replace(/\{pos\}/ig, position[pos]).replace(/\{type1\}/ig, typeList[type][0]).replace(/\{color\}/ig, color).replace(/\{opacity\}/ig, opacity).replace(/\{type2\}/ig, typeList[type][1]);
    };

    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.action && request.action === 'get') {
            if (sender.tab && sender.tab.id) {
                chrome.tabs.insertCSS(sender.tab.id, {code: style('br', 0, '#36F', 0.3), allFrames: true}, function () {
                    sendResponse({
                        action: 'render',
                        html: '<div id="alpha-sttb"></div>',
                        selector: '#alpha-sttb'
                    });
                });
            }
        }
        return true;
    });
}(window, chrome));
