(function () {
    window.PopupManager = {
        popup: null,
        popupOpen: null,
        popupClose: null,
        popupContent: null,
        init: function () {
            popup = $('.popup');
            popupOpen = $('[data-open-popup]');
            popupClose = popup.find('.popup__close');
            popupClose.on('click', PopupManager.closePopup);
            popup.on('click', PopupManager.closePopup);
            popupContent = popup.find('.popup__content');
            popupContent.on('click', function (e) {
                e.stopPropagation();
            });

            // Open popup with a Trigger
            popupOpen.on('click', PopupManager.openPopup);

            // Open popup without a Trigger
            PopupManager.openPopup('three');
        },
        openPopup: function (index) {
            var toOpen = $(this).attr('data-open-popup');
            index = toOpen == undefined ? index : toOpen;
            popup.addClass('open')
                .find('.popup__content').removeClass('active')
                .filter('[data-index = ' + index + ']').addClass('active');
        },
        closePopup: function () {
            popup.removeClass('open').find('.popup__content').removeClass('active');
        }
    };
    $(document).ready(function () {
        PopupManager.init();
    });
})(window);