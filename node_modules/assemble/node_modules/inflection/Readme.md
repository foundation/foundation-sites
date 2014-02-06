# inflection

A port of inflection-js to node.js module



## Description
[inflection-js](http://code.google.com/p/inflection-js/) is a port of the functionality from Ruby on Rails' Active Support Inflection classes into Javascript. `inflection` is a port of `inflection-js` to node.js npm package. Instead of [extending JavaScript native](http://wonko.com/post/extending-javascript-natives) String object like `inflection-js` does, `inflection` separate the methods to a independent package to avoid unexpected behaviors.



## Requires

Checkout `package.json` for dependencies.



## Installation

Install inflection through npm

	npm install inflection



## API

- inflection.indexOf( arr, item, fromIndex, compareFunc );
- inflection.pluralize( str, plural );
- inflection.singularize( str, singular );
- inflection.camelize( str, lowFirstLetter );
- inflection.underscore( str, allUpperCase );
- inflection.humanize( str, lowFirstLetter );
- inflection.capitalize( str );
- inflection.dasherize( str );
- inflection.titleize( str );
- inflection.demodulize( str );
- inflection.tableize( str );
- inflection.classify( str );
- inflection.foreign_key( str, dropIdUbar );
- inflection.ordinalize( str );
- inflection.transform( str, arr );



## Usage

> Require the module before using

	var inflection = require( 'inflection' );



### inflection.indexOf( arr, item, fromIndex, compareFunc );

This lets us detect if an Array contains a given element.

#### Arguments

> arr

	type: Array
	desc: The subject array.

> item

	type: Object
	desc: Object to locate in the Array.

> fromIndex

	type: Number
	desc: Starts checking from this position in the Array.(optional)

> compareFunc

	type: Function
	desc: Function used to compare Array item vs passed item.(optional)

#### Example code

	var inflection = require( 'inflection' );

	inflection.indexOf([ 'hi','there' ], 'guys' ); // === -1
	inflection.indexOf([ 'hi','there' ], 'hi' ); // === 0



### inflection.pluralize( str, plural );

This function adds pluralization support to every String object.

#### Arguments

> str

	type: String
	desc: The subject string.

> plural

	type: String
	desc: Overrides normal output with said String.(optional)

#### Example code

	var inflection = require( 'inflection' );

	inflection.pluralize( 'person' ); // === 'people'
	inflection.pluralize( 'octopus' ); // === "octopi"
	inflection.pluralize( 'Hat' ); // === 'Hats'
	inflection.pluralize( 'person', 'guys' ); // === 'guys'



### inflection.singularize( str, singular );

This function adds singularization support to every String object.

#### Arguments

> str

	type: String
	desc: The subject string.

> singular

	type: String
	desc: Overrides normal output with said String.(optional)

#### Example code

	var inflection = require( 'inflection' );

	inflection.singularize( 'people' ); // === 'person'
	inflection.singularize( 'octopi' ); // === "octopus"
	inflection.singularize( 'Hats' ); // === 'Hat'
	inflection.singularize( 'guys', 'person' ); // === 'person'



### inflection.camelize( str, lowFirstLetter );

This function adds camelization support to every String object.

#### Arguments

> str

	type: String
	desc: The subject string.

> lowFirstLetter

	type: Boolean
	desc: Default is to capitalize the first letter of the results. Passing true will lowercase it. (optional)

#### Example code

	var inflection = require( 'inflection' );

	inflection.camelize( 'message_properties' ); // === 'MessageProperties'
	inflection.camelize( 'message_properties', true ); // === 'messageProperties'



### inflection.underscore( str, allUpperCase );

This function adds underscore support to every String object.

#### Arguments

> str

	type: String
	desc: The subject string.

> allUpperCase

	type: Boolean
	desc: Default is to lowercase and add underscore prefix



#### Example code

	var inflection = require( 'inflection' );

	inflection.underscore( 'MessageProperties' ); // === 'message_properties'
	inflection.underscore( 'messageProperties' ); // === 'message_properties'
	inflection.underscore( 'MP' ); // === 'm_p'
	inflection.underscore( 'MP', true ); // === 'MP'



### inflection.humanize( str, lowFirstLetter );

This function adds humanize support to every String object.

#### Arguments

> str

	type: String
	desc: The subject string.

> lowFirstLetter

	type: Boolean
	desc: Default is to capitalize the first letter of the results. Passing true will lowercase it. (optional)

#### Example code

	var inflection = require( 'inflection' );

	inflection.humanize( 'message_properties' ); // === 'Message properties'
	inflection.humanize( 'message_properties', true ); // === 'message properties'



### inflection.capitalize( str );

This function adds capitalization support to every String object.

#### Arguments

> str

	type: String
	desc: The subject string.

#### Example code

	var inflection = require( 'inflection' );

	inflection.capitalize( 'message_properties' ); // === 'Message_properties'
	inflection.capitalize( 'message properties', true ); // === 'Message properties'



### inflection.dasherize( str );

This function adds dasherization support to every String object.

#### Arguments

> str

	type: String
	desc: The subject string.

#### Example code

	var inflection = require( 'inflection' );

	inflection.dasherize( 'message_properties' ); // === 'message-properties'
	inflection.dasherize( 'Message Properties' ); // === 'Message-Properties'



### inflection.titleize( str );

This function adds titleize support to every String object.

#### Arguments

> str

	type: String
	desc: The subject string.

#### Example code

	var inflection = require( 'inflection' );

	inflection.titleize( 'message_properties' ); // === 'Message Properties'
	inflection.titleize( 'message properties to keep' ); // === 'Message Properties to Keep'



### inflection.demodulize( str );

This function adds demodulize support to every String object.

#### Arguments

> str

	type: String
	desc: The subject string.

#### Example code

	var inflection = require( 'inflection' );

	inflection.demodulize( 'Message::Bus::Properties' ); // === 'Properties'



### inflection.tableize( str );

This function adds tableize support to every String object.

#### Arguments

> str

	type: String
	desc: The subject string.

#### Example code

	var inflection = require( 'inflection' );

	inflection.tableize( 'MessageBusProperty' ); // === 'message_bus_properties'



### inflection.classify( str );

This function adds classification support to every String object.

#### Arguments

> str

	type: String
	desc: The subject string.

#### Example code

	var inflection = require( 'inflection' );

	inflection.classify( 'message_bus_properties' ); // === 'MessageBusProperty'



### inflection.foreign_key( str, dropIdUbar );

This function adds foreign key support to every String object.

#### Arguments

> str

	type: String
	desc: The subject string.

> lowFirstLetter

	type: Boolean
	desc: Default is to seperate id with an underbar at the end of the class name, you can pass true to skip it.(optional)

#### Example code

	var inflection = require( 'inflection' );

	inflection.foreign_key( 'MessageBusProperty' ); // === 'message_bus_property_id'
	inflection.foreign_key( 'MessageBusProperty', true ); // === 'message_bus_propertyid'



### inflection.ordinalize( str );

This function adds ordinalize support to every String object.

#### Arguments

> str

	type: String
	desc: The subject string.

#### Example code

	var inflection = require( 'inflection' );

	inflection.ordinalize( 'the 1 pitch' ); // === 'the 1st pitch'



### inflection.transform( str, arr );

This function performs multiple inflection methods on a string.

#### Arguments

> str

	type: String
	desc: The subject string.

> arr

	type: Array
	desc: An array of inflection methods.

#### Example code

	var inflection = require( 'inflection' );

	inflection.transform( 'all job', [ 'pluralize', 'capitalize', 'dasherize' ]); // === 'All-jobs'



## Credit

- Ryan Schuft <ryan.schuft@gmail.com>
- Lance Pollard <lancejpollard@gmail.com> (Browser support)
- brandondewitt
- luk3thomas


## License

(The MIT License)

Copyright (c) 2011 dreamerslab &lt;ben@dreamerslab.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
