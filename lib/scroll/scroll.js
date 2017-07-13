(function () {
    window.ScrollManager = {
        body: null,
        lastId: null,
        topMenu: null,
        topMenuHeight: null,
        menuItems: null,
        scrollItems: null,
        lastScrollTop: null,

        init: function () {
            body = $('body');
            lastId = '';
            topMenu = $("#main-navigation");
            topMenuHeight = 0;
            menuItems = topMenu.find('a');
            lastScrollTop = 0;
            scrollItems = ScrollManager.getScrollItems(menuItems);

            $(window).on('scroll', ScrollManager.windowScroll);


        },

        windowScroll: function () {
            if (!($('html').hasClass('ie'))) {

                // TODO: parralax functionality;
                // [].slice.call(parallax).forEach(function (el, i) {
                //
                //     var windowYOffset = window.pageYOffset,
                //         elBackgrounPos = "50% " + (windowYOffset * speed) + "px";
                //
                //     el.style.backgroundPosition = elBackgrounPos;
                //
                // });
                // [].slice.call(parallaxMessage).forEach(function (el, i) {
                //
                //     var message_windowYOffset = window.pageYOffset,
                //         message_elBackgrounPos = "50% " + (-message_windowYOffset * (speed / 1.6)) / 10 + "rem";
                //
                //     el.style.backgroundPosition = message_elBackgrounPos;
                //
                // });
                // [].slice.call(policeStrip).forEach(function (el, i) {
                //
                //     var policeStrip_windowYOffset = window.pageYOffset,
                //         policeStrip_elBackgrounPos = (policeStrip_windowYOffset * (speed / 1.6)) / 10 + "rem " + 0;
                //
                //     el.style.backgroundPosition = policeStrip_elBackgrounPos;
                //
                // });

                // Get container scroll position
                var fromTop = $(this).scrollTop() + topMenuHeight + 65;

                // Get id of current scroll item
                var current = scrollItems.map(function () {
                    if ($(this).offset().top < fromTop)
                        return this;
                });
                // Get the id of the current element
                current = current[current.length - 1];
                var id = current && current.length ? current[0].id : '';

                if (lastId !== id) {
                    lastId = id;
                    menuItems.parent('.nav__item').removeClass('active').end().filter('[href="#' + id + '"]').parent('.nav__item').addClass("active");
                    ScrollManager.urlChanger(id);
                }
                ScrollManager.scrollUpDown();
            }
        },

        getScrollItems: function (items) {
            return items.map(function () {
                var item = $($(this).attr("href"));
                if (item.length) {
                    return item;
                }
            });
        },

        urlChanger: function (href) {
            var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            if (w > 769) {
                //window.location.hash = href; // it appends id to url without refresh
            }
        },

        scrollUpDown: function () {
            var st = $(window).scrollTop();
            if (st > lastScrollTop) {
                body.removeClass('scroll-up').addClass('scroll-down');
            } else {
                body.removeClass('scroll-down').addClass('scroll-up');
            }
            lastScrollTop = st;
        }
    };
    $(document).ready(function () {
        ScrollManager.init();
    });
})(window);