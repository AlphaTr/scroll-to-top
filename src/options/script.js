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
    var initColor = function () {
            $('#base .color td').each(function () {
                var $this = $(this),
                    color = $this.data('color');
                $this.css('background', color);
            });
        },
        init = function () {
            initColor();
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

    $('#base .pos td').on('click', function () {
        $('#base .pos td').removeClass('cell-on');
        var key = $(this).addClass('cell-on').data('key'),
            title = $(this).attr('title');

        $('#base .pos p span').html(title);
        baseOpt.pos = key;
        setOpt();
    });

    $('#base .color td').on('click', function () {
        $('#base .color td').removeClass('on');
        var color = $(this).addClass('on').data('color');
        baseOpt.color = color;
        setOpt();
    });

    $('#base .type li').on('click', function () {
        $('#base .type li').removeClass('on');
        $(this).addClass('on');
        baseOpt.type = $(this).index();
        setOpt();
    });

    $('#base .opacity input').on('change, input', function () {
        var opacity = parseFloat($(this).val(), 10).toFixed(1);
        $('#base .opacity label').html(opacity);
        baseOpt.opacity = opacity;
        setOpt();
    });

    init();
});

