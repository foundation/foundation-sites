### Quickstart

It's easy to get started, just run these commands:

```shell
cd ~/Sites
git clone git@github.com:/zurb/foundation.git
cd foundation/docs
bundle install
bundle exec foreman start
```

### Assets

All assets should be placed in the assets/ folder. When linking to an asset use the following helpers:

```html
<%= javascript_include_tag 'docs' %>
<!-- maps to assets/js/docs.js -->

<%= stylesheet_link_tag 'docs' %>
<!-- maps to assetsc/ss/docs.scss -->

<%= image_tag 'test.jpg' %>
<!-- maps to assets/img/test.jpg -->
```

### Adding new pages

Just create a `*.html.md` file anywhere in your project and it will be compiled into a corresponding `public/*.html` file.

You can use the either HTML or the same Markdown syntax used by GitHub!

### Options

`@options` is available to all pages.

### Metadata

`@metadata` is available to all `*.html.md` pages.

### What's next?

More documentation can be found at http://stasis.me