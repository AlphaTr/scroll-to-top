/* global chrome */
"use strict";
(function (window, chrome, undefined) {
    var runtime = chrome.runtime,
        inited,
        url = location.href,
        messageSender = function (action) {
            var params = Array.prototype.slice.call(arguments, 1),
                callback, length = params.length;

            if (typeof params[length - 1] === 'function') {
                callback = params[length - 1];
                params = Array.prototype.slice.call(params, 0, length - 1);
            }

            runtime.sendMessage({
                action : action,
                params : params
            }, function (response) {
                if (callback) {
                    callback(response);
                }
            });
        },

        render = function (msg) {
            console.log(msg);
            if (msg.action === 'render' && msg.html) {
                $('body').append(msg.html);
                if (!inited) {
                    $('body').on('click', msg.selector, function () {

                    });
                    inited = true;
                }
            }
        };

    runtime.onMessage.addListener(render);

    if ((window == top) && ($(window).height() < $(document).height())) {
        messageSender('get', {url: url}, render);
    } else {
        $(window).on('scroll', function() {
            messageSender('get', {url: url}, render);
            $(window).off('scroll');
        });
    }
}(window, chrome));
