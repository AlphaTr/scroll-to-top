/* global chrome */
var options = (function () {
    var OPT_KEY = 'options',
        defaultOpt = {
            pos: 'br',
            type: 0,
            color: '#789',
            opacity: 0.3
        },
        storage = chrome.storage.sync,
        opt,

        get = function () {
            var deferred = $.Deferred();
            if (opt) {
                deferred.resolve(opt);
            } else {
                storage.get(OPT_KEY, function (o) {
                    var opt = $.extend({}, defaultOpt, o[OPT_KEY] || {});
                    deferred.resolve(opt);
                });
            }
            return deferred.promise();
        },

        set = function (key, value) {
            var deferred = $.Deferred(),
                obj = {};
            if (typeof key === 'string') {
                obj[key] = value || '';
            } else {
                obj = key;
            }

            get().then(function (o) {
                var items = {};
                items[OPT_KEY] = $.extend(o, obj);
                storage.set(items, function () {
                    if (chrome.runtime.lastError) {
                        deferred.reject(chrome.runtime.lastError);
                    } else {
                        deferred.resolve();
                    }
                });
            });
            return deferred.promise();
        };
    return {
        get: get,
        set: set
    };
}());
