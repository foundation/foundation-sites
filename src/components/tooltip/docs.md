## When to use it

A few words about a control whose purpose is not obvious from its face, most often an icon-only button. Never for anything the reader has to have: there is no hover on a touch screen, and a tooltip that matters is a tooltip that will be missed.

## How it works

The component wraps a trigger and a bubble. The bubble is hidden until the trigger is hovered or focused, which is why it needs no script: `:hover` and `:focus-within` on the wrapper do the whole job. It is deliberately not a `popover`, because nothing but script can open one of those, and a script is exactly what this component should not need.

Where anchor positioning exists the bubble is fixed and anchored to the trigger, so a scrolling ancestor cannot clip it, and `data-placement` moves it to any of the four sides. Where it is missing the bubble falls back to absolute positioning above the trigger, which is fine until it sits inside something that scrolls.

```html
<span class="tooltip" data-placement="end">
	<button class="button" type="button" aria-label="Copy" aria-describedby="copy-tip" data-emphasis="low">⧉</button>
	<span role="tooltip" id="copy-tip">Copies the link</span>
</span>
```

## Accessibility

The trigger references the bubble with `aria-describedby`, so a screen reader announces the hint with the control rather than leaving it stranded in the page. The bubble appears on focus as well as hover, so a keyboard reader gets it too.

Keep it to a few words, and put nothing interactive inside: there is no way to move focus into a bubble that disappears when focus leaves the trigger. If the hint is long, or if it matters, it is not a tooltip. A field's own hint sits under the control permanently and is almost always the better answer.

The bubble also cannot be dismissed while the trigger stays hovered or focused: WCAG 1.4.13 asks for that, and a tooltip with no script has no way to offer it. This is a known limit of a pure-CSS tooltip, not an oversight, and it is another reason to keep the text short and never essential.
