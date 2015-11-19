Package.describe({
  name: 'zurb:foundation-sites',
  summary: 'The most advanced responsive front-end framework in the world.',
  version: '6.0.0',
  git: 'https://github.com/zurb/foundation-sites.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.imply('fourseven:scss@3.4.1');
  api.use(['ecmascript', 'jquery@1.11.4', 'fourseven:scss@3.4.1'], 'client');
  api.addFiles([
    'dist/foundation.css',
    'dist/foundation.min.css',
    'dist/foundation.js',
    'dist/foundation.min.js',

    'scss/foundation.scss',
    'scss/_global.scss',
    'scss/_settings.scss',

    'scss/components/_accordion-menu.scss',
    'scss/components/_accordion.scss',
    'scss/components/_badge.scss',
    'scss/components/_breadcrumbs.scss',
    'scss/components/_button-group.scss',
    'scss/components/_button.scss',
    'scss/components/_callout.scss',
    'scss/components/_close-button.scss',
    'scss/components/_drilldown.scss',
    'scss/components/_dropdown-menu.scss',
    'scss/components/_dropdown.scss',
    'scss/components/_flex-video.scss',
    'scss/components/_float.scss',
    'scss/components/_joyride.scss',
    'scss/components/_label.scss',
    'scss/components/_media-object.scss',
    'scss/components/_menu.scss',
    'scss/components/_off-canvas.scss',
    'scss/components/_orbit.scss',
    'scss/components/_pagination.scss',
    'scss/components/_progress-bar.scss',
    'scss/components/_reveal.scss',
    'scss/components/_slider.scss',
    'scss/components/_sticky.scss',
    'scss/components/_switch.scss',
    'scss/components/_table.scss',
    'scss/components/_tabs.scss',
    'scss/components/_thumbnail.scss',
    'scss/components/_title-bar.scss',
    'scss/components/_tooltip.scss',
    'scss/components/_top-bar.scss',
    'scss/components/_visibility.scss',

    'scss/forms/_checkbox.scss',
    'scss/forms/_error.scss',
    'scss/forms/_fieldset.scss',
    'scss/forms/_forms.scss',
    'scss/forms/_help-text.scss',
    'scss/forms/_input-group.scss',
    'scss/forms/_label.scss',
    'scss/forms/_select.scss',
    'scss/forms/_text.scss',

    'scss/grid/_classes.scss',
    'scss/grid/_column.scss',
    'scss/grid/_flex-grid.scss',
    'scss/grid/_grid.scss',
    'scss/grid/_gutter.scss',
    'scss/grid/_layout.scss',
    'scss/grid/_position.scss',
    'scss/grid/_row.scss',
    'scss/grid/_size.scss',

    'scss/typography/_alignment.scss',
    'scss/typography/_base.scss',
    'scss/typography/_helpers.scss',
    'scss/typography/_print.scss',
    'scss/typography/_typography.scss',

    'scss/util/_breakpoint.scss',
    'scss/util/_color.scss',
    'scss/util/_mixins.scss',
    'scss/util/_selector.scss',
    'scss/util/_unit.scss',
    'scss/util/_util.scss',
    'scss/util/_value.scss',

    'scss/vendor/normalize.scss',
  ], 'client');
});
