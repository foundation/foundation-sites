Before submitting a pull request, make sure it's targeting the right branch:

- For documentation fixes, use `master`.
- For bug fixes or new features compatible with the next version, use `develop`.
- For bug fixes incompatible with `develop`, use the support branch of the latest compatible version, which will be formatted `support/6.x`.

If you're fixing a JavaScript issue, it would help to create a new test case under the folder `test/visual/` that recreates the issue and show's that it's been fixed. Run `npm test` to compile the testing folder.

Happy coding! :)
