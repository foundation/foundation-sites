# Contributing to Foundation

ZURB loves its community! We always want to hear from our users, whether they're reporting bugs, suggesting new features, or even adding them themselves.

## Reporting Bugs

[Open a new issue](https://github.com/zurb/foundation-sites/issues/new) to report a problem you're having with Foundation for Apps. When writing your issue, keep these things in mind:

- **Be descriptive.** If you can, upload a screenshot of problem you're having, or copy and paste any JavaScript or command line errors you encounter. Being detailed will help us hone in on the problem faster.
- **Post your code.** It's very helpful to see any HTML, Sass, or JavaScript you've written that you think may be causing the problem. In some cases, we might be able to fix your problem just by fixing your code.
- **Help us recreate it.** If your problem is complex, tell us the steps needed to recreate the issue. Sometimes we need to see the problem for ourselves, in our own web browsers, so we can more easily debug it.

## Editing the Documentation

The documentation is compiled by a tool called [Supercollider](https://github.com/gakimball/supercollider). Each page is compiled from 1–3 sources:

- A Markdown file under `docs/pages/`.
- If it's a Sass component, the relevant Sass file inside `scss/` is scanned for special [SassDoc](http://sassdoc.com/) comments.
- If it's a JavaScript component, the relevant JavaScript file inside `js/` is scanned for special [JSDoc](http://usejsdoc.org/) comments.

Each page is rendered in one big [Handlebars template](https://github.com/zurb/foundation-docs/blob/master/templates/component.html) that takes in all of the above data.

Much of the guts of the documentation are stored in an external codebase called [foundation-docs](https://github.com/zurb/foundation-docs). This is code that's shared between the documentation for all three Foundation frameworks, including:

- CSS specific to the documentation
- The Handlebars template used to build pages
- A series of Handlebars helpers for the template
- A custom Markdown parser used when parsing pages
- A script that generates the search results for documentation pages

To hack on this repo locally, run the script `./docslink.sh` inside of the main Foundation repo. That will download foundation-docs and link it to your Foundation repo.

## Submitting Pull Requests

If you think you can solve a problem yourself, or want to implement a new feature, go for it! Follow these guidelines to make the most killer PR ever.

- **Target the right branch.** So we can properly follow [semantic versioning](http://semver.org/), be sure to develop your pull request in the right branch:
  - Documentation fixes: `master` (this allows us to deploy them to the live site right away)
  - Bug fixes: `develop`
  - New features `6.x` (we always have a public branch for the next minor version)
  - Foundation 5 fixes: `V5`
- **Test, test, and test.** The Foundation frameworks are used by thousands and thousands of designers and developers, so making sure your changes work in every browser is important! Foundation for Sites is officially supported on:
  - Latest Chrome, Firefox, Safari, Edge, and Opera
  - Internet Explorer 9+
  - iOS 8+
  - Android 2.3+

## Help Wanted

Want something to work on? Let us guide you in the right direction.

- Browse the [Help Wanted](https://github.com/zurb/foundation-sites/labels/help%20wanted) issue to see bugs or features we've asked for the community's help on. Feel free to implement them yourself as a pull request!
- Find the [roadmap](https://github.com/zurb/foundation-sites/issues/7759) for our next minor version to see what we've got planned. We always have an open issue, and a public branch, to see what we're working on for the next 6.x version.
