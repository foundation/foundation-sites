/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.forms = {
    name : 'forms',

    version : '4.0.0.alpha',

    settings : {
      disable_class: 'no-custom'
    },

    init : function (scope, method, options) {
      this.scope = scope || this.scope;

      if (typeof method === 'object') {
        $.extend(true, this.settings, method);
      }

      if (typeof method != 'string') {
        if (!this.settings.init) {
          this.events();
          $('form.custom input:radio[data-customforms!=disabled]')
            .each(this.append_custom_markup);
          $('form.custom input:checkbox[data-customforms!=disabled]')
            .each(this.append_custom_markup);
          $('form.custom select[data-customforms!=disabled]')
            .each(this.append_custom_select);
        }

        return this.settings.init;
      } else {
        return this[method].call(this, options);
      }
    },

    events : function () {
      var self = this;



      this.settings.init = true;
    },

    append_custom_markup : function (idx, sel) {
      var $this = $(sel).hide(),
          type  = $this.attr('type'),
          $span = $this.next('span.custom.' + type);

      if ($span.length === 0) {
        $span = $('<span class="custom ' + type + '"></span>').insertAfter($this);
      }

      $span.toggleClass('checked', $this.is(':checked'));
      $span.toggleClass('disabled', $this.is(':disabled'));
    },

    append_custom_select : function (idx, sel) {
      var hiddenFixObj = $.foundation.utils.hiddenFix(),
          $this = $( sel ),
          $customSelect = $this.next( 'div.custom.dropdown' ),
          $customList = $customSelect.find( 'ul' ),
          $selectCurrent = $customSelect.find( ".current" ),
          $selector = $customSelect.find( ".selector" ),
          $options = $this.find( 'option' ),
          $selectedOption = $options.filter( ':selected' ),
          maxWidth = 0,
          liHtml = '',
          $listItems,
          $currentSelect = false;

      if ($this.hasClass(this.settings.disable_class)) return;

      if ($customSelect.length === 0) {
        var customSelectSize = $this.hasClass( 'small' )   ? 'small'   :
                               $this.hasClass( 'medium' )  ? 'medium'  :
                               $this.hasClass( 'large' )   ? 'large'   :
                               $this.hasClass( 'expand' )  ? 'expand'  : '';

        $customSelect = $('<div class="' + ['custom', 'dropdown', customSelectSize ].join( ' ' ) + '"><a href="#" class="selector"></a><ul /></div>');
        $selector = $customSelect.find(".selector");
        $customList = $customSelect.find("ul");
        liHtml = $options.map(function() { return "<li>" + $( this ).html() + "</li>"; } ).get().join( '' );
        $customList.append(liHtml);
        $currentSelect = $customSelect.prepend('<a href="#" class="current">' + $selectedOption.html() + '</a>' ).find( ".current" );
        $this
          .after( $customSelect )
          .hide();

      } else {
        liHtml = $options.map(function() { 
            return "<li>" + $( this ).html() + "</li>";
          });
          .get().join('');
        $customList
          .html('')
          .append(liHtml);

      } // endif $customSelect.length === 0

      $customSelect.toggleClass('disabled', $this.is( ':disabled' ) );
      $listItems = $customList.find( 'li' );

      $options.each( function ( index ) {
        if ( this.selected ) {
          $listItems.eq( index ).addClass( 'selected' );

          if ($currentSelect) {
            $currentSelect.html( $( this ).html() );
          }

        }
        if ($(this).is(':disabled')) {
          $listItems.eq( index ).addClass( 'disabled' );
        }
      });

      //
      // If we're not specifying a predetermined form size.
      //
      if (!$customSelect.is('.small, .medium, .large, .expand')) {

        // ------------------------------------------------------------------------------------
        // This is a work-around for when elements are contained within hidden parents.
        // For example, when custom-form elements are inside of a hidden reveal modal.
        //
        // We need to display the current custom list element as well as hidden parent elements
        // in order to properly calculate the list item element's width property.
        // -------------------------------------------------------------------------------------

        $customSelect.addClass( 'open' );
        //
        // Quickly, display all parent elements.
        // This should help us calcualate the width of the list item's within the drop down.
        //
        hiddenFixObj.adjust( $customList );

        maxWidth = ( $listItems.outerWidth() > maxWidth ) ? $listItems.outerWidth() : maxWidth;

        hiddenFixObj.reset();

        $customSelect.removeClass( 'open' );

      } // endif

    },

    refresh_custom_select : function ($select) {
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
      if ($(this).is(':disabled')) {
            $customSelect.find('li').eq(index).addClass('disabled');
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
    },

    toggle_checkbox : function ($element) {
      var $input = $element.prev(),
          input = $input[0];

      if (false === $input.is(':disabled')) {
        input.checked = ((input.checked) ? false : true);
        $element.toggleClass('checked');

        $input.trigger('change');
      }
    },

    toggle_radio : function ($element) {
      var $input = $element.prev(),
          $form = $input.closest('form.custom'),
          input = $input[0];

      if (false === $input.is(':disabled')) {
        $form.find('input:radio[name="' + $input.attr('name') + '"]').next().not($element).removeClass('checked');
        if ( !$element.hasClass('checked') ) {
          $element.toggleClass('checked');
        }
        input.checked = $element.hasClass('checked');

        $input.trigger('change');
      }
    },

    off : function () {
      $(this.scope).off('.fndtn.alerts');
    }
  };
}(Foundation.zj, this, this.document));