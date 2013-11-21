var components = [
  { value: 'CSS', data: 'css.html' },
  { value: 'Styles', data: 'css.html' },

  { value: 'Sass', data: 'sass.html' },
  { value: 'SCSS', data: 'sass.html' },

  { value: 'Applications', data: 'applications.html' },
  { value: 'Rails', data: 'applications.html' },
  { value: 'Gem', data: 'applications.html' },

  { value: 'Global Styles', data: 'global.html' },
  { value: 'Global Mixins', data: 'global.html' },
  { value: 'Global Variables', data: 'global.html' },
  { value: 'Useful HTML Classes', data: 'global.html' },

  { value: 'Upgrading', data: 'upgrading.html' },
  { value: 'Migration', data: 'upgrading.html' },

  { value: 'Media Queries', data: 'media-queries.html' },
  { value: 'Breakpoints', data: 'media-queries.html' },

  { value: 'Grid', data: 'grid.html' },
  { value: 'Block Grid', data: 'block_grid.html' },
  { value: 'Thumbnails', data: 'thumbnails.html' },
  { value: 'Images', data: 'thumbnails.html'},
  { value: 'Utility Classes', data: 'utility-classes.html' },
  { value: 'Right-to-Left Support', data: 'rtl.html' },
  { value: 'Offcanvas', data: 'offcanvas.html' },

  { value: 'Top Bar', data: 'topbar.html' },
  { value: 'Nav Bar', data: 'topbar.html' },
  { value: 'Navigation', data: 'topbar.html' },
  { value: 'Sticky', data: 'topbar.html' },

  { value: 'Side Nav', data: 'sidenav.html' },

  { value: 'Magellan', data: 'magellan.html' },
  { value: 'scrollspy', data: 'magellan.html' },

  { value: 'Sub Nav', data: 'subnav.html' },

  { value: 'Breadcrumbs', data: 'breadcrumbs.html' },
  { value: 'Navigation Path', data: 'breadcrumbs.html' },
  { value: 'Cookie crumb', data: 'breadcrumbs.html' },

  { value: 'Pagination', data: 'pagination.html' },

  { value: 'Orbit Slider', data: 'orbit.html' },
  { value: 'Carousel', data: 'orbit.html' },
  { value: 'Slider', data: 'orbit.html' },
  { value: 'Slideshow', data: 'orbit.html' },

  { value: 'Clearing Lightbox', data: 'clearing.html' },
  { value: 'Responsive Lightbox', data: 'clearing.html' },
  { value: 'Lightbox', data: 'clearing.html' },

  { value: 'Interchange Responsive Content', data: 'interchange.html' },

  { value: 'Flex Video', data: 'flex_video.html' },
  { value: 'Responsive Video', data: 'flex_video.html' },

  { value: 'Forms', data: 'forms.html' },

  { value: 'Abide Validation', data: 'abide.html' },
  { value: 'Form Validation', data: 'abide.html' },
  { value: 'Field Validation', data: 'abide.html' },

  { value: 'Buttons', data: 'buttons.html' },
  { value: 'Button Groups', data: 'button_groups.html' },
  { value: 'Button Bar', data: 'button_groups.html' },
  { value: 'Split Buttons', data: 'split_buttons.html' },
  { value: 'Dropdown Buttons', data: 'dropdown_buttons.html' },

  { value: 'Type', data: 'typography.html' },
  { value: 'Typography', data: 'typography.html' },
  { value: 'Type-setting', data: 'typography.html' },
  { value: 'Composition', data: 'typography.html' },

  { value: 'Inline Lists', data: 'inline_lists.html' },
  { value: 'Lists', data: 'inline_lists.html' },

  { value: 'Labels', data: 'labels.html' },
  { value: 'Tags', data: 'labels.html' },

  { value: 'Keystrokes', data: 'keystrokes.html' },

  { value: 'Reveal Modal', data: 'reveal.html' },
  { value: 'Modal', data: 'reveal.html' },

  { value: 'Alerts', data: 'alert_boxes.html' },
  { value: 'Error', data: 'alert_boxes.html' },
  { value: 'Success', data: 'alert_boxes.html' },
  { value: 'Warning', data: 'alert_boxes.html' },

  { value: 'Panels', data: 'panels.html' },
  { value: 'Wells', data: 'panels.html' },

  { value: 'Tooltips', data: 'tooltips.html' },
  { value: 'Popover', data: 'tooltips.html' },

  { value: 'Joyride', data: 'joyride.html' },
  { value: 'Tooltip Tour', data: 'joyride.html' },
  { value: 'Guider', data: 'joyride.html' },
  { value: 'Tooltip Walk-through', data: 'joyride.html' },

  { value: 'Dropdowns', data: 'dropdown.html' },
  { value: 'Pricing Tables', data: 'pricing_tables.html' },

  { value: 'Progress Bars', data: 'progress_bars.html' },

  { value: 'Tables', data: 'tables.html' },

  { value: 'Accordion', data: 'accordion.html' },
  { value: 'Collapse', data: 'accordion.html' },

  { value: 'Visibility', data: 'visibility.html' },

  { value: 'Tabs', data: 'tabs.html' },
  { value: 'Changelog', data: '#changelog' },
  { value: 'Compatibility', data: '#compatibility' },
  { value: 'FAQ', data: 'faq.html' },
  { value: 'Foundation 4', data: '#foundation 4' },
  { value: 'Foundation 3', data: '#foundation 3' },
  { value: 'Foundation 2', data: '#foundation 2' },
  { value: 'What Comes With Foundation', data: '#what comes with foundation' },
  { value: 'Download', data: '#download' }
];

$('#autocomplete').autocomplete({
  lookup: components,
  autoSelectFirst: true,
  onSelect: function (suggestion) {
    if (/index.html/i.test(window.location.href)) {
      return window.location = 'components/' + suggestion.data;
    }

    return window.location = '../components/' + suggestion.data;
  }
});

$('#interchangeMarkup').on('replace', function () {
  $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyASm3CwaK9qtcZEWYa-iQwHaGi3gcosAJc&sensor=false&callback=initializeMaps");
});

function initializeMaps() {
  // Basic options for a simple Google Map
  // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
  var mapOptions = {
    // How zoomed in you want the map to start at (always required)
    zoom: 11,

    // The latitude and longitude to center the map (always required)
    center: new google.maps.LatLng(40.6700, -73.9400), // New York

    // How you would like to style the map. 
    // This is where you would paste any style found on Snazzy Maps.
    styles: [{'featureType':'water','stylers':[{'visibility':'on'},{'color':'#acbcc9'}]},{'featureType':'landscape','stylers':[{'color':'#f2e5d4'}]},{'featureType':'road.highway','elementType':'geometry','stylers':[{'color':'#c5c6c6'}]},{'featureType':'road.arterial','elementType':'geometry','stylers':[{'color':'#e4d7c6'}]},{'featureType':'road.local','elementType':'geometry','stylers':[{'color':'#fbfaf7'}]},{'featureType':'poi.park','elementType':'geometry','stylers':[{'color':'#c5dac6'}]},{'featureType':'administrative','stylers':[{'visibility':'on'},{'lightness':33}]},{'featureType':'road'},{'featureType':'poi.park','elementType':'labels','stylers':[{'visibility':'on'},{'lightness':20}]},{},{'featureType':'road','stylers':[{'lightness':20}]}]
  };

  // Get the HTML DOM element that will contain your map 
  // We are using a div with id="map" seen below in the <body>
  var mapElement = document.getElementById('map');

  // Create the Google Map using out element and options defined above
  var map = new google.maps.Map(mapElement, mapOptions);
}

