(function () {
    window.FormManager = {
        form: null,
        formData: null,
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
            formData = [
                {
                    format: 'field',
                    text: 'Full name',
                    type: 'text',
                    name: 'full-name',
                    message: 'Please insert your name'
                },
                {
                    format: 'field',
                    text: 'Email',
                    type: 'email',
                    name: 'email',
                    validate: 'email',
                    message: 'Please insert your email'
                },
                {
                    format: 'field',
                    text: 'Phone number',
                    type: 'text',
                    name: 'phone',
                    validate: 'numbers',
                    message: 'Please insert your phone number'
                },
                {
                    format: 'field',
                    text: 'Link to your song',
                    type: 'text',
                    name: 'link',
                    message: 'Please insert link for your song'
                },
                {
                    format: 'checkbox',
                    text: 'I agree to terms',
                    name: 'verify',
                    message: 'Please Verify'

                },
                {
                    format: 'submit',
                    text: 'Send',
                    type: 'button'
                }
            ];
            FormManager.buildForm(formData);
            regex = {
                email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                numbers: /^\d+$/
            };
            label = $('.form__label');
            input = $('.form__input');
            inputText = $('.form__input--text ');
            inputRegex = $('[data-regex]');
            checkbox = $('.form__input--cb');
            field = $('.form__field');
            submit = $('#submit');
            checkbox.on('click', FormManager.checkboxChecked);
            inputText.on('focus', FormManager.inputFocus);
            inputText.on('blur', FormManager.inputBlur);
            submit.on('click', FormManager.formSubmit);
        },

        buildForm: function (data) {
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                switch (item.format) {
                    case 'field' :
                        form.append('' +
                            '<div class="form__field form__field--' + item.name + '">' +
                            '<label class="form__label form__label--text" for=' + item.name + '>*' + item.text + '</label>' +
                            '<input class="form__input form__input--text ' + item.name + '" type="text" id="' + item.name + '" name="' + item.name + '" data-regex="' + item.validate + '" />' +
                            '<span class="form__field--error">' + item.message + '</span>' +
                            '</div>' +
                            '');
                        break;
                    case 'checkbox' :
                        form.append('' +
                            '<div class="form__field form__field--cb">' +
                            '<div class="checkbox">' +
                            '<input class="form__input form__input--cb checkbox__input" type="checkbox" name="' + item.name + '" id="' + item.name + '"/>' +
                            '<span class="checkbox__square icon-checkmark"><img src="images/icons/icon-check.svg" /"></span>' +
                            '</div>' +
                            '<label class="form__label form__label--cb" for="verify">' + item.text + '</label>' +
                            '</div>' +
                            '');
                        break;
                    case 'submit' :
                        form.append('' +
                            '<div class="form__field form__submit">' +
                            '<button type="button" id="submit">' + item.text + '</button>' +
                            '</div>' +
                            '');
                        break;
                    default:
                }
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

        checkboxChecked: function () {
            $(this).parent('.checkbox').find('.checkbox__square').toggleClass('checked');
        },
        formSubmit: function () {
            FormManager.checkFormValidation() ? FormManager.getFormData() : alert('not good');
            return false;
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
                if(item.val() != '' || item.val() != undefined) {
                    FormManager.validateRegex(item.data('regex'), item.val()) ?
                        item.parent('.form__field').addClass('valid').removeClass('notvalid') :
                        item.parent('.form__field').addClass('notValid').removeClass('valid');
                }
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