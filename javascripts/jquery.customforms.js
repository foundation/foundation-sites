/*
 * jQuery Custom Forms Plugin 1.0
 * www.ZURB.com
 * Copyright 2010, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

jQuery(document).ready(function ($) {
  
  function appendCustomMarkup(type) {
    $('form.custom input:' + type).each(function () {

      var $this = $(this).hide(),
          $span = $this.next('span.custom.' + type);

      if ($span.length === 0) {
        $span = $('<span class="custom ' + type + '"></span>').insertAfter($this);
      }

      $span.toggleClass('checked', $this.is(':checked'));
    });
  }
  appendCustomMarkup('checkbox');
  appendCustomMarkup('radio');
  
  $('form.custom select').each(function () {
    var $this = $(this),
        $customSelect = $this.next('div.custom.dropdown'),
        $options = $this.find('option'),
        maxWidth = 0,
        $li;
    
    if ($customSelect.length === 0) {      
      $customSelect = $('<div class="custom dropdown"><a href="#" class="selector"></a><ul></ul></div>"');
      $options.each(function () {
        $li = $('<li>' + $(this).html() + '</li>');
        $customSelect.find('ul').append($li);
      });
      $customSelect.prepend('<a href="#" class="current">' + $options.first().html() + '</a>');
      
      $this.after($customSelect);
      $this.hide();
    }
    
    $options.each(function (index) {
      if (this.selected) {
        $customSelect.find('li').eq(index).addClass('selected');
        $customSelect.find('.current').html($(this).html());
      }
    });
    
    $customSelect.find('li').each(function () {
      $customSelect.addClass('open');
      if ($(this).outerWidth() > maxWidth) {
        maxWidth = $(this).outerWidth();
      }
      $customSelect.removeClass('open');
    });
    $customSelect.css('width', maxWidth + 18 + 'px');
    $customSelect.find('ul').css('width', maxWidth + 16 + 'px');
  });
});

(function ($) {
  
  function toggleCheckbox($element) {
    var $input = $element.prev(),
        input = $input[0];

    input.checked = ((input.checked) ? false : true);
    $element.toggleClass('checked');
    
    $input.trigger('change');
  }
  
  function toggleRadio($element) {
    var $input = $element.prev(),
        input = $input[0];

    $('input:radio[name="' + $input.attr('name') + '"]').each(function () {
      $(this).next().removeClass('checked');
    });
    input.checked = ((input.checked) ? false : true);
    $element.toggleClass('checked');
    
    $input.trigger('change');
  }
  
  $(document).on('click', 'form.custom span.custom.checkbox', function (event) {
    event.preventDefault();
    event.stopPropagation();
    
    toggleCheckbox($(this));
  });
  
  $(document).on('click', 'form.custom span.custom.radio', function (event) {
    event.preventDefault();
    event.stopPropagation();
    
    toggleRadio($(this));
  });
  
  $(document).on('click', 'form.custom label', function (event) {
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

  $(document).on('click', 'form.custom div.custom.dropdown a.current, form.custom div.custom.dropdown a.selector', function (event) {
    var $this = $(this),
        $dropdown = $this.closest('div.custom.dropdown');
    
    event.preventDefault();
    $dropdown.toggleClass('open');
    
    if ($dropdown.hasClass('open')) {
      $(document).bind('click.customdropdown', function (event) {
        $dropdown.removeClass('open');
        $(document).unbind('.customdropdown');
      });
    } else {
      $(document).unbind('.customdropdown');
    }
  });
  
  $(document).on('click', 'form.custom div.custom.dropdown li', function (event) {
    var $this = $(this),
        $customDropdown = $this.closest('div.custom.dropdown'),
        $select = $customDropdown.prev(),
        selectedIndex = 0;
        
    event.preventDefault();
    event.stopPropagation();
    
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
