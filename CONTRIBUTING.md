# Foundation

This is the Foundation project.  We love making super awesome stuff, but even more we like to empower people to make changes on their own.  Feel free to fork and improve Foundation.

## Testing

Go into the test/ directory.  Run `bundle exec compass compile` or `bundle exec compass watch` if you're making changes and want to see them reflected on-the-fly.

Want to add a feature to Foundation?  Either update one of the test/*.html files or copy `test/template.html` to a new file, add your markup to it and check it in.

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
