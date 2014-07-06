/* global chrome */
"use strict";
(function (window, chrome, undefined) {
    var runtime = chrome.runtime,
        messageSender = function (action) {
            var params = Array.prototype.slice.call(arguments, 1),
                deferred = $.Deferred();

            runtime.sendMessage({
                action : action,
                params : params
            }, function (response) {
                deferred.resolve(response);
            });
            return deferred.promise();
        },

        render = function (msg) {
            if (msg.action === 'render' && msg.html) {
                $('body').find(msg.selector).remove();
                $('body').append(msg.html);
                $('body').find(msg.selector).scrollToTop();
            }
        };

    runtime.onMessage.addListener(render);

    if ((window === top) && ($(window).height() < $(document).height())) {
        messageSender('get').then(render);
    } else {
        $(window).on('scroll', function () {
            messageSender('get').then(render);
            $(window).off('scroll');
        });
    }
}(window, chrome));
