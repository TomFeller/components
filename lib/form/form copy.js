(function () {
    window.FormManager = {
        form: null,
        field: null,
        label: null,
        input: null,
        inputText: null,
        checkbox: null,
        regex: null,
        inputRegex: null,
        submit: null,

        init: function () {
            form = $('.form');
            label = $('.form__label');
            input = $('.form__input');
            inputText = $('.form__input--text ');
            inputRegex = $('[data-regex]');
            checkbox = $('#verify');
            field = $('.form__field');
            submit = $('#submit');
            checkbox.on('click', FormManager.checkboxChecked);
            inputText.on('focus', FormManager.inputFocus);
            inputText.on('blur', FormManager.inputBlur);
            submit.on('click', FormManager.formSubmit);
            regex = {
                email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                numbers: /^\d+$/
            }
        },

        inputFocus: function () {
            $(this).parent('.form__field').removeClass('valid notValid').addClass('focus');
            for (var i = 0; i < input.length; i++) {
                FormManager.inputBlur(input.eq(i));
            }
        },

        inputBlur: function (item) {
            item.type != undefined ? item = $(this) : item;
            item.val() != '' ?
                $(this).parent('.form__field').addClass('focus valid').removeClass('notValid') :
                $(this).parent('.form__field').removeClass('focus valid').addClass('notValid');
        },

        checkboxChecked: function() {
            $(this).parent('.checkbox').find('.checkbox__square').toggleClass('checked');
        },
        formSubmit: function () {
            FormManager.checkFormValidation() ? FormManager.getFormData() : alert('not good');
        },

        checkFormValidation: function () {
            for (var i = 0; i < input.length; i++) {
                item = input.eq(i);
                item.val() == '' ?
                    item.parent('.form__field').addClass('notValid').removeClass('valid') :
                    item.parent('.form__field').addClass('valid').removeClass('notValid');
            }
            for (var j = 0; j < inputRegex.length; j++) {
                item = inputRegex.eq(j);
                FormManager.validateRegex(item.data('regex'), item.val()) ?
                    item.parent('.form__field').addClass('valid').removeClass('notvalid') :
                    item.parent('.form__field').addClass('notValid').removeClass('valid');
            }
            return $('.notValid').length == 0 ? checkbox.is(':checked') ? true : false : false;
        },

        validateRegex: function (type, value) {
            return regex[type].test(value);
        },

        getFormData: function () {
            var data = {};
            for (var i = 0; i < input.length; i++) {
                var item = input.eq(i);
                data[item.attr('name')] = item.val();
            }
        }
    };
    $(document).ready(function () {
        FormManager.init();
    });
})(window);