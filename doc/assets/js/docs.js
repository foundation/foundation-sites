var components = [
  { value: 'CSS', data: 'css.html' },
  { value: 'Sass', data: 'sass.html' },
  { value: 'Rails', data: '#rails' },
  { value: 'Global Styles', data: 'global.html' },
  { value: 'Upgrading', data: '#upgrading' },
  { value: 'Media Queries', data: '#mediaQueries' },
  { value: 'Grid', data: 'grid.html' },
  { value: 'Block Grid', data: 'block_grid.html' },
  { value: 'Thumbnails', data: 'thumbnails.html' },
  { value: 'Utility Classes', data: '#utility classes' },
  { value: 'Right-to-Left Support', data: '#right-to-left support' },
  { value: 'Offcanvas', data: 'offcanvas.html' },
  { value: 'Top Bar', data: 'topbar.html' },
  { value: 'Side Nav', data: 'sidenav.html' },
  { value: 'magellan', data: 'magellan.html' },
  { value: 'Sub Nav', data: 'subnav.html' },
  { value: 'Breadcrumbs', data: 'breadcrumbs.html' },
  { value: 'Pagination', data: 'pagination.html' },
  { value: 'Orbit Slider', data: 'orbit.html' },
  { value: 'Clearing Lightbox', data: 'clearing.html' },
  { value: 'Interchange Responsive Images', data: 'interchange.html' },
  { value: 'Flex Video', data: 'flex_video.html' },
  { value: 'Forms', data: 'forms.html' },
  { value: 'Abide Validation', data: 'abide.html' },
  { value: 'Buttons', data: 'buttons.html' },
  { value: 'Button Groups', data: 'button_groups.html' },
  { value: 'Split Buttons', data: 'split_buttons.html' },
  { value: 'Dropdown Buttons', data: 'dropdown_buttons.html' },
  { value: 'Type', data: 'typography.html' },
  { value: 'Lists', data: 'inline_lists.html' },
  { value: 'Labels', data: 'labels.html' },
  { value: 'Keystrokes', data: 'keystrokes.html' },
  { value: 'Reveal Modal', data: 'reveal.html' },
  { value: 'Alerts', data: 'alert_boxes.html' },
  { value: 'Panels', data: 'panels.html' },
  { value: 'Tooltips', data: 'tooltips.html' },
  { value: 'Joyride', data: 'joyride.html' },
  { value: 'Dropdowns', data: 'dropdown.html' },
  { value: 'Pricing Tables', data: 'pricing_tables.html' },
  { value: 'Progress Bars', data: 'progress_bars.html' },
  { value: 'Accordian', data: '#accordian' },
  { value: 'Tabs', data: '#tabs' },
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
    onSelect: function (suggestion) {
        window.location = suggestion.data;
    }
});

// `lookup`: Lookup array for the suggestions. It may be array of strings or `suggestion` object literals.
// `suggestion`: An object literal with the following format: `{ value: 'string', data: any }`.
// `onSelect`: `function (suggestion) {}` Callback function invoked when user selects suggestion

