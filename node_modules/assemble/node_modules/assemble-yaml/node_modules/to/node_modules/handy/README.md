[![build status](https://secure.travis-ci.org/openmason/handy.png)](http://travis-ci.org/openmason/handy)

# handy
Bunch of common utility functions

## Functionality

  * getVersion
    * arguments
      1. path where package.json is present (optional)
    * returns
      * value of 'version' in package.json (or)
      * emptry string if unable to find package.json
    * example:
    
            var handy = require('handy');
            var ver = handy.getVersion(__dirname);

  * getUserHome
    * returns - home directory for current user (platform agnostic)
    
            var handy = require('handy');
            var home = handy.getUserHome();

  * getType
    * arguments
      1. object - for which type to be determined
    * returns - type of the object in lowercase ('number', 'array', 'object', 'regex' ...)
    
            var handy = require('handy');
            var xyz = [1,2,3];
            if(handy.getType(xyz)=='array') { 
              ... do something ...
            };

  * getFileExtension
    * arguments
      1. filename - filename for which the extension to be returned
      2. defaultExt - default extension if no extension found
    * returns - extension from the filename (or) defaultExt 
    
            var handy = require('handy');
            var x = "abc/this/there.x.y.j"
            var r = handy.getFileExtension(x);
            // r => 'j'

  * isArrayEqual - check if two arrays are equal, irrespective of order of elements
    * arguments: pass two array objects
    * returns - true (if both arrays are equal), else false
    
            var handy = require('handy');
            var x = [93,1,6], y=[6,93,1];
            var r = handy.isArrayEqual(x,y);
            // r => true

  * isObjectEqual - check if two objects are equal, irrespective of order of keys (if value is an array, it is expected to be in same order)
    * arguments: pass two objects
    * returns - true (if both objects are equal), else false
    
            var handy = require('handy');
            var x = {a:'hello', b:{scores:[1,2,3], name:'tal'}, id:123}, y={id:123,a:'hello',b:{name:'tal',scores:[1,2,3]}};
            var r = handy.isObjectEqual(x,y);
            // r => true

  * merge - shallow merge objects
    * arguments
      1. variable arguments, pass objects that needs to be merged
    * returns - merged object (or) {} 
    
            var handy = require('handy');
            var x = {a:1}, y={b:2}, z={a:4,c:5};
            var r = handy.merge(x,y,z);
            // r => {a:4, b:2, c:5}

  * deepMerge - merge objects, all hashes at all levels are merged (arrays left intact)
    * arguments
      1. variable arguments, pass objects that needs to be deep merged
    * returns - merged object (or) {} 
    
            var handy = require('handy');
            var x = {a:1,p:{a:5}}, y={b:2}, z={a:4,c:5,p:{a:3,b:11}};
            var r = handy.deepMerge(x,y,z);
            // r => {a:4, b:2, c:5, p:{a:3,b:11}}

## Install

    $ npm install handy
    # please include handy to your package.json

## Test cases
To execute full test cases

    $ make

