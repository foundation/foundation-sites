/*
 * jQuery Foundation Top Bar 2.0
 * http://foundation.zurb.com
 * Copyright 2012, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, undefined) {
  'use strict';

  var settings = {
      index : 0,
      breakPoint : 1085,
      initialized : false
    },
    methods = {
      init : function (options) {
        return this.each(function () {
          settings = $.extend(settings, options);
          settings.$w = $(window);
          
          $('.top-bar .toggle-nav').live('click.fndtn', function (e) {
            e.preventDefault();
            
            var $this = $(this),
                $topbar = $this.closest('.top-bar');

            if (methods.breakpoint()) {

              if (!settings.initialized) {
                methods.assemble($topbar);
                settings.initialized = true;
              }

              $topbar.toggleClass('expanded');
            }
          });

          // Show the Dropdown Levels on Click
          $('.top-bar .has-dropdown>a').live('click.fndtn', function (e) {
            e.preventDefault();

            if (methods.breakpoint()) {
              var $this = $(this),
                  $selectedLi = $this.closest('li'),
                  $nextLevelUl = $selectedLi.children('ul'),
                  $section = $this.closest('section'),
                  $topbar = $this.closest('.top-bar'),
                  $currentUlPadding = parseInt($selectedLi.find('>ul.dropdown').css('padding-top')) + parseInt($selectedLi.find('>ul.dropdown').css('padding-bottom')),
                  $nextLevelUlHeight = 0;

              settings.index += 1;
              $selectedLi.addClass('moved');
              $section.css({'left': -(100 * settings.index) + '%'});
              $section.find('>.name').css({'left': 100 * settings.index + '%'}); 

              $selectedLi.find('>ul.dropdown>li').each(function () {
                $nextLevelUlHeight += $(this).outerHeight();
              });

              $section.css({'height': $nextLevelUlHeight + $topbar.find('>ul').outerHeight() + $currentUlPadding + 'px'});

              if (settings.index > 1) {
                $section.css({'height': $nextLevelUlHeight + $topbar.find('>ul').outerHeight() + $currentUlPadding + 'px'});
              }
            }
          });

          // Go up a level on Click
          $('.top-bar .has-dropdown .back').live('click.fndtn', function (e) {
            e.preventDefault();

            var $this = $(this),
              $movedLi = $this.closest('li.moved'),
              $section = $this.closest('section'),
              $topbar = $this.closest('.top-bar'),
              $previousLevelUl = $movedLi.parent(),
              $currentUlPadding = parseInt($movedLi.find('>ul.dropdown').css('padding-top')) + parseInt($movedLi.find('>ul.dropdown').css('padding-bottom')),
              $previousLevelUlHeight = 0;
            
            settings.index -= 1;
            $section.css({'left': -(100 * settings.index) + '%'});
            $section.find('>.name').css({'left': 100 * settings.index + '%'});

            $previousLevelUl.siblings('li').each(function () {
              $previousLevelUlHeight += $(this).outerHeight();
            });
            
            if (settings.index === 0) {
              $section.css({'height': ''});
            }

            if (settings.index > 0) {
              $section.css({'height': $previousLevelUl.outerHeight() + $topbar.find('>ul').outerHeight() + $currentUlPadding + 'px'});
            }
            
            setTimeout(function () {
              $movedLi.removeClass('moved');
            }, 300);
          });

        });
      },
      breakpoint : function () {
        return settings.$w.width() < settings.breakPoint;
      },
      assemble : function ($topbar) {
        var $section = $topbar.children('section');
      
        // Pull element out of the DOM for manipulation
        $section.detach();
        
        $section.find('.has-dropdown>a').each(function () {
          var $link = $(this),
              $dropdown = $link.siblings('.dropdown'),
              $titleLi = $('<li class="title back js-generated"><h5><a href="#"></a></h5></li>');
          
          // Copy link to subnav
          $titleLi.find('h5>a').html($link.html());
          $dropdown.prepend($titleLi);
        });
        
        // Put element back in the DOM
        $section.appendTo($topbar);
      }
    };

  $.fn.foundationTopBar = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' +  method + ' does not exist on jQuery.foundationTopBar');
    }
  };
}(jQuery, this));