/*jslint vars: true*/
/*global describe, it, expect, waits, waitsFor, runs, afterEach, spyOn, $*/

describe('Autocomplete', function () {
    'use strict';

    afterEach(function () {
        $('.autocomplete-suggestions').hide();
    });

    it('Should initialize autocomplete options', function () {
        var input = document.createElement('input'),
            options = { serviceUrl: '/autocomplete/service/url' },
            autocomplete = new $.Autocomplete(input, options);

        expect(autocomplete.options.serviceUrl).toEqual(options.serviceUrl);
        expect(autocomplete.suggestionsContainer).not.toBeNull();
    });

    it('Should set autocomplete attribute to "off"', function () {
        var input = document.createElement('input'),
            autocomplete = new $.Autocomplete(input, {});

        expect(autocomplete).not.toBeNull();
        expect(input.getAttribute('autocomplete')).toEqual('off');
    });

    it('Should get current value', function () {
        var input = document.createElement('input'),
            autocomplete = new $.Autocomplete(input, {
                lookup: [{ value: 'Jamaica', data: 'B' }]
            });

        input.value = 'Jam';
        autocomplete.onValueChange();

        expect(autocomplete.visible).toBe(true);
        expect(autocomplete.currentValue).toEqual('Jam');
    });

    it('Should call formatResult three times', function () {
        var input = document.createElement('input'),
            counter = 0,
            suggestion,
            currentValue,
            autocomplete = new $.Autocomplete(input, {
                lookup: ['Jamaica', 'Jamaica', 'Jamaica'],
                formatResult: function (s, v) {
                    suggestion = s;
                    currentValue = v;
                    counter += 1;
                }
            });

        input.value = 'Jam';
        autocomplete.onValueChange();

        expect(suggestion.value).toBe('Jamaica');
        expect(suggestion.data).toBe(null);
        expect(currentValue).toEqual('Jam');
        expect(counter).toEqual(3);
    });

    it('Verify onSelect callback', function () {
        var input = document.createElement('input'),
            context,
            value,
            data,
            autocomplete = $(input).autocomplete({
                lookup: [{ value: 'A', data: 'B' }],
                triggerSelectOnValidInput: false,
                onSelect: function (suggestion) {
                    context = this;
                    value = suggestion.value;
                    data = suggestion.data;
                }
            }).autocomplete();

        input.value = 'A';
        autocomplete.onValueChange();
        autocomplete.select(0);

        expect(context).toEqual(input);
        expect(value).toEqual('A');
        expect(data).toEqual('B');
    });

    it('Should convert suggestions format', function () {
        var input = document.createElement('input'),
            autocomplete = new $.Autocomplete(input, {
                lookup: ['A', 'B']
            });

        expect(autocomplete.options.lookup[0].value).toBe('A');
        expect(autocomplete.options.lookup[1].value).toBe('B');
    });

    it('Should execute onSearchStart', function () {
        var input = document.createElement('input'),
            startQuery,
            ajaxExecuted = false,
            autocomplete = new $.Autocomplete(input, {
                serviceUrl: '/test',
                onSearchStart: function (params) {
                    startQuery = params.query;
                }
            });

        $.mockjax({
            url: '/test',
            responseTime: 50,
            response: function (settings) {
                ajaxExecuted = true;
                var query = settings.data.query,
                    response = {
                        query: query,
                        suggestions: []
                    };
                this.responseText = JSON.stringify(response);
            }
        });

        input.value = 'A';
        autocomplete.onValueChange();

        waitsFor(function () {
            return ajaxExecuted;
        }, 'Ajax call never completed.', 100);

        runs(function () {
            expect(ajaxExecuted).toBe(true);
            expect(startQuery).toBe('A');
        });
    });

    it('Should execute onSearchComplete', function () {
        var input = document.createElement('input'),
            completeQuery,
            ajaxExecuted = false,
            url = '/test-completed',
            autocomplete = new $.Autocomplete(input, {
                serviceUrl: url,
                onSearchComplete: function (query) {
                    completeQuery = query;
                }
            });

        $.mockjax({
            url: url,
            responseTime: 50,
            response: function (settings) {
                ajaxExecuted = true;
                var query = settings.data.query,
                    response = {
                        query: query,
                        suggestions: []
                    };
                this.responseText = JSON.stringify(response);
            }
        });

        input.value = 'A';
        autocomplete.onValueChange();

        waitsFor(function () {
            return ajaxExecuted;
        }, 'Ajax call never completed.', 100);

        runs(function () {
            expect(ajaxExecuted).toBe(true);
            expect(completeQuery).toBe('A');
        });
    });

    it('Should execute onSearchError', function () {
        var input = document.createElement('input'),
            ajaxExecuted = false,
            errorMessage = false,
            url = '/test-error',
            autocomplete = new $.Autocomplete(input, {
                serviceUrl: url,
                onSearchError: function (q, jqXHR, textStatus, errorThrown) {
                    errorMessage = jqXHR.responseText;
                }
            });

        $.mockjax({
            url: url,
            responseTime: 50,
            status: 500,
            response: function (settings) {
                ajaxExecuted = true;
                this.responseText = "An error occurred";
            }
        });

        input.value = 'A';
        autocomplete.onValueChange();

        waitsFor(function () {
            return ajaxExecuted;
        }, 'Ajax call never completed.', 100);

        runs(function () {
            expect(ajaxExecuted).toBe(true);
            expect(errorMessage).toBe("An error occurred");
        });
    });

    it('Should transform results', function () {
        var input = document.createElement('input'),
            ajaxExecuted = false,
            url = '/test-transform',
            autocomplete = new $.Autocomplete(input, {
                serviceUrl: url,
                transformResult: function (result, query) {
                    return {
                        query: query,
                        suggestions: $.map(result.split(','), function (item) {
                            return { value: item, data: null };
                        })
                    };
                }
            });

        $.mockjax({
            url: url,
            responseTime: 50,
            response: function () {
                ajaxExecuted = true;
                this.responseText = 'Andora,Angola,Argentina';
            }
        });

        input.value = 'A';
        autocomplete.onValueChange();

        waitsFor(function () {
            return ajaxExecuted;
        }, 'Ajax call never completed.', 100);

        runs(function () {
            expect(ajaxExecuted).toBe(true);
            expect(autocomplete.suggestions.length).toBe(3);
            expect(autocomplete.suggestions[0].value).toBe('Andora');
        });
    });

    it('Should not require orginal query value from the server', function () {
        var input = document.createElement('input'),
            ajaxExecuted = false,
            url = '/test-original-query',
            autocomplete = new $.Autocomplete(input, {
                serviceUrl: url
            });

        $.mockjax({
            url: url,
            responseTime: 50,
            response: function () {
                ajaxExecuted = true;
                var response = {
                    query: null,
                    suggestions: ['Aa', 'Bb', 'Cc']
                };
                this.responseText = JSON.stringify(response);
            }
        });

        input.value = 'A';
        autocomplete.onValueChange();

        waitsFor(function () {
            return ajaxExecuted;
        }, 'Ajax call never completed.', 100);

        runs(function () {
            expect(ajaxExecuted).toBe(true);
            expect(autocomplete.suggestions.length).toBe(3);
            expect(autocomplete.suggestions[0].value).toBe('Aa');
        });
    });

    it('Should should not preventDefault when tabDisabled is set to false', function () {
        var input = document.createElement('input'),
            autocomplete = new $.Autocomplete(input, {
                lookup: [{ value: 'Jamaica', data: 'B' }],
                tabDisabled: false,
                autoSelectFirst: true
            });
        input.value = 'Jam';
        autocomplete.onValueChange();

        var event = $.Event('keydown');
        event.which = 9; // the tab keycode
        spyOn(event, 'stopImmediatePropagation');
        spyOn(event, 'preventDefault');
        spyOn(autocomplete, 'suggest');

        expect(autocomplete.visible).toBe(true);
        expect(autocomplete.disabled).toBe(undefined);
        expect(autocomplete.selectedIndex).not.toBe(-1);

        $(input).trigger(event);

        expect(event.stopImmediatePropagation).not.toHaveBeenCalled();
        expect(event.preventDefault).not.toHaveBeenCalled();
        expect(autocomplete.suggest).not.toHaveBeenCalled();
    });

    it('Should should preventDefault when tabDisabled is set to true', function () {
        var input = document.createElement('input'),
            autocomplete = new $.Autocomplete(input, {
                lookup: [{ value: 'Jamaica', data: 'B' }],
                tabDisabled: true,
                autoSelectFirst: true
            });
        input.value = 'Jam';
        autocomplete.onValueChange();

        var event = $.Event('keydown');
        event.which = 9; // the tab keycode
        spyOn(event, 'stopImmediatePropagation');
        spyOn(event, 'preventDefault');
        spyOn(autocomplete, 'suggest');

        expect(autocomplete.visible).toBe(true);
        expect(autocomplete.disabled).toBe(undefined);
        expect(autocomplete.selectedIndex).not.toBe(-1);

        $(input).trigger(event);

        expect(event.stopImmediatePropagation).toHaveBeenCalled();
        expect(event.preventDefault).toHaveBeenCalled();
        expect(autocomplete.suggest).not.toHaveBeenCalled();
    });

    it('Should not autoselect first item by default', function () {
        var input = document.createElement('input'),
            autocomplete = new $.Autocomplete(input, {
                lookup: ['Jamaica', 'Jamaica', 'Jamaica']
            });

        input.value = 'Jam';
        autocomplete.onValueChange();

        expect(autocomplete.selectedIndex).toBe(-1);
    });

    it('Should autoselect first item autoSelectFirst set to true', function () {
        var input = document.createElement('input'),
            autocomplete = new $.Autocomplete(input, {
                lookup: ['Jamaica', 'Jamaica', 'Jamaica'],
                autoSelectFirst: true
            });

        input.value = 'Jam';
        autocomplete.onValueChange();

        expect(autocomplete.selectedIndex).toBe(0);
    });

    it('Should use custom query parameter name', function () {
        var input = document.createElement('input'),
            paramName = 'custom',
            paramValue = null,
            autocomplete = new $.Autocomplete(input, {
                serviceUrl: '/test-query',
                paramName: paramName
            });

        $.mockjax({
            url: '/test-query',
            responseTime: 5,
            response: function (settings) {
                paramValue = settings.data[paramName];
                var response = {
                    query: paramValue,
                    suggestions: []
                };
                this.responseText = JSON.stringify(response);
            }
        });

        input.value = 'Jam';
        autocomplete.onValueChange();

        waits(10);

        runs(function () {
            expect(paramValue).toBe('Jam');
        });
    });

    it('Should destroy autocomplete instance', function () {
        var input = $(document.createElement('input')),
            div = $(document.createElement('div'));

        input.autocomplete({
            serviceUrl: '/test-dispose',
            appendTo: div
        });

        expect(input.data('autocomplete')).toBeDefined();
        expect(div.children().length).toBeGreaterThan(0);

        input.autocomplete('dispose');

        expect(input.data('autocomplete')).toBeUndefined();
        expect(div.children().length).toBe(0);
    });

    it('Should return Autocomplete instance if called without arguments', function () {
        var input = $(document.createElement('input'));

        input.autocomplete({
            serviceUrl: '/test-dispose'
        });

        var instance = input.autocomplete();

        expect(instance instanceof $.Autocomplete).toBe(true);
    });

    it('Should construct serviceUrl via callback function.', function () {
        var input = $(document.createElement('input')),
            dynamicUrl,
            data;

        input.autocomplete({
            ignoreParams: true,
            serviceUrl: function (query) {
                return '/dynamic-url/' + encodeURIComponent(query).replace(/%20/g, "+");
            }
        });

        $.mockjax({
            url: '/dynamic-url/*',
            responseTime: 5,
            response: function (settings) {
                dynamicUrl = settings.url;
                data = settings.data;
                var response = {
                    suggestions: []
                };
                this.responseText = JSON.stringify(response);
            }
        });

        input.val('Hello World');
        input.autocomplete().onValueChange();

        waits(10);

        runs(function () {
            expect(dynamicUrl).toBe('/dynamic-url/Hello+World');
            expect(data).toBeFalsy();
        });
    });

    it('Should set width to be greater than zero', function () {
        var input = $(document.createElement('input')),
            instance,
            width;

        input.autocomplete({
            lookup: [{ value: 'Jamaica', data: 'B' }]
        });

        input.val('Jam');
        instance = input.autocomplete();
        instance.onValueChange();
        width = $(instance.suggestionsContainer).width();

        expect(width).toBeGreaterThan(0);
    });

    it('Should call beforeRender and pass container jQuery object', function () {
        var element = document.createElement('input'),
            input = $(element),
            instance,
            elementCount,
            context;

        input.autocomplete({
            lookup: [{ value: 'Jamaica', data: 'B' }],
            beforeRender: function (container) {
                context = this;
                elementCount = container.length;
            }
        });

        input.val('Jam');
        instance = input.autocomplete();
        instance.onValueChange();

        expect(context).toBe(element);
        expect(elementCount).toBe(1);
    });

    it('Should trigger select when input value matches suggestion', function () {
        var input = $('<input />'),
            instance,
            suggestionData = false;

        input.autocomplete({
            lookup: [{ value: 'Jamaica', data: 'J' }],
            triggerSelectOnValidInput: true,
            onSelect: function (suggestion) {
                suggestionData = suggestion.data;
            }
        });

        input.val('Jamaica');
        instance = input.autocomplete();
        instance.onValueChange();

        expect(suggestionData).toBe('J');
    });

    it('Should NOT trigger select when input value matches suggestion', function () {
        var input = $('<input />'),
            instance,
            suggestionData = null;

        input.autocomplete({
            lookup: [{ value: 'Jamaica', data: 'J' }],
            triggerSelectOnValidInput: false,
            onSelect: function (suggestion) {
                suggestionData = suggestion.data;
            }
        });

        input.val('Jamaica');
        instance = input.autocomplete();
        instance.onValueChange();

        expect(suggestionData).toBeNull();
    });

    it('Should use serviceUrl and params as cacheKey', function () {
        var input = $('<input />'),
            instance,
            ajaxExecuted = false,
            data = { a: 1, query: 'Jam' },
            serviceUrl = '/autocomplete/cached/url',
            cacheKey = serviceUrl + '?' + $.param(data);

        input.autocomplete({
            serviceUrl: serviceUrl,
            params: data
        });

        $.mockjax({
            url: serviceUrl,
            responseTime: 5,
            response: function (settings) {
                ajaxExecuted = true;
                var query = settings.data.query,
                    response = {
                        suggestions: [{ value: 'Jamaica' }, { value: 'Jamaica' }]
                    };
                this.responseText = JSON.stringify(response);
            }
        });

        input.val('Jam');
        instance = input.autocomplete();
        instance.onValueChange();

        waits(10);

        runs(function () {
            expect(instance.cachedResponse[cacheKey]).toBeTruthy();
        });
    });

    it('Should limit results for local request', function () {
        var input = $('<input />'),
            instance,
            limit = 3;

        input.autocomplete({
            lookup: [{ value: 'Jamaica' }, { value: 'Jamaica' }, { value: 'Jamaica' }, { value: 'Jamaica' }, { value: 'Jamaica' }]
        });

        input.val('Jam');
        instance = input.autocomplete();
        instance.onValueChange();

        // Expect all items to be displayed:
        expect(instance.suggestions.length).toBe(5);

        // Set lookup result limit and verify:
        instance.setOptions({ lookupLimit: limit });
        instance.onValueChange();

        expect(instance.suggestions.length).toBe(limit);
    });
});