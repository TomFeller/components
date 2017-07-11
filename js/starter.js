(function () {
    window.StarterManager = {
        body: null,

        init: function () {
            body = $('#body');
        },

        demo: function () {

        }
    };
    $(document).ready(function () {
        StarterManager.init();
    });
})(window);