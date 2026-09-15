## When to use it

Work with a known length: an upload, a wizard's steps, a quota. Leave the value off for work whose length is unknown and the bar says "busy" instead of "40%".

## How it works

The native `progress` element, with its own drawing switched off and a thin rounded track in its place. The filled part is the hue, through the engines' own pseudo-elements, and slides when the value changes. Without a `value` the element is indeterminate: the track takes diagonal stripes that move along it. `data-size` sets the thickness to half of the size's space step.

```html
<progress class="progress" data-variant="success" data-size="lg" value="3" max="5" aria-label="Steps">3 of 5</progress>
<progress class="progress" aria-label="Loading">Loading</progress>
```

## Accessibility

A `progress` element is a progress bar to assistive tech already; it needs a name, from `aria-label` or `aria-labelledby`. Keep the text between the tags current, since some readers announce that rather than the value. An indeterminate bar is announced as busy with no percentage, which is right.
