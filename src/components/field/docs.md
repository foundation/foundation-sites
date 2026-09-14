## When to use it

Every control in a form: text, email, number, select, textarea, checkbox, radio. A form is a `stack` of fields and a button; the field owns what bare HTML cannot, the label's link to its control, the help text, and the error.

## How it works

A tight column: label, control, hint, error. The control is a native element styled to the control tokens, so a theme that changes `--yeti-control-radius` changes every input. The error is hidden until the control is invalid *and* the visitor has touched it (`:user-invalid`), or until you set `aria-invalid="true"` after a server round trip; then it shows and the border turns to the alert colour. A `required` control gets a marker after its label. A checkbox or radio is laid out inline automatically, label after the control, and is redrawn so its checked colour is the field's variant.

```html
<fieldset class="field">
	<legend>Notify me by</legend>
	<div class="field"><input id="n-email" type="checkbox" name="notify" value="email"><label for="n-email">Email</label></div>
	<div class="field"><input id="n-sms" type="checkbox" name="notify" value="sms"><label for="n-sms">Text message</label></div>
	<p data-hint>Pick as many as you like.</p>
</fieldset>
```

## Accessibility

The label must point at the control with `for` and the control must carry that `id`; Yeti's validator refuses an example without the pair. Put the hint's and the error's ids in the control's `aria-describedby`, so a screen reader hears the help text with the control and the error the moment it appears. Errors found on the server are shown with `aria-invalid="true"`. The required marker is a visual echo of the `required` attribute, which is what is announced.
