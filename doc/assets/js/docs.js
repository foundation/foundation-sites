var components = [
  { value: 'Getting Started', data: '/docs/index.html' },

  { value: 'CSS', data: '/docs/css.html' },
  { value: 'Styles', data: '/docs/css.html' },

  { value: 'Sass', data: '/docs/sass.html' },
  { value: 'SCSS', data: '/docs/sass.html' },

  { value: 'Applications', data: '/docs/applications.html' },
  { value: 'Rails', data: '/docs/applications.html' },
  { value: 'Gem', data: '/docs/applications.html' },
  { value: 'JavaScript', data: '/docs/javascript.html' },

  { value: 'Global Styles', data: '/docs/components/global.html' },
  { value: 'Global Mixins', data: '/docs/components/global.html' },
  { value: 'Global Variables', data: '/docs/components/global.html' },
  { value: 'Useful HTML Classes', data: '/docs/components/global.html' },

  { value: 'Upgrading', data: '/docs/upgrading.html' },
  { value: 'Migration', data: '/docs/upgrading.html' },

  { value: 'Media Queries', data: '/docs/media-queries.html' },
  { value: 'Breakpoints', data: '/docs/media-queries.html' },

  { value: 'Grid', data: '/docs/components/grid.html' },
  { value: 'Block Grid', data: '/docs/components/block_grid.html' },
  { value: 'Thumbnails', data: '/docs/components/thumbnails.html' },
  { value: 'Images', data: '/docs/components/thumbnails.html'},
  { value: 'Utility Classes', data: '/docs/utility-classes.html' },
  { value: 'Right-to-Left Support', data: '/docs/components/rtl.html' },
  { value: 'Offcanvas', data: '/docs/components/offcanvas.html' },

  { value: 'Top Bar', data: '/docs/components/topbar.html' },
  { value: 'Nav Bar', data: '/docs/components/topbar.html' },
  { value: 'Navigation', data: '/docs/components/topbar.html' },
  { value: 'Sticky', data: '/docs/components/topbar.html' },

  { value: 'Side Nav', data: '/docs/components/sidenav.html' },

  { value: 'Magellan', data: '/docs/components/magellan.html' },
  { value: 'scrollspy', data: '/docs/components/magellan.html' },

  { value: 'Sub Nav', data: '/docs/components/subnav.html' },

  { value: 'Breadcrumbs', data: '/docs/components/breadcrumbs.html' },
  { value: 'Navigation Path', data: '/docs/components/breadcrumbs.html' },
  { value: 'Cookie crumb', data: '/docs/components/breadcrumbs.html' },

  { value: 'Pagination', data: '/docs/components/pagination.html' },

  { value: 'Orbit Slider', data: '/docs/components/orbit.html' },
  { value: 'Carousel', data: '/docs/components/orbit.html' },
  { value: 'Slider', data: '/docs/components/orbit.html' },
  { value: 'Slideshow', data: '/docs/components/orbit.html' },

  { value: 'Clearing Lightbox', data: '/docs/components/clearing.html' },
  { value: 'Responsive Lightbox', data: '/docs/components/clearing.html' },
  { value: 'Lightbox', data: '/docs/components/clearing.html' },

  { value: 'Interchange Responsive Content', data: '/docs/components/interchange.html' },

  { value: 'Flex Video', data: '/docs/components/flex_video.html' },
  { value: 'Responsive Video', data: '/docs/components/flex_video.html' },

  { value: 'Forms', data: '/docs/components/forms.html' },

  { value: 'Abide Validation', data: '/docs/components/abide.html' },
  { value: 'Form Validation', data: '/docs/components/abide.html' },
  { value: 'Field Validation', data: '/docs/components/abide.html' },

  { value: 'Buttons', data: '/docs/components/buttons.html' },
  { value: 'Button Groups', data: '/docs/components/button_groups.html' },
  { value: 'Button Bar', data: '/docs/components/button_groups.html' },
  { value: 'Split Buttons', data: '/docs/components/split_buttons.html' },
  { value: 'Dropdown Buttons', data: '/docs/components/dropdown_buttons.html' },

  { value: 'Type', data: '/docs/components/typography.html' },
  { value: 'Typography', data: '/docs/components/typography.html' },
  { value: 'Type-setting', data: '/docs/components/typography.html' },
  { value: 'Composition', data: '/docs/components/typography.html' },

  { value: 'Inline Lists', data: '/docs/components/inline_lists.html' },
  { value: 'Lists', data: '/docs/components/inline_lists.html' },

  { value: 'Labels', data: '/docs/components/labels.html' },
  { value: 'Tags', data: '/docs/components/labels.html' },

  { value: 'Keystrokes', data: '/docs/components/keystrokes.html' },

  { value: 'Reveal Modal', data: '/docs/components/reveal.html' },
  { value: 'Modal', data: '/docs/components/reveal.html' },

  { value: 'Alerts', data: '/docs/components/alert_boxes.html' },
  { value: 'Error', data: '/docs/components/alert_boxes.html' },
  { value: 'Success', data: '/docs/components/alert_boxes.html' },
  { value: 'Warning', data: '/docs/components/alert_boxes.html' },

  { value: 'Panels', data: '/docs/components/panels.html' },
  { value: 'Wells', data: '/docs/components/panels.html' },

  { value: 'Tooltips', data: '/docs/components/tooltips.html' },
  { value: 'Popover', data: '/docs/components/tooltips.html' },

  { value: 'Joyride', data: '/docs/components/joyride.html' },
  { value: 'Tooltip Tour', data: '/docs/components/joyride.html' },
  { value: 'Guider', data: '/docs/components/joyride.html' },
  { value: 'Tooltip Walk-through', data: '/docs/components/joyride.html' },

  { value: 'Dropdowns', data: '/docs/components/dropdown.html' },
  { value: 'Pricing Tables', data: '/docs/components/pricing_tables.html' },

  { value: 'Progress Bars', data: '/docs/components/progress_bars.html' },

  { value: 'Tables', data: '/docs/components/tables.html' },

  { value: 'Accordion', data: '/docs/components/accordion.html' },
  { value: 'Collapse', data: '/docs/components/accordion.html' },

  { value: 'Visibility', data: '/docs/components/visibility.html' },

  { value: 'Tabs', data: '/docs/components/tabs.html' },
  { value: 'Changelog', data: '/docs/changelog.html' },
  { value: 'Compatibility', data: '/docs/compatibility.html' },
  { value: 'FAQ', data: '/docs/components/faq.html' },
  { value: 'Foundation 4', data: '/docs/v/4.3.2/' },
  { value: 'Foundation 3', data: 'http://foundation3.zurb.com/old-docs/f3/' },
  { value: 'Foundation 2', data: '/docs/v/2.2.1' },
  // { value: 'What Comes With Foundation', data: '/docs/components/#what comes with foundation' },
  { value: 'Download', data: '/develop/download.html' }
];

$('#autocomplete').autocomplete({
  lookup: components,
  autoSelectFirst: true,
  onSelect: function (suggestion) {
    // if (/index.html/i.test(window.location.href)) {
    //   return window.location = 'components/' + suggestion.data;
    // }

    // return window.location = '../components/' + suggestion.data;
    window.location = "http://foundation5.zurb.com" + suggestion.data;
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

var currentUrl = window.location.href;
    partial = currentUrl.split('docs')[1].split('/'),
    page = partial[partial.length-1],
    sidenav_links = $('.side-nav a');

sidenav_links.each(function () {
  var link = $(this);
  if (page == link.attr('href')) {
    link.closest('li').addClass('active');
  }
});

