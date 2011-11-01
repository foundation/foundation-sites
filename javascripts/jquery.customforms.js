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
      var $span = $('<span class="custom ' + type + '"></span>');
      if ($(this).next('span.custom.' + type).length === 0) {
        if (this.checked) {
          $span.addClass('checked');
        }
        $(this)
          .hide()
          .after($span);
      }
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

    $('input:radio[name=' + $input.attr('name') + ']').each(function () {
      $(this).next().removeClass('checked');
    });
    input.checked = ((input.checked) ? false : true);
    $element.toggleClass('checked');
    
    $input.trigger('change');
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
  
  $('form.custom div.custom.dropdown li').live('click', function (event) {
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