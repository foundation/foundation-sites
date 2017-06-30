Package.describe({
  name: 'zurb:foundation-sites',
  summary: 'Foundation 6 - The most advanced responsive front-end framework in the world.',
  version: '6.4.1',
  git: 'https://github.com/zurb/foundation-sites.git',
  documentation: 'meteor-README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.imply('fourseven:scss@3.4.1');
  api.use(['ecmascript', 'jquery', 'fourseven:scss@3.4.1'], 'client');
  api.addFiles('dist/js/foundation.js', 'client');
  api.addFiles([

    'scss/foundation.scss',
    'scss/_global.scss',
    'scss/settings/_settings.scss',

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
    'scss/components/_flex.scss',
    'scss/components/_float.scss',
    'scss/components/_label.scss',
    'scss/components/_media-object.scss',
    'scss/components/_menu-icon.scss',
    'scss/components/_menu.scss',
    'scss/components/_off-canvas.scss',
    'scss/components/_orbit.scss',
    'scss/components/_pagination.scss',
    'scss/components/_progress-bar.scss',
    'scss/components/_responsive-embed.scss',
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
    'scss/forms/_meter.scss',
    'scss/forms/_progress.scss',
    'scss/forms/_range.scss',
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
    'scss/util/_flex.scss',
    'scss/util/_mixins.scss',
    'scss/util/_selector.scss',
    'scss/util/_unit.scss',
    'scss/util/_util.scss',
    'scss/util/_value.scss'

  ], 'client', {isImport: true});
});
