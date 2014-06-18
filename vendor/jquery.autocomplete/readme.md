#Ajax AutoComplete for jQuery

Ajax Autocomplete for jQuery allows you to easily create 
autocomplete/autosuggest boxes for text input fields.

Has no dependencies other than jQuery.

The standard jquery.autocomplete.js file is around 2.7KB when minified via Closure Compiler and gzipped.

##API

* `$(selector).autocomplete(options);`
    * Sets up autocomplete for input field(s).
    * `options`: An object literal which defines the settings to use for the autocomplete plugin.
        * `serviceUrl`: Server side URL or callback function that returns serviceUrl string. Optional if local lookup data is provided.
        * `lookup`: Lookup array for the suggestions. It may be array of strings or `suggestion` object literals.
            * `suggestion`: An object literal with the following format: `{ value: 'string', data: any }`.
        * `lookupFilter`: `function (suggestion, query, queryLowerCase) {}` filter function for local lookups. By default it does partial string match (case insensitive).
        * `lookupLimit`: Number of maximum results to display for local lookup. Default: no limit.
        * `onSelect`: `function (suggestion) {}` Callback function invoked when user selects suggestion 
          from the list. `this` inside callback refers to input HtmlElement.
        * `minChars`: Minimum number of characters required to trigger autosuggest. Default: `1`.
        * `maxHeight`: Maximum height of the suggestions container in pixels. Default: `300`.
        * `deferRequestBy`: Number of miliseconds to defer ajax request. Default: `0`.
        * `width`: Suggestions container width in pixels, e.g.: 300. Default: `auto`, takes input field width.
        * `params`: Additional parameters to pass with the request, optional.
        * `formatResult`: `function (suggestion, currentValue) {}` custom function to 
          format suggestion entry inside suggestions container, optional. 
        * `delimiter`: String or RegExp, that splits input value and takes last part to as query for suggestions.
          Useful when for example you need to fill list of  coma separated values.
        * `zIndex`: 'z-index' for suggestions container. Default: `9999`.
        * `type`: Ajax request type to get suggestions. Default: `GET`.
        * `noCache`: Boolean value indicating whether to cache suggestion results. Default `false`.
        * `onSearchStart`: `function (query) {}` called before ajax request. `this` is bound to input element.
        * `onSearchComplete`: `function (query) {}` called after ajax response is processed. `this` is bound to input element.
        * `onSearchError`: `function (query, jqXHR, textStatus, errorThrown) {}` called if ajax request fails. `this` is bound to input element.
        * `onInvalidateSelection`: `function () {}` called when input is altered after selection has been made. `this` is bound to input element.
        * `triggerSelectOnValidInput`: Boolean value indicating if `select` should be triggered if it matches suggestion. Default `true`.
        * `beforeRender`: `function (container) {}` called before displaying the suggestions. You may manipulate suggestions DOM before it is displayed.
        * `tabDisabled`: Default `false`. Set to true to leave the cursor in the input field after the user tabs to select a suggestion.
        * `paramName`: Default `query`. The name of the request parameter that contains the query.
        * `transformResult`: `function(response, originalQuery) {}` called after the result of the query is ready. Converts the result into response.suggestions format.
        * `autoSelectFirst`: if set to `true`, first item will be selected when showing suggestions. Default value `false`.
        * `appendTo`: container where suggestions will be appended. Default value `body`. Can be jQuery object, selector or html element. Make sure to set `position: absolute` or `position: relative` for that element.
        * `dataType`: type of data returned from server. Either 'text' (default) or 'jsonp', which will cause the autocomplete to use jsonp. You may return a json object in your callback when using jsonp.

Autocomplete instance has following methods:

* `setOptions(options)`: you may update any option at any time. Options are listed above.
* `clear`: clears suggestion cache and current suggestions suggestions.
* `clearCache`: clears suggestion cache.
* `disable`: deactivate autocomplete.
* `enable`: activates autocomplete if it was deactivated before.
* `hide`: hides suggestions.
* `dispose`: destroys autocomplete instance. All events are detached and suggestion containers removed.

There are two ways that you can invoke Autocomplete method. One is calling autocomplete on jQuery object and passing method name as string literal. 
If method has arguments, arguments are passed as consecutive parameters:

    $('#autocomplete').autocomplete('disable');
    $('#autocomplete').autocomplete('setOptions', options);

Or you can get Autocomplete instance by calling autcomplete on jQuery object without any parameters and then invoke desired method.

    $('#autocomplete').autocomplete().disable();
    $('#autocomplete').autocomplete().setOptions(options);

##Usage

Html:

    <input type="text" name="country" id="autocomplete"/>

Ajax lookup:

    $('#autocomplete').autocomplete({
        serviceUrl: '/autocomplete/countries',
        onSelect: function (suggestion) {
            alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
        }
    });

Local lookup (no ajax):

    var countries = [
       { value: 'Andorra', data: 'AD' },
       // ...
       { value: 'Zimbabwe', data: 'ZZ' }
    ];

    $('#autocomplete').autocomplete({
        lookup: countries,
        onSelect: function (suggestion) {
            alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
        }
    });

##Styling

Generated HTML markup for suggestions is displayed bellow. You may style it any way you'd like.

    <div class="autocomplete-suggestions">
        <div class="autocomplete-suggestion autocomplete-selected">...</div>
        <div class="autocomplete-suggestion">...</div>
        <div class="autocomplete-suggestion">...</div>
    </div>

Style sample:

    .autocomplete-suggestions { border: 1px solid #999; background: #FFF; overflow: auto; }
    .autocomplete-suggestion { padding: 2px 5px; white-space: nowrap; overflow: hidden; }
    .autocomplete-selected { background: #F0F0F0; }
    .autocomplete-suggestions strong { font-weight: normal; color: #3399FF; }

##Response Format

Response from the server must be JSON formatted following JavaScript object:

    {
        // Query is not required as of version 1.2.5
        query: "Unit",
        suggestions: [
            { value: "United Arab Emirates", data: "AE" },
            { value: "United Kingdom",       data: "UK" },
            { value: "United States",        data: "US" }
        ]
    }

Data can be any value or object. Data object is passed to formatResults function 
and onSelect callback. Alternatively, if there is no data you can 
supply just a string array for suggestions:

    {
        query: "Unit",
        suggestions: ["United Arab Emirates", "United Kingdom", "United States"]
    }

## Non standard query/results

If your ajax service expects the query in a different format, and returns data in a different format than the standard response,
you can supply the "paramName" and "transformResult" options:

    $('#autocomplete').autocomplete({
        paramName: 'searchString',
        transformResult: function(response) {
            return {
                suggestions: $.map(response.myData, function(dataItem) {
                    return { value: dataItem.valueField, data: dataItem.dataField };
                })
            };
        }
    })


##License

Ajax Autocomplete for jQuery is freely distributable under the 
terms of an MIT-style [license](https://github.com/devbridge/jQuery-Autocomplete/blob/master/dist/license.txt).

Copyright notice and permission notice shall be included in all 
copies or substantial portions of the Software.

##Authors

Tomas Kirda / [@tkirda](https://twitter.com/tkirda)
