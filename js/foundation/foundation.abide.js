;
(function($, window, document, undefined) {
    'use strict';

    Foundation.libs.abide = {
        name: 'abide',

        version: '5.1.0',

        settings: {
            focus_on_invalid: true,
            error_labels: true, // labels with a for="inputId" will recieve an `error` class
            timeout: 1000,
            validateOnChange: true,
            patterns: {
                alpha: /^[a-zA-Z]+$/,
                alpha_numeric: /^[a-zA-Z0-9]+$/,
                integer: /^\d+$/,
                number: /-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?/,

                // generic password: upper-case, lower-case, number/special character, and min 8 characters
                password: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,

                // amex, visa, diners
                card: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
                cvv: /^([0-9]){3,4}$/,

                // http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#valid-e-mail-address
                email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,

                url: /(https?|ftp|file|ssh):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?/,
                // abc.de
                domain: /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/,

                datetime: /([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))/,
                // YYYY-MM-DD
                date: /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))/,
                // HH:MM:SS
                time: /(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}/,
                dateISO: /\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/,
                // MM/DD/YYYY
                month_day_year: /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/,

                // #FFF or #FFFFFF
                color: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
            }
        },

        timer: null,

        init: function(scope, method, options) {
            this.bindings(method, options);
        },

        events: function(scope) {
            var self = this,
                form = $(scope).attr('novalidate', 'novalidate'),
                settings = form.data('abide-init');

            form.off('.abide')
                .on('reset', function() {
                    return self.reset($(this));
                })
                .find('input, textarea, select')
                .off('.abide')
                .on('blur.fndtn.abide change.fndtn.abide', function(e) {
                    $(this).trigger('validate');
                }).on('validate', function(e) {
                    self.validate(this);
                    e.stopPropagation();
                }).on('valid', self.onElementValid)
                .on('invalid', self.onElementInvalid);

            // For legacy issues we need to keep that I believe, correct me if I'm wrong.
            form.on('submit.fndtn.abide validate.fndtn.abide', function(e) {
                self.validateForm(this);
            })
        },

        reset: function(form) {
            form.removeAttr('data-invalid');
            $('[data-invalid]', form).removeAttr('data-invalid');
            $('[data-valid]', form).removeAttr('data-valid');
            $('.error', form).not('small').removeClass('error');
        },

        validate: function(element) {

            var isValid = this.check(element);

            if (isValid) {
                $(element).trigger('valid');
            } else {
                $(element).trigger('invalid');
            }

            if (this.settings.validateOnChange) {
                var form = $(element).closest('[data-abide]');
                this.validateForm(form[0]);
            }

            return isValid;
        },

        validateForm: function(form) {
            var valid = true;

            $(form).find('input, textarea, select').each(function(i, e) {
                if (typeof e.getAttribute('data-valid') !== 'string')
                    valid = false;
            });

            if (valid) {
                $(form).trigger('valid')
            } else {
                $(form).trigger('invalid');
            }
        },

        check: function(element) {

            var type = element.type;
            var shouldBeEqual = element.getAttribute('data-equalto');
            var required = typeof element.getAttribute('required') === 'string';
            var pattern = element.getAttribute('pattern') || '';
            var settings = this.settings;

            if (settings.patterns.hasOwnProperty(pattern) && pattern.length > 0) {
                pattern = settings.patterns[pattern];
            } else if (pattern.length > 0) {
                pattern = new RegExp(pattern);
            } else if (settings.patterns.hasOwnProperty(type)) {
                pattern = settings.patterns[type];
            } else {
                pattern = /.*/;
            }

            // Special cases
            // is_radio?
            if (type == 'radio') {
                return this.isValidRadio(element, required)
            } else if (type == 'checkbox') {
                return ($(element).is(':checked') || !required);
            } else {
                if (shouldBeEqual) {
                    var isEqual = this.isEqual(element);
                    return pattern.test(element.value) && isEqual;
                } else {
                    return pattern.test(element.value);
                }
            }
        },

        // Set data-status, apply styles
        onElementValid: function(e) {
            var label = $('label[for="' + this.getAttribute('id') + '"]');
            var settings = $(this).closest('[data-abide]').data('abide-init');

            $(this).attr('data-valid', '');
            $(this).removeAttr('data-invalid').parent().removeClass('error');
            if (label.length > 0 && settings.error_labels) label.removeClass('error');


            e.stopPropagation();
        },

        onElementInvalid: function(e) {
            var label = $('label[for="' + this.getAttribute('id') + '"]');
            var settings = $(this).closest('[data-abide]').data('abide-init');

            $(this).removeAttr('data-valid');
            $(this).attr('data-invalid', '').parent().addClass('error');
            if (label.length > 0 && settings.error_labels) label.addClass('error');

            e.stopPropagation();
        },

        isValidRadio: function(el, required) {
            var name = el.getAttribute('name'),
                group = document.getElementsByName(name),
                count = group.length,
                valid = false;

            for (var i = 0; i < count; i++) {
                if (group[i].checked) valid = true;
            }

            return valid;
        },

        isEqual: function(el, required) {
            var from = document.getElementById(el.getAttribute('data-equalto')).value,
                to = el.value,
                valid = (from === to);

            return valid;
        }
    };
}(jQuery, this, this.document));