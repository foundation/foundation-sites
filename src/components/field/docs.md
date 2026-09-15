## When to use it

Every control in a form: text, email, number, select, textarea, checkbox, radio, switch, range. A form is a `stack` of fields and a button; the field owns what bare HTML cannot, the label's link to its control, the help text, and the error.

## How it works

A tight column: label, control, hint, error. The control is a native element styled to the control tokens, so a theme that changes `--yeti-control-radius` changes every input. The error is hidden until the control is invalid *and* the visitor has touched it (`:user-invalid`), or until you set `aria-invalid="true"` after a server round trip; then it shows and the border turns to the alert colour. A `required` control gets a marker after its label. A checkbox or radio is laid out inline automatically, label after the control, and its checked mark is a variant-coloured centre inside a ring of the surface colour.

```html
<fieldset class="field">
	<legend>Notify me by</legend>
	<div class="field"><input id="n-email" type="checkbox" name="notify" value="email"><label for="n-email">Email</label></div>
	<div class="field"><input id="n-sms" type="checkbox" name="notify" value="sms"><label for="n-sms">Text message</label></div>
	<p data-hint>Pick as many as you like.</p>
</fieldset>
```

A checkbox with `role="switch"` becomes a switch: a track with a thumb that slides to the end and takes the field's colour when on. A `range` input gets a thin track and a round thumb in the field's colour, the height of a control so it is easy to grab; the track is filled to `--yeti-range-value`, which CSS cannot work out for itself: set it inline for a static value, or from one line of your own script when the value moves.

```html
<div class="field"><input id="dark" type="checkbox" role="switch"><label for="dark">Dark mode</label></div>
<div class="field"><label for="volume">Volume</label><input id="volume" type="range" min="0" max="100" value="40"></div>
```

```html
<div class="field"><label for="quality">Quality</label><input id="quality" type="range" min="0" max="100" value="70" style="--yeti-range-value: 70%"></div>
```

The script form: `input.addEventListener('input', () => input.style.setProperty('--yeti-range-value', ((input.value - input.min) / (input.max - input.min) * 100) + '%'))`.

## Accessibility

The label must point at the control with `for` and the control must carry that `id`; Yeti's validator refuses an example without the pair. Put the hint's and the error's ids in the control's `aria-describedby`, so a screen reader hears the help text with the control and the error the moment it appears. Errors found on the server are shown with `aria-invalid="true"`. The required marker is a visual echo of the `required` attribute, which is what is announced.
