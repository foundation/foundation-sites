## When to use it

Two or more buttons that belong together: a form's submit and cancel, a set of view toggles, a toolbar row. Loose, they sit in a row at a small gap and wrap when they must. Attached, they become one control with shared borders, the shape of a segmented toggle.

## How it works

Loose is a wrapping flex row at `data-gap`. `data-attach` removes the gap, squares the inner corners, and overlaps each border with the next so the seam is one line wide. A focused member is lifted above its neighbours so its focus ring is not covered.

```html
<div class="buttons" role="group" aria-label="Form actions">
	<button class="button" type="submit">Save</button>
	<button class="button" type="button" data-emphasis="low">Cancel</button>
</div>
```

## Accessibility

The group carries `role="group"` and a name, so a screen reader announces the set once. A segmented toggle puts `aria-pressed` on each button and the pressed look follows. Do not use an attached group as tabs; tabs have their own roles and keyboard behaviour and are a separate component.
