# Change Log

## 0.6.0

 * Deprecated `any-newer` task (`newer` task now handles this automatically, see #17)
 * Deprecated `timestamps` option (use `cache` instead)
 * Consolidated `newer-reconfigure` and `newer-timestamp` into single `newer-postrun` task
 * Refactor task for easier unit testing (see #16)

## 0.5.4

 * Correctly handle cases where `dest` file is not present (thanks @royriojas, see #11)

## 0.5.3

 * Add `newer-reconfigure` to properly reset task configuration (see #8)

## 0.5.2

 * Fix use of `any-newer` on task with multiple targets (thanks @royriojas, see #7)

## 0.5.1

 * Filter out file objects with no remaining `src` files (see #6)

## 0.5.0

 * Compare `src` file modification times to `dest` files if present (see #2)
