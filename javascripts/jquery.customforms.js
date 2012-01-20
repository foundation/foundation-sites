/*
 * jQuery Custom Forms Plugin 1.0
 * www.ZURB.com
 * Copyright 2010, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

(function ($) {

  function appendCustomMarkup(type) {
    $('form.custom input:' + type).each(function () {

      var $this = $(this).hide(),
          $span = $this.next('span.custom.' + type);

      if ($span.length === 0) {
        $span = $('<span class="custom ' + type + '"></span>').insertAfter($this);
      }

      $span.toggleClass('checked', $this.is(':checked'))
        .toggleClass('disabled', $this.is(':disabled'));
    });
  }

  function refreshCustomSelect($select, append) {
    var $customSelect = $select.next(append ? 'div.custom.dropdown' : ''),
        $options = $select.find('option'),
        maxWidth = 0,
        outerWidth,
        li = '',
        $ul,
        html;

    if (append && $customSelect.length === 0) {
      $customSelect = $('<div class="custom dropdown"><a href="#" class="selector"></a><ul></ul></div>"');
      $customSelect.prepend('<a href="#" class="current">' + $options.first().html() + '</a>');

      $select.hide().after($customSelect);

      $ul = $customSelect.find('ul');
    } else {
      $ul = $customSelect.find('ul').html('');
      $customSelect.removeAttr('style');
      $ul.removeAttr('style');  
    }

    if (append) {
      $customSelect.toggleClass('disabled', $select.is(':disabled'));
    }

    $options.each(function () {
      html = $(this).html();
      li += '<li';
      if (this.selected) {
        li += ' class="selected"';
        $customSelect.find('.current').html(html);
      }
      li += '>' + html + '</li>';
    });
    $ul.append(li);

    // fix width
    $customSelect.find('li').each(function () {
      $customSelect.addClass('open');
      outerWidth = $(this).outerWidth();
      if (outerWidth > maxWidth) {
        maxWidth = outerWidth;
      }
      $customSelect.removeClass('open');
    });
    $customSelect.css('width', maxWidth + 18 + 'px');
    $ul.css('width', maxWidth + 16 + 'px');

  }

  $(function () {

    appendCustomMarkup('checkbox');
    appendCustomMarkup('radio');

    $('form.custom select').each(function () {
      refreshCustomSelect($(this), true);
    });

  });

  function toggleCheckbox($element) {
    var $input = $element.prev(),
        input = $input[0];

    if (!$input.is(':disabled')) {
        input.checked = ((input.checked) ? false : true);
        $element.toggleClass('checked');

        $input.trigger('change');
    }
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
    var $this = $(this),
        $associatedElement = $('#' + $this.attr('for')),
        spanSelector = 'span.custom.',
        type;
    if ($associatedElement.length !== 0) {
      type = $associatedElement.attr('type');
      if (type === 'checkbox') {
        event.preventDefault();
        toggleCheckbox($this.find(spanSelector + type));
      } else if (type === 'radio') {
        event.preventDefault();
        toggleRadio($this.find(spanSelector + type));
      }
    }
  });

  $('form.custom div.custom.dropdown a.current, form.custom div.custom.dropdown a.selector').live('click', function (event) {
    var $this = $(this),
        $dropdown = $this.closest('div.custom.dropdown'),
        $select = $dropdown.prev(),
        $document = $(document);
    
    event.preventDefault();
    
    if (!$select.is(':disabled')) {
        $dropdown.toggleClass('open');
        if ($dropdown.hasClass('open')) {
          $document.bind('click.customdropdown', function (event) {
            $dropdown.removeClass('open');
            $document.unbind('.customdropdown');
          });
        } else {
          $document.unbind('.customdropdown');
        }
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