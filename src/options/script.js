/* global chrome */
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
    };

messageSender('get-base').then(function (baseOpt) {
    var init = function () {
            var init = function (item) {
                    $(item.selector).each(function () {
                        var $this = $(this),
                            key = $this.data(item.key);

                        if (key === baseOpt[item.key]) {
                            $this.addClass('on');
                        }

                        if (item.key === 'color') {
                            $this.css('background', key);
                        }
                    }).on('click', function () {
                        $(item.selector).removeClass('on');

                        var key = $(this).addClass('on').data(item.key),
                            title = $(this).attr('title');

                        baseOpt[item.key] = key;

                        if (item.key === 'pos') {
                            $('#base .pos p span').html(title);
                        }

                        setOpt();
                    });
                },
                initOpacity = function () {
                    var setOpacity = function (val) {
                            var opacity = parseFloat(val, 10).toFixed(1);
                            $('#base .opacity label').html(opacity);
                            $('#base .opacity input').val(opacity);
                            baseOpt.opacity = opacity;
                        };

                    $('#base .opacity input').on('change, input', function () {
                        setOpacity($(this).val());
                        setOpt();
                    });

                    setOpacity(baseOpt.opacity);
                };

            [
                {selector: '#base .pos td.cell', key: 'pos'},
                {selector: '#base .color td', key: 'color'},
                {selector: '#base .type li', key: 'type'}
            ].forEach(init);
            initOpacity();
            setOpt();
        },
        render = function (opt) {
            var types = ['&#58880;', '&#58881;', '&#58882;'];
            $('#base .preview').css({color: opt.color, opacity: opt.opacity}).html(types[opt.type]);
        },
        setOpt = function () {
            messageSender('set-base', baseOpt).then(function (opt) {
                render(opt);
            });
        };
    init();
});

