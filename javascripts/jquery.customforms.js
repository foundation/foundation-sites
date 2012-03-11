/*
 * jQuery Custom Forms Plugin 1.0
 * www.ZURB.com
 * Copyright 2010, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

(function ($) {

  var $currentDropdown,
      currentPosition = 0,
      focus,
      $document = $(document),
      ownEvent = 'foundation',
      maxVisibleOptions = 10;

  function appendCustomMarkup(type) {
    $('form.custom input:' + type).each(function () {

      var $this = $(this).addClass('customized').removeAttr('style'),
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
        html,
        $li,
        customSelectSize = '';

    if (append && $customSelect.length === 0) {
      if ($select.hasClass('small')) {
        customSelectSize = 'small';
      } else if ($select.hasClass('medium')) {
        customSelectSize = 'medium';
      } else if ($select.hasClass('large')) {
        customSelectSize = 'large';
      } else if ($select.hasClass('expand')) {
        customSelectSize = 'expand';
      }

      $customSelect = $('<div class="custom dropdown ' + customSelectSize + '"><span class="selector"></span><ul></ul></div>"')
        .prepend('<span class="current">' + $options.first().html() + '</span>');

      $select.after($customSelect);
      $ul = $customSelect.find('ul');
    } else {
      $customSelect.removeAttr('style');
      $ul = $customSelect.find('ul')
        .html('').removeAttr('style');  
    }

    if (append) {
      $customSelect.toggleClass('disabled', $select.is(':disabled'));
      $select.addClass('customized').removeAttr('style');
    }

    $options.each(function () {
      html = $(this).html() || '&nbsp;';
      li += '<li';
      if (this.selected) {
        li += ' class="selected"';
        $customSelect.find('.current').html(html);
      }
      li += '>' + html + '</li>';
    });
    $ul.append(li);

    $li = $customSelect.find('li');

    // fix width
    $li.each(function () {
      $customSelect.addClass('open');
      outerWidth = $(this).outerWidth();
      if (outerWidth > maxWidth) {
        maxWidth = outerWidth;
      }
      $customSelect.removeClass('open');
    });

    if (!$customSelect.is('.small, .medium, .large, .expand')) {
      $customSelect.css('width', maxWidth + 18 + 'px');
      $customSelect.find('ul').css('width', maxWidth + 16 + 'px');
    }

    if ($li.length > maxVisibleOptions) {
      $customSelect.addClass('open');
      $ul.css('height', $li.first().outerHeight() * maxVisibleOptions + 'px');
      $customSelect.removeClass('open');
    }
  }

  $document.ready(function () {

    appendCustomMarkup('checkbox');
    appendCustomMarkup('radio');

    $('form.custom select').each(function () {
      refreshCustomSelect($(this), true);
    });

  });

  function toggleCheckbox($input, $element) {
    var input = $input[0];
    $element = $element || $input.next();
    if (!$input.is(':disabled')) {
      input.checked = !input.checked;
      $element.toggleClass('checked', input.checked);
      $input.trigger('change', [ownEvent]);
    }
  }
  
  function toggleRadio($input, $element, trigger) {
    var input = $input[0];
    $element = $element || $input.next();

    if (!$input.is(':disabled')) {
      $('input:radio[name="' + $input.attr('name') + '"]').each(function () {
        $(this).next().removeClass('checked');
      });
      input.checked = true;
      $element.toggleClass('checked', input.checked);
      if (trigger) {
        $input.trigger('change', [ownEvent]);
      }
    }
  }
  
  $('form.custom span.custom.checkbox').live('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    
    toggleCheckbox($(this).prev(), $(this));
  });
  
  $('form.custom span.custom.radio').live('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    
    toggleRadio($(this).prev(), $(this), true);
  });

  $('form.custom input[type=checkbox]').live('keydown', function (event, own) {
    if(event.keyCode == 32) {
      event.preventDefault();
      event.stopPropagation();
    
      toggleCheckbox($(this));
    }
  });

  $('form.custom input[type=radio]').live('keyup', function (event) {
    if(event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40) {
      event.preventDefault();
      event.stopPropagation();
    
      toggleRadio($(this));
    }
  });

  $('form.custom select').live('change', function (event, own) {
    if (own !== ownEvent) {
      refreshCustomSelect($(this));
    }
  });

  $('form.custom label').live('click', function (event) {
    var $this = $(this),
        $associatedElement = $this.find('input'),
        type;
    if ($associatedElement.length !== 1) {
      $associatedElement = $('.customized#' + $this.attr('for'));
    }
    if ($associatedElement.length !== 0) {
      type = $associatedElement.attr('type');
      if (type === 'checkbox') {
        event.preventDefault();
        event.stopPropagation();
    
        toggleCheckbox($associatedElement);
      } else if (type === 'radio') {
        event.preventDefault();
        event.stopPropagation();

        toggleRadio($associatedElement, undefined, event.clientX !== 0 || event.clientY !== 0);
      }
    }
  });

  function dropdownChange ($dropdown, selected) {
    $currentDropdown = $dropdown;
    if ($currentDropdown) {
      currentPosition = $currentDropdown.prev()[0].selectedIndex;
      if (selected) {
        var $currentLi = $currentDropdown.find('li')
              .removeClass('selected hover')
              .eq(currentPosition).addClass('selected');

          if (currentPosition > maxVisibleOptions - 1) {
            $currentDropdown.find('ul').scrollTop(currentPosition * $currentLi.outerHeight());
          }
      }  
    }
  }

  function changeFocus(target, focused) {
    var $input = $(target).next().toggleClass('focus', focused);
    if (target.nodeName.toLowerCase() == 'select') {
      dropdownChange(focused && $input);
      focus = focused;
    }
  }

  $('form.custom .customized').live('focus', function (event) {
    changeFocus(this, true);
  });

  $('form.custom .customized').live('blur', function (event) {
    changeFocus(this, false);
  });

  $document.bind('keydown', function (event) {
    if ($currentDropdown) {
      if (event.keyCode == 9) { //tab
        $document.trigger('click.customdropdown');
      }
    }
  });

  $document.bind('keyup', function (event) {
    if ($currentDropdown) {
      currentPosition = event.target.selectedIndex;

      var $li = $currentDropdown.find('li'),
          $currentLi = $li.eq(currentPosition),
          keyCode = event.keyCode,
          $select = $(event.target);

      $currentDropdown.find('.current')
        .html($currentLi.html());

      if ($currentDropdown.hasClass('open')) {

        if (keyCode == 13 || keyCode == 27) { //return & escape
          $currentDropdown.removeClass('open');
          $document.unbind('.customdropdown');
          $select.trigger('change', [ownEvent]);
          return true;
        }

        $li.removeClass('selected hover');
        $currentLi.addClass('selected hover');

        if ($li.length > maxVisibleOptions) {
          $currentDropdown.find('ul').scrollTop(currentPosition * $currentLi.outerHeight());
        }
      }
    }
  });

  $('form.custom div.custom.dropdown .current, form.custom div.custom.dropdown .selector').live('click', function (event) {
    var $this = $(this),
        $dropdown = $this.closest('div.custom.dropdown'),
        $select = $dropdown.prev();
    
    event.preventDefault();
    event.stopPropagation();
    
    if (!$select.is(':disabled')) {
        if (!$dropdown.hasClass('open')) {
          $document.trigger('click.customdropdown');
        }
        $dropdown.toggleClass('open');
        if(!$select.is(':focus')) {
          $select.focus();
        }
        if ($dropdown.hasClass('open')) {
          $document.bind('click.customdropdown', function (event) {
            $dropdown.removeClass('open');
            dropdownChange();
            $document.unbind('.customdropdown');
          });
          dropdownChange($dropdown, true);
        } else {
          dropdownChange();
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
    $document.unbind('.customdropdown');

    $this
      .closest('ul')
      .find('li')
      .removeClass('selected hover');
    $this.addClass('selected');
    
    $customDropdown
      .removeClass('open')
      .find('.current')
      .html($this.html());
    
    $this.closest('ul').find('li').each(function (index) {
      if ($this[0] == this) {
        selectedIndex = index;
      }
      
    });
    $select[0].selectedIndex = selectedIndex;
    $select.trigger('change', [ownEvent]);
  });

  $('form.custom div.custom.dropdown').live('mousedown', function (event) {
    event.preventDefault();
    event.stopPropagation();
  });

})(jQuery);