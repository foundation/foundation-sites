# Foundation

This is the Foundation project.  We love making super awesome stuff, but even more we like to empower people to make changes on their own.  Feel free to fork and improve Foundation.

### JavaScript

The Foundation JS libraries are tested with qUnit. You can run the tests in your browser by opening up the respective `.html` files in `test/javascripts/tests/`.

For more convenient testing using the command line and watcher functionality, you can also run the tests through Grunt with PhantomJS.

**Setting up Grunt for command line testing.**

1. Install [PhantomJS](http://phantomjs.org/)
2. Install [Node.js](http://nodejs.org/)
3. You may need to reboot your machine to make sure your PATH is up to date.
4. From the root of the project, `npm install`. This will install the grunt tasks locally.
5. Install the grunt command line interface with `npm install -g grunt-cli`.

Now you should have two new commands available. `grunt qunit` will execute all of the qUnit tests. `grunt watch` will watch for changes to the JS files and test files, and execute the tests when something changes.

## Compass Project

If you have a compass project and would like updated assets you can run the following command at any given time from within your project directory:

compass create -r zurb-foundation --using foundation

## Development

Want to test out the Compass templates.  Don't recompile the gem every time, use `bundler` like so:

```bash
mkdir demo1
cd demo1
echo -e 'source :rubygems\n
gem "zurb-foundation", :path => "/path/to/foundation/repo"\n
gem "compass"\n' > Gemfile
bundle exec compass create -r zurb-foundation --using foundation
```

On subsequent template updates use:

```bash
bundle exec compass create -r zurb-foundation --using foundation --force
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Test your changes to the best of your ability.  We've provided a test/ folder, feel free to add to it as necessary.
4. Commit your changes (`git commit -am 'Added some feature'`)
5. Push to the branch (`git push origin my-new-feature`)
6. Create new Pull Request
