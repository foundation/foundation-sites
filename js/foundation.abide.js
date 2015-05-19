!function(Foundation, $) {
  'use strict';

  /**
   * Creates a new instance of Abide.
   * @class
   * @fires Abide#init
   * @param {Object} element - jQuery object to add the trigger to.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  function Abide(element, options) {
    this.$element = element;
    this.options  = $.extend(Abide.defaults, options);
    this.$window  = $(window);
    this.name     = 'Abide';
    this.attr     = 'data-abide';

    this._init();
    this._events();

    /**
     * Fires when the plugin has been successfuly initialized.
     * @event Abide#init
     */
    this.$element.trigger('init.zf.abide');
  }

  /**
   * Default settings for plugin
   */
  Abide.defaults = {
    validateOn: 'fieldChange', // options: fieldChange, manual, submit
    labelErrorClass: 'is-invalid-label',
    inputErrorClass: 'is-invalid-input',
    patterns: {
      alpha : /^[a-zA-Z]+$/,
      alpha_numeric : /^[a-zA-Z0-9]+$/,
      integer : /^[-+]?\d+$/,
      number : /^[-+]?\d*(?:[\.\,]\d+)?$/,

      // amex, visa, diners
      card : /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
      cvv : /^([0-9]){3,4}$/,

      // http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#valid-e-mail-address
      email : /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,

      url : /^(https?|ftp|file|ssh):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/,
      // abc.de
      domain : /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,8}$/,

      datetime : /^([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))$/,
      // YYYY-MM-DD
      date : /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/,
      // HH:MM:SS
      time : /^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,
      dateISO : /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,
      // MM/DD/YYYY
      month_day_year : /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d{4}$/,
      // DD/MM/YYYY
      day_month_year : /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.]\d{4}$/,

      // #FFF or #FFFFFF
      color : /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
    },
    validators: {
      equalTo: function (el, required, parent) {
        var from  = document.getElementById(el.getAttribute(this.add_namespace('data-equalto'))).value,
            to    = el.value,
            valid = (from === to);

        return valid;
      }
    }
  };

  Abide.prototype = {
    /**
     * Initializes the Abide plugin and calls functions to get Abide functioning on load.
     * @private
     */
    _init: function() {
    },

    /**
     * Initializes events for Abide.
     * @private
     */
    _events: function() {
      var self = this;

      this.$element
        .off('.abide')
        .on('reset.fndtn.abide', function(e) {
          self.resetForm($(this));
        })
        .on('submit.fndtn.abide', function(e) {
          //self.validateWholeForm;
        })
        .find('input, textarea, select')
          .off('.abide')
          .on('blur.fndtn.abide change.fndtn.abide', function (e) {
            // console.log($(e.target));
            self.validateInput($(e.target), self.$element);
            // self.validateForm(self.$element);
          })
          .on('keydown.fndtn.abide', function (e) {
            // if (settings.live_validate === true && e.which != 9) {
            //   clearTimeout(self.timer);
            //   self.timer = setTimeout(function () {
            //     self.validate([this], e);
            //   }.bind(this), settings.timeout);
            // }
            // self.validateForm(self.$element);
          });

    },
    /**
     * Calls necessary functions to update Abide upon DOM change
     * @private
     */
    _reflow: function() {
      var self = this;

    },
    requiredCheck: function(el) {
      switch (el.type) {
        case 'text':
          if ($(el).attr('required') && !$(el).val()) {
            // requirement check does not pass
            return false;
          } else {
            return true;
          }
          break;
        case 'checkbox':
          if ($(el).attr('required') && !$(el).is(':checked')) {
            return false;
          } else {
            return true;
          }
          break;
        case 'radio':
          if ($(el).attr('required') && !$(el).is(':checked')) {
            return false;
          } else {
            return true;
          }
          break;
        default: 
          if ($(el).attr('required') && $(el).is(':empty')) {
            return false;
          } else {
            return true;
          }
      }
    },
    findLabel: function(el) {
      if ($(el).next('label').length) {
        return $(el).next('label');
      }
      else {
        return $(el).closest('label');
      }
    },
    addErrorClasses: function() {

    },
    removeErrorClasses: function() {

    },
    validateInput: function($el, $form) {
      var self = this,
          textInput = $form.find('input[type="text"]'),
          checkInput = $form.find('input[type="checkbox"]'),
          label,
          radioGroupName;

      // console.log($el);
      if ($el[0].type === 'text') {
        label = self.findLabel($el[0]);
        if (!self.requiredCheck($el[0]) || !self.validateText($el[0])) {
          label.addClass(self.options.labelErrorClass);
          $el.addClass(self.options.inputErrorClass);
          $el.next('.form-error').addClass('is-visible');
          $el.trigger('invalid.fndtn.abide', $el[0]);
        }
        else {
          if (label.hasClass(self.options.labelErrorClass)) {
            label.removeClass(self.options.labelErrorClass);
          }
          if ($el.next('.form-error').hasClass('is-visible')) {
            $el.next('.form-error').removeClass('is-visible');
          }
          if ($el.hasClass(self.options.inputErrorClass)) {
            $el.removeClass(self.options.inputErrorClass);
          }

        }
      }
      if ($el[0].type === 'radio') {
        radioGroupName = $el.attr('name');
        label = $el.siblings('label');

        if (self.validateRadio(radioGroupName)) {
          $(label).each(function() {
            if ($(this).hasClass(self.options.labelErrorClass)) {
              $(this).removeClass(self.options.labelErrorClass);
            }
          });

        }
        else {
          $(label).each(function() {
            $(this).addClass(self.options.labelErrorClass);
          });
          $el.trigger('invalid.fndtn.abide', $el[0]);
        };
      }
      if ($el[0].type === 'checkbox') {
        label = self.findLabel($el[0]);

        if (!self.requiredCheck($el[0])) {
          label.addClass(self.options.labelErrorClass);
          $el.addClass(self.options.inputErrorClass);
        }
        else {
          if (label.hasClass(self.options.labelErrorClass)) {
            label.removeClass(self.options.labelErrorClass);
          }
        }
      }

      if ($form.find('.form-error.is-visible').length || $form.find('.is-invalid-label').length) {
        $form.find('[data-abide-error]').css('display', 'block');  
      }        
      else {
        $form.find('[data-abide-error]').css('display', 'none');  
      }
    },
    validateForm: function($form) {
      var self = this,
          textInput = $form.find('input[type="text"]'),
          checkInput = $form.find('input[type="checkbox"]');

      var radioGroups = self.findRadioGroups($form);

      // obviously find a better way to do this
      $(textInput).each(function() {
        var label = self.findLabel($(this));
        // console.log(label);
        if (!self.requiredCheck(this) || !self.validateText(this)) {
          // possibly have a method that basically scours for error elements
          // and adds the appropriate error class to them
          label.addClass(self.options.labelErrorClass);
          $(this).addClass(self.options.inputErrorClass);
          $(this).next('.form-error').addClass('is-visible');
        }
        else {
          if (label.hasClass(self.options.labelErrorClass)) {
            label.removeClass(self.options.labelErrorClass);
          }
          if ($(this).next('.form-error').hasClass('is-visible')) {
            $(this).next('.form-error').removeClass('is-visible');
          }
          if ($(this).hasClass(self.options.inputErrorClass)) {
            $(this).removeClass(self.options.inputErrorClass);
          }
        }
      })
      $(checkInput).each(function() {
        var label = self.findLabel($(this));

        if (!self.requiredCheck(this)) {
          label.addClass(self.options.labelErrorClass);
          $(this).addClass(self.options.inputErrorClass);
          $form.attr('invalid', 'true');
        }
        else {
          if (label.hasClass(self.options.labelErrorClass)) {
            label.removeClass(self.options.labelErrorClass);
          }
        }
      })
      for (var group in radioGroups) {
        self.validateRadio(group);
      }
      // what are all the things that can go wrong with a form?!
      if ($form.find('.form-error.is-visible').length || $form.find('.is-invalid-label').length) {
        $form.find('[data-abide-error]').css('display', 'block');  
      }        
      else {
        $form.find('[data-abide-error]').css('display', 'none');  
      }
    },
    validateText: function(el) {
      var self = this,
          valid = false,
          patternLib = this.options.patterns,
          inputText = $(el).val(),
          // maybe have a different way of parsing this bc people might use type
          pattern = $(el).attr('pattern');

      // if there's no value, then return true
      // since required check has already been done
      if (inputText.length === 0) {
        return true;
      }
      else {
        if (inputText.match(patternLib[pattern])) {
          return true;
        }
        else {
          return false;
        } 
      }
    },
    validateRadio: function(group) {
      var self = this,
          labels = $(':radio[name="' + group + '"]').siblings('label'),
          counter = 0;
      // go through each radio button
      $(':radio[name="' + group + '"]').each(function() {
        // put them through the required checkpoint
        if (!self.requiredCheck(this)) {
          // if at least one doesn't pass, add a tally to the counter
          counter++;
        }
        // if at least one is checked
        // reset the counter
        if ($(this).is(':checked')) {
          counter = 0;
        }
      });

      if (counter > 0) {
        return false;
      }
      else {
        return true;
      }
    },
    // may not need this method?
    validateCheckbox: function(el) {
      var self = this;
      if ($(el).attr('disabled')) {
        return true;
      }
    },
    matchPattern: function(val, pattern) {

    },
    matchValidation: function(val, validation) {

    },
    findRadioGroups: function($form) {
      var self = this,
          radioGroups = {},
          radioSearch = $('input[type="radio"]', $form);

      radioSearch.each(function(){
        radioGroups[this.name] = $(':radio[name="'+this.name+'"]').length;
      });

      return radioGroups;
    },
    resetForm : function ($form) {
      var self = this;
      var invalidAttr = 'data-invalid';
      // remove data attributes
      $('[' + self.invalidAttr + ']', $form).removeAttr(invalidAttr);
      // remove styles
      $('.' + self.options.labelErrorClass, $form).not('small').removeClass(self.options.labelErrorClass);
      $('.' + self.options.inputErrorClass, $form).not('small').removeClass(self.options.inputErrorClass);
      $('.form-error.is-visible').removeClass('is-visible');
      $form.find('[data-abide-error]').css('display', 'none');  
      $(':input', $form).not(':button, :submit, :reset, :hidden, [data-abide-ignore]').val('').removeAttr(invalidAttr);
    }

  };

  Foundation.plugin('abide', Abide);

  // Exports for AMD/Browserify
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Abide;
  if (typeof define === 'function')
    define(['foundation'], function() {
      return Abide;
    });

}(Foundation, jQuery);