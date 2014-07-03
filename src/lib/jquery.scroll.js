(function ($) {
    var $win = $(window),
        scrollToTop = function (el, options) {
            var defaults = {
                speed: "slow",
                ease: "jswing",
                start: 0,
                transparency: 0,
                distance: $(window).height()
            };

            this.inProgress = false;
            this.el = el;
            this.direction = 'up';
            this.opt = $.extend(defaults, options || {});

            this.init();
            $(el).on('click', this.onClick);
            $win.on('scroll', this.onScroll);
        };

    $.extend(scrollToTop.prototype, {
        init: function () {
            var _ = this,
                $e = $(_.el);

            $e.hide();
            _.direction = _.rotate($e, _.opt.distance);

            if ($win.scrollTop() >= _.opt.start) {
                $e.fadeIn("slow");
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
                $e.fadeTo("medium", o.transparency);
            } else if (_.direction === "down") {
                _.inProgress = "yes";
                _.scrollDown(o.speed, o.ease);
                $e.fadeTo("medium", o.transparency);
            }
        },
        onScroll: function () {
            var _ = this,
                o = _.opt,
                $e = $(_.el);

            $win.on('scroll', function () {
                if ($win.scrollTop() >= o.start) {
                    $e.fadeIn("slow");
                } else {
                    $e.fadeOut("slow");
                }

                _.direction = _.rotate($e, o.distance);
            });
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
                $(_.el).rotate({
                    animateTo: 0
                });
                return "up";
            } else {
                $(_.el).rotate({
                    animateTo: -180
                });
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
