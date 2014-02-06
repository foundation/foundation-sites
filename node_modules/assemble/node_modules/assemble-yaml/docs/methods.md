### extract
Extract YAML front matter and content from files.

```js
var raw = yfm.extract("./file.hbs", opts);
```
**Parameters**:

* `String`: The file to read.
* `Object`: The options object to pass to [js-yaml](https://github.com/nodeca/js-yaml)

**Returns**:

Object with three properties

```js
{
 "context": {}         // Object. YAML front matter returned as a JSON object.
 "content": ""         // String. File content, stripped of YAML front matter
 "originalContent": "" // String. Both content and YAML front matter.
}
```

### context

Return YAML front matter as a JSON object.

```js
var data = yfm.extract("./file.hbs").context;
```

Alias:

```js
var data = yfm.extractJSON("./file.hbs");
```

### content

Return the content of a file, with YAML front matter removed.

```js
var content = yfm.extract("./file.hbs").content;
```

Alias:

```js
var data = yfm.stripYFM("./file.hbs");
```