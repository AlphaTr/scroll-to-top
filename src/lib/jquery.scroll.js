(function ($) {
    $.easing.swing = function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t + b;
        }
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    };

    var $win = $(window),
        scrollToTop = function (el, options) {
            var defaults = {
                    speed: "slow",
                    ease: "swing",
                    start: 0,
                    transparency: 0,
                    distance: 0
                },
                _ = this,
                winH = $(window).height(),
                docH = document.documentElement.scrollHeight;

            defaults.distance = Math.min(winH, (docH - winH) / 2);

            this.inProgress = false;
            this.el = el;
            this.direction = 'up';
            this.opt = $.extend(defaults, options || {});

            this.init();
            $(el).on('click', function () {
                _.onClick();
            });
            $win.on('scroll', function () {
                _.onScroll();
            });
        };

    $.extend(scrollToTop.prototype, {
        init: function () {
            var _ = this,
                $e = $(_.el);

            _.direction = _.rotate($e, _.opt.distance);

            if ($win.scrollTop() >= _.opt.start) {
                $e.addClass("fade");
            }

            _.inProgress = false;
        },
        onClick: function () {
            var _ = this,
                o = _.opt,
                $e = $(_.el);

            if (_.inProgress) {
                $("html, body").stop();
                _.inProgress = false;
            } else if (_.direction === "up") {
                _.inProgress = true;
                _.scrollUp(o.speed, o.ease);
                $e.removeClass("fade");
            } else if (_.direction === "down") {
                _.inProgress = true;
                _.scrollDown(o.speed, o.ease);
                $e.removeClass("fade");
            }
        },
        onScroll: function () {
            var _ = this,
                o = _.opt,
                $e = $(_.el);

            if ($win.scrollTop() >= o.start) {
                $e.addClass("fade");
            } else {
                $e.removeClass("fade");
            }

            _.direction = _.rotate($e, o.distance);
        },
        scrollUp: function () {
            var _ = this;
            $("html, body").animate({scrollTop: 0}, _.opt.speed, _.opt.ease, function () {
                _.inProgress = false;
            });
        },
        scrollDown: function () {
            var height = $(document).height(),
                _ = this;
            $("html, body").animate({scrollTop: height}, _.opt.speed, _.opt.ease, function () {
                _.inProgress = false;
            });
        },
        rotate: function () {
            var _ = this;
            if ($win.scrollTop() >= _.opt.distance) {
                $(_.el).addClass('rotate');
                return "up";
            } else {
                $(_.el).removeClass('rotate');
                return "down";
            }
        }
    });

    $.fn.scrollToTop = function (options) {
        return this.each(function () {
            new scrollToTop(this, options);
        });
    };
}(jQuery));
