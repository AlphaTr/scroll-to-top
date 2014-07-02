(function ($) {
    var inProgress = false,
        $win = $(window),
        scrollUp = function (speed, ease) {
            $("html, body").animate({scrollTop: 0}, speed, ease, function () {
                inProgress = false;
            });
        },
        scrollDown = function (speed, ease) {
            var height = $(document).height();
            $("html, body").animate({scrollTop: height}, speed, ease, function () {
                inProgress = false;
            });
        },
        rotate = function (element, distance) {
            if ($win.scrollTop() >= distance) {
                element.rotate({
                    animateTo: 0
                });
                return "up";
            } else {
                element.rotate({
                    animateTo: -180
                });
                return "down";
            }
        };


    $.fn.extend({
        scrollToTop: function (options) {
            var defaults = {
                speed: "slow",
                ease: "jswing",
                start: 0,
                transparency: 0,
                distance: $(window).height()
            };

            options = $.extend(defaults, options || {});
            return this.each(function () {
                var o = options,
                    direction,
                    $scroll = $(this);

                // 初始化
                $scroll.hide();
                direction = rotate($scroll, o.distance);

                if ($win.scrollTop() >= o.start) {
                    $scroll.fadeIn("slow");
                }
                inProgress = false;

                // 滚动事件
                $win.on('scroll', function () {
                    if ($win.scrollTop() >= o.start) {
                        $scroll.fadeIn("slow");
                    } else {
                        $scroll.fadeOut("slow");
                    }

                    direction = rotate($scroll, o.distance);
                });

                $scroll.on('click', function () {
                    if (inProgress) {
                        $("html, body").stop();
                        inProgress = false;
                    } else if (direction === "up") {
                        inProgress = true;
                        scrollUp(o.speed, o.ease);
                        $scroll.fadeTo("medium", o.transparency);
                    } else if (direction === "down") {
                        inProgress = "yes";
                        scrollDown(o.speed, o.ease);
                        $scroll.fadeTo("medium", o.transparency);
                    }
                });
            });
        }
    });
}(jQuery));
