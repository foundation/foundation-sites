/*
 * jQuery Custom Forms Plugin 1.0
 * www.ZURB.com
 * Copyright 2010, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

jQuery.foundation = jQuery.foundation || {};
jQuery.foundation.customForms = jQuery.foundation.customForms || {};

jQuery(document).ready(function ($) {
    
  $.foundation.customForms.appendCustomMarkup = function (options) {
    var defaults = {
      disable_class: "js-disable-custom"
    };
    var options = $.extend(defaults, options);
    
    function appendCustomMarkup(idx, sel) {
      var $this = $(sel).hide(),
          type  = $this.attr('type'),
          $span = $this.next('span.custom.' + type);

      if ($span.length === 0) {
        $span = $('<span class="custom ' + type + '"></span>').insertAfter($this);
      }

      $span.toggleClass('checked', $this.is(':checked'));
      $span.toggleClass('disabled', $this.is(':disabled'));
    }

    function appendCustomSelect(idx, sel) {
      var $this = $(sel),
          $customSelect = $this.next('div.custom.dropdown'),
          $options = $this.find('option'),
          $seloptions = $this.find('option:selected'),
          maxWidth = 0,
          $li;

      if ($this.hasClass('no-custom')) { return; }
      if ($customSelect.length === 0) {
        $customSelectSize = '';
        if ($(sel).hasClass('small')) {
          $customSelectSize = 'small';
        } else if ($(sel).hasClass('medium')) {
          $customSelectSize = 'medium';
        } else if ($(sel).hasClass('large')) {
          $customSelectSize = 'large';
        } else if ($(sel).hasClass('expand')) {
          $customSelectSize = 'expand';
        }
        $customSelect = $('<div class="custom dropdown ' + $customSelectSize + '"><a href="#" class="selector"></a><ul></ul></div>"');
        $options.each(function () {
          $li = $('<li>' + $(this).html() + '</li>');
          $customSelect.find('ul').append($li);
        });
        $customSelect.prepend('<a href="#" class="current">' + $seloptions.html() + '</a>');

        $this.after($customSelect);
        $this.hide();

      } else {
        // refresh the ul with options from the select in case the supplied markup doesn't match
        $customSelect.find('ul').html('');
        $options.each(function () {
          $li = $('<li>' + $(this).html() + '</li>');
          $customSelect.find('ul').append($li);
        });
      }

      $customSelect.toggleClass('disabled', $this.is(':disabled'));

      $options.each(function (index) {
        if (this.selected) {
          $customSelect.find('li').eq(index).addClass('selected');
          $customSelect.find('.current').html($(this).html());
        }
      });

      $customSelect.css('width', 'inherit');
      $customSelect.find('ul').css('width', 'inherit');

      $customSelect.find('li').each(function () {
        $customSelect.addClass('open');
        if ($(this).outerWidth() > maxWidth) {
          maxWidth = $(this).outerWidth();
        }
        $customSelect.removeClass('open');
      });

      if (!$customSelect.is('.small, .medium, .large, .expand')) {
        $customSelect.css('width', maxWidth + 18 + 'px');
        $customSelect.find('ul').css('width', maxWidth + 16 + 'px');
      }

    }
    
    $('form.custom input:radio[data-customforms!=disabled]').each(appendCustomMarkup);
    $('form.custom input:checkbox[data-customforms!=disabled]').each(appendCustomMarkup);
    $('form.custom select[data-customforms!=disabled]').each(appendCustomSelect);
  };

});

(function ($) {
  
  function refreshCustomSelect($select) {
    var maxWidth = 0,
        $customSelect = $select.next();
    $options = $select.find('option');
    $customSelect.find('ul').html('');
    
    $options.each(function () {
      $li = $('<li>' + $(this).html() + '</li>');
      $customSelect.find('ul').append($li);
    });
    
    // re-populate
    $options.each(function (index) {
      if (this.selected) {
        $customSelect.find('li').eq(index).addClass('selected');
        $customSelect.find('.current').html($(this).html());
      }
    });
    
    // fix width
    $customSelect.removeAttr('style')
      .find('ul').removeAttr('style');
    $customSelect.find('li').each(function () {
      $customSelect.addClass('open');
      if ($(this).outerWidth() > maxWidth) {
        maxWidth = $(this).outerWidth();
      }
      $customSelect.removeClass('open');
    });
    $customSelect.css('width', maxWidth + 18 + 'px');
    $customSelect.find('ul').css('width', maxWidth + 16 + 'px');
    
  }
  
  function toggleCheckbox($element) {
    var $input = $element.prev(),
        input = $input[0];

    if (false == $input.is(':disabled')) {
        input.checked = ((input.checked) ? false : true);
        $element.toggleClass('checked');

        $input.trigger('change');
    }
  }
  
  function toggleRadio($element) {
    var $input = $element.prev(),
        input = $input[0];

    if (false == $input.is(':disabled')) {
      $('input:radio[name="' + $input.attr('name') + '"]').each(function () {
        $(this).next().removeClass('checked');
      });
      input.checked = ((input.checked) ? false : true);
      $element.toggleClass('checked');
    
      $input.trigger('change');
    }
  }
  
  $('form.custom span.custom.checkbox').live('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    
    toggleCheckbox($(this));
  });
  
  $('form.custom span.custom.radio').live('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    
    toggleRadio($(this));
  });
  
  $('form.custom select').live('change', function (event) {
    refreshCustomSelect($(this));
  });
  
  $('form.custom label').live('click', function (event) {
    var $associatedElement = $('#' + $(this).attr('for')),
        $customCheckbox,
        $customRadio;
    if ($associatedElement.length !== 0) {
      if ($associatedElement.attr('type') === 'checkbox') {
        event.preventDefault();
        $customCheckbox = $(this).find('span.custom.checkbox');
        toggleCheckbox($customCheckbox);
      } else if ($associatedElement.attr('type') === 'radio') {
        event.preventDefault();
        $customRadio = $(this).find('span.custom.radio');
        toggleRadio($customRadio);
      }
    }
  });

  $('form.custom div.custom.dropdown a.current, form.custom div.custom.dropdown a.selector').live('click', function (event) {
    var $this = $(this),
        $dropdown = $this.closest('div.custom.dropdown'),
        $select = $dropdown.prev();
    
    event.preventDefault();
    $('div.dropdown').removeClass('open');

    if (false == $select.is(':disabled')) {
        $dropdown.toggleClass('open');

        if ($dropdown.hasClass('open')) {
          $(document).bind('click.customdropdown', function (event) {
            $dropdown.removeClass('open');
            $(document).unbind('.customdropdown');
          });
        } else {
          $(document).unbind('.customdropdown');
        }
        return false;
    }
  });
  
  $('form.custom div.custom.dropdown li').live('click', function (event) {
    var $this = $(this),
        $customDropdown = $this.closest('div.custom.dropdown'),
        $select = $customDropdown.prev(),
        selectedIndex = 0;
        
    event.preventDefault();
    event.stopPropagation();
    $('div.dropdown').removeClass('open');
    
    $this
      .closest('ul')
      .find('li')
      .removeClass('selected');
    $this.addClass('selected');
    
    $customDropdown
      .removeClass('open')
      .find('a.current')
      .html($this.html());
    
    $this.closest('ul').find('li').each(function (index) {
      if ($this[0] == this) {
        selectedIndex = index;
      }
      
    });
    $select[0].selectedIndex = selectedIndex;
    
    $select.trigger('change');
  });
})(jQuery);