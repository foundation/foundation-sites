# to.js
collection of convertors.
Comes with command line options to use the convertors along with a library version that can be used within programs as well.

# Solves
  * read input formats json, xml, yaml 
  * converts the document to internal javascript object form
  * write output as json, yaml documents
  * only input xml is handled (no output xml yet)

## Installation

    $ npm install -g to
    $ npm install to

## Usage

Command line:

     # reads xml file and prints it in yml
     $ to -i examples/sample.xml -o .yaml
     
     # reads yaml and prints it in json
     $ to -i examples/sample.yml -o .json

Within your program:

    var to = require('to');
    
    # Load yaml
    var yamldoc = to.format.yaml.load('config.yaml');
    
    # print doc in yaml 
    var doc = ...;
    console.log(to.format.yaml.stringify(doc));

 * refer to examples directory for xml, json, yaml code

## Example
For a sample input xml:

    <?xml version="1.0" encoding="UTF-8" ?>
    <!DOCTYPE log4j:configuration SYSTEM "log4j.dtd">    
    <dummy>
    <value>15</value>
    <value>35</value>
    <value>5</value>
    <value>4784</value>
    <value>one more</value>
    <h>decent</h>
    <h>list</h>
    <h>another</h>
    <object>value</object>
    <inner>
      <h1>value</h1>
      <li>got</li>
      <li>milk</li>
    </inner>
   </dummy>

Output in json:

    {
      "dummy": {
        "value": [
          "15",
          "35",
          "5",
          "4784",
          "one more"
        ],
        "h": [
          "decent",
          "list",
          "another"
        ],
        "object": "value",
        "inner": {
          "h1": "value",
          "li": [
            "got",
            "milk"
          ]
        }
      }
    }
    
    # to try this example
    $ to -i examples/sample1.xml -o .json

Output in yaml:

    dummy: 
      value: 
        - 15
        - 35
        - 5
        - 4784
        - "one more"
      h: 
        - decent
        - list
        - another
      object: value
      inner: 
        h1: value
        li: 
          - got
          - milk

    # to try this example
    $ to -i examples/sample1.xml -o .yaml

## Todo
 * Input html (be forgiving with bad html)
 * Input markdown 
 * Output xml
 * Output html
 * add unit tests
 * allow beautification params for all outputs 

## Test cases
To execute full test cases

    $ make

