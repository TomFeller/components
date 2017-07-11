(function () {
    window.DataManager = {
        mainNavigation: null,
        logoUrl: null,
        init: function () {
            // Navigation
            mainNavigation = [
                {id: 1, text: 'link', target: '#a', modifier: 'one'},
                {id: 2, text: 'link', target: '#b', modifier: 'two'},
                {id: 3, text: 'link', target: '#c', modifier: 'three'},
                {id: 4, text: 'link', target: '#d', modifier: 'four'},
                {id: 1, text: 'link', target: '#3', modifier: 'five'},
                {id: 2, text: 'link', target: '#f', modifier: 'six'},
                {id: 3, text: 'link', target: '#g', modifier: 'seven'},
                {id: 4, text: 'link', target: '#h', modifier: 'eight'}
            ];

            // Logo
            logoUrl = 'logo.png';

            // share
            shareIcons = [
                {id: 1, icon: 'icon-gmaps.png', social: 'g-maps', target: 'http://maps.google.com/'},
                {id: 2, icon: 'icon-waze.png', social: 'facebook', target: 'http://www.facebook.com/'},
                {id: 3, icon: 'icon-location.png', social: 'location', target: 'http://maps.google.com/'}
            ]

        },

        getData: function (element) {
            return element;
        }
    };
    $(document).ready(function () {
        DataManager.init();
    });
})(window);

