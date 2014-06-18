# HTML5 Placeholder jQuery Plugin

## Demo & Examples

[http://mathiasbynens.be/demo/placeholder](http://mathiasbynens.be/demo/placeholder)

## Example Usage

### HTML

```html
<input type="text" name="name" placeholder="e.g. John Doe">
<input type="email" name="email" placeholder="e.g. address@example.ext">
<input type="url" name="url" placeholder="e.g. http://mathiasbynens.be/">
<input type="tel" name="tel" placeholder="e.g. +32 472 77 69 88">
<input type="password" name="password" placeholder="e.g. h4x0rpr00fz">
<input type="search" name="search" placeholder="Search this site…">
<textarea name="message" placeholder="Your message goes here"></textarea>
```

### jQuery

Use the plugin as follows:

```js
$('input, textarea').placeholder();
```

You’ll still be able to use `jQuery#val()` to get and set the input values. If the element is currently showing a placeholder, `.val()` will return an empty string instead of the placeholder text, just like it does in browsers with a native `@placeholder` implementation. Calling `.val('')` to set an element’s value to the empty string will result in the placeholder text (re)appearing.

### CSS

The plugin automatically adds `class="placeholder"` to the elements who are currently showing their placeholder text. You can use this to style placeholder text differently:

```css
input, textarea { color: #000; }
.placeholder { color: #aaa; }
```

I’d suggest sticking to the `#aaa` color for placeholder text, as it’s the default in most browsers that support `@placeholder`. If you really want to, though, you can [style the placeholder text in some of the browsers that natively support it](http://stackoverflow.com/questions/2610497/change-an-inputs-html5-placeholder-color-with-css/2610741#2610741).

## Installation

You can install jquery-placeholder by using [Bower](http://bower.io).

```bash
bower install jquery-placeholder
```

## Notes

* Requires jQuery 1.6+. For an older version of this plugin that works under jQuery 1.4.2+, see [v1.8.7](https://github.com/mathiasbynens/jquery-placeholder/tree/v1.8.7).
* Works in all A-grade browsers, including IE6.
* Automatically checks if the browser natively supports the HTML5 `placeholder` attribute for `input` and `textarea` elements. If this is the case, the plugin won’t do anything. If `@placeholder` is only supported for `input` elements, the plugin will leave those alone and apply to `textarea`s exclusively. (This is the case for Safari 4, Opera 11.00, and possibly other browsers.)
* Caches the results of its two feature tests in `jQuery.fn.placeholder.input` and `jQuery.fn.placeholder.textarea`. For example, if `@placeholder` is natively supported for `input` elements, `jQuery.fn.placeholder.input` will be `true`. After loading the plugin, you can re-use these properties in your own code.
* Makes sure it never causes duplicate IDs in your DOM, even in browsers that need an extra `input` element to fake `@placeholder` for password inputs. This means you can safely do stuff like:

    ```html
    <label for="bar">Example label</label>
    <input type="password" placeholder="foo" id="bar">
    ```

    And the `<label>` will always point to the `<input>` element you’d expect. Also, all CSS styles based on the ID will just work™.

## License

This plugin is available under [the MIT license](http://mths.be/mit).

## Thanks to…

* [Paul Irish](http://paulirish.com/) for his inspiring snippet in [jQuery 1.4 Hawtness #1](http://jquery14.com/day-05/jquery-1-4-hawtness-1-with-paul-irish)
* everyone from [#jquery](http://webchat.freenode.net/?channels=jquery) for the tips, ideas and patches
* temp01 for his major contributions
* anyone who [contributed a patch](https://github.com/mathiasbynens/jquery-placeholder/contributors) or [made a helpful suggestion](https://github.com/mathiasbynens/jquery-placeholder/issues)

_– [Mathias](http://mathiasbynens.be/)_
