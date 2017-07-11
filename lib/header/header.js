(function () {
    window.HeaderManager = {
        header: null,
        logo: null,
        share: null,
        nav: null,
        menu: null,
        DOM: null,

        init: function () {
            DOM = '';
            header = $('#header');
            share = 'share';
            logo = HeaderManager.getLogo(logoUrl);
            menu = HeaderManager.getMenu(mainNavigation);

            elements = [
                logo, menu, share
            ];

            HeaderManager.insertContentToHeader(elements);
        },

        getMenu: function (nav) {
            var list = '';
            for (var i = 0; i < nav.length; i++) {
                var item = nav[i],
                    b = 'nav__item',
                    className = '' + b + " " + b + "--" + item.modifier + '';

                list +=
                    '<li class="' + className + '">' +
                    '<a href="' + item.target + '">' + item.text + '</a> ' +
                    '</li>'
            }
            return '<ul id="main-navigation" class="header__nav nav">' + list + '</ul>';
        },

        getLogo: function(url) {
            return '<div class="header__logo logo logo--main"><img src="images/' + url + '" /></div>'
        },

        insertContentToHeader: function (content) {
            for (var i = 0; i < content.length; i++) {
                DOM += content[i];
            }
            header.html(DOM);
        }
    };

    $(document).ready(function () {
        HeaderManager.init();
    });
})(window);