/*jslint  browser: true, white: true, plusplus: true */
/*global $: true */

$(function () {
    'use strict';

    // Load countries then initialize plugin:
    $.ajax({
        url: 'content/countries.txt',
        dataType: 'json'
    }).done(function (source) {

        var countriesArray = $.map(source, function (value, key) { return { value: value, data: key }; }),
            countries = $.map(source, function (value) { return value; });

        // Setup jQuery ajax mock:
        $.mockjax({
            url: '*',
            responseTime:  200,
            response: function (settings) {
                var query = settings.data.query,
                    queryLowerCase = query.toLowerCase(),
                    suggestions = $.grep(countries, function(country) {
                         return country.toLowerCase().indexOf(queryLowerCase) !== -1;
                    }),
                    response = {
                        query: query,
                        suggestions: suggestions
                    };

                this.responseText = JSON.stringify(response);
            }
        });

        // Initialize ajax autocomplete:
        $('#autocomplete-ajax').autocomplete({
            serviceUrl: '/autosuggest/service/url',
            onSelect: function(suggestion) {
                $('#selction-ajax').html('You selected: ' + suggestion.value + ', ' + suggestion.data);
            }
        });

        // Initialize autocomplete with local lookup:
        $('#autocomplete').autocomplete({
            lookup: countriesArray,
            onSelect: function (suggestion) {
                $('#selection').html('You selected: ' + suggestion.value + ', ' + suggestion.data);
            }
        });
        
        // Initialize autocomplete with custom appendTo:
        $('#autocomplete-custom-append').autocomplete({
            lookup: countriesArray,
            appendTo: '#suggestions-container'
        });
        
    });

});