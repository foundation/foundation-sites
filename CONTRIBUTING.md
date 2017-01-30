# Foundation Contributing Guidelines

Although Foundation is maintained by ZURB, it’s also a community effort. Whether it’s bug fixing, feature development, or contributions to the ecosystem, designers and developers from all over the world help make Foundation the most advanced framework in the world.

A select group of our contributors have been dubbed *Yetinauts*. They have direct write access to the codebase and support the core Foundation team on the development of the framework. Are you interested in making your mark on the Foundation framework? Whether you’re just submitting bugs or helping us write new features, there are many ways to contribute to Foundation.

## Terms

- The **community** is anyone commenting on issues or opening pull requests. That includes you!
- A **Yetinaut** is anyone with write access to the repository.
- The **Core Team** is anyone on the Foundation Team.

## Issues

Open an issue for any problem you have with the framework. If there's anything missing from your issue, such as extra context, a code sample, etc. a team member will ask for more info in the comments.

Support requests are generally better suited for the [Foundation Forum](http://foundation.zurb.com/forum), while GitHub is more appropriate for bugs. If you aren’t sure if your issue is a bug or not, don’t worry! Post your problem on GitHub and the team will help you along. Every participant is expected to follow the project's [Code of Conduct](code-of-conduct.md) so please be courteous and respectful.

## Contributions

All new features and bug fixes should be submitted as pull requests, so the community can review and discuss them. Core Team members can commit directly to the repository for very small changes, but should generally also submit new code as a pull request.

When you submit a pull request, @mention a few people you’d like to help you review it. Once those people have signed off on it, the pull request can be merged! Core Team members will handle the merge itself.

## Git Workflow

Foundation uses a git workflow close to [GitFlow](http://nvie.com/posts/a-successful-git-branching-model/). The workflow relies on three branches:
- **`master`**: The stable branch. It only contains the latest stable version released. Pull requests for docs improvements can be opened on it.
- **`develop`**: The developing branch is used to prepare the next minor/major version. It always contains all the new features and bug fixes previously made, and constitutes the most up-to-date version of Foundation. Almost every pull request should be opened on this branch. When a new version is released, it is merged on `master`, a support branch is created, and `develop` now targets the next version.
- **`support/*`**: Support branches are used to support the previous versions (i.e. `support/6.3` for `v6.3.0`) and prepare patches (i.e. `v6.3.1`). When a bug fix is compatible with supported versions, it is also merged on their support branches and patch versions can be released. If a fix is not compatible with `develop`, a pull request can be opened on the latest compatible and supported version.

This git workflow was adopted as of `v6.3`, so `v6.2` and previous versions are not supported.

## Coding Standards

If you aren't sure how a feature should be implemented, we recommend checking out our [standards document](https://github.com/zurb/foundation-standards), which outlines every aspect of writing framework features, from Sass to JavaScript.

## Becoming a Yetinaut

Want to join our crack team of Yetinauts? The Core Team is inviting active community members to become Yetinauts  on a case-by-case basis. If you want to become a contributor, engage the community on the Foundation Forum, help us close issues on GitHub, and review pull requests from other contributors.

If you’ve made substantial contributions to a Foundation framework and haven’t heard from us yet, you can reach out at foundation@zurb.com.

Contributors are expected to:

- Engage the community on GitHub by responding to and tagging issues.
- Write pull requests to address bugs and feature requests.
- Help in reviewing pull requests from users, contributors, and the Core Team.
- Follow the guidelines outlined in this document.

Here are some example contributions from some of our awesome team members:

- Colin Marshall converted our Sass unit tests to a newer test runner called True.
- Andy Cochran reworked the CSS for button groups to fix issues with stacking and border radii.
- designerno1 developed the Equalize by Row feature for the Equalizer plugin.
