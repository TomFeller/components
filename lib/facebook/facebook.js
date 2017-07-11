(function () {
    window.FacebookManager = {
        body: null,

        init: function () {
            body = $('#body');
            FacebookManager.openFacebookShareDialog();
        },

        openFacebookShareDialog: function() {
            FB.ui({
                method: 'share',
                title: 'pepsi - max',
                href: 'http://www.fellerweb.com/minisite/pepsi-max/images/pepsi-max&eyal-shani.jpg'
            });
        }
    };
    $(document).ready(function () {
        FacebookManager.init();
    });
})(window);