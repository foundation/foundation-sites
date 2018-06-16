Before submitting a pull request, make sure it's targeting the right branch:

- For the latest version, use `develop`.
- For bug fixes incompatible with `develop`, use the support branch of the latest compatible and supported version `support/6.x`.

If you're fixing a JavaScript issue, it would help to create a new test case under the folder `test/visual/` that recreates the issue and show's that it's been fixed. Run `npm test` to compile the testing folder.

Happy coding! :)
