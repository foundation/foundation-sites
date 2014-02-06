---
username: doowb
---
# {%= name %} [![NPM version](https://badge.fury.io/js/{%= name %}.png)](http://badge.fury.io/js/{%= name %}) {% if (travis) { %} [![Build Status]({%= travis %}.png)]({%= travis %}){% } %}

> {%= description %}

Visit [Assemble's documentation](http://assemble.io) for many more examples and pointers on getting started.

## Getting Started
{%= _.doc('getting-started.md') %}

## Methods
{%= _.doc('methods.md') %}

{% if (changelog) { %}
## Release History
{%= _.include("docs-changelog.md") %} {% } %}

## Author

+ [github.com/{%= username %}](https://github.com/{%= username %})
+ [twitter.com/{%= username %}](http://twitter.com/{%= username %})

## License
{%= copyright %}
{%= license %}

***

_This file was generated on Mon Sep 02 2013 09:44:51._
