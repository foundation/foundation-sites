---
title: Tables
description: Okay, they're not the sexiest things ever, but tables get the job done (for tabular data, of course). They have responsive modifiers to help solve some of your layout issues based on your tables needs.
sass: scss/components/_table.scss
---

## Basic Table

```html_example
<table>
  <thead>
    <tr>
      <th width="200">Table Header</th>
      <th>Table Header</th>
      <th width="150">Table Header</th>
      <th width="150">Table Header</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Content Goes Here</td>
      <td>This is longer content Donec id elit non mi porta gravida at eget metus.</td>
      <td>Content Goes Here</td>
      <td>Content Goes Here</td>
    </tr>
    <tr>
      <td>Content Goes Here</td>
      <td>This is longer Content Goes Here Donec id elit non mi porta gravida at eget metus.</td>
      <td>Content Goes Here</td>
      <td>Content Goes Here</td>
    </tr>
    <tr>
      <td>Content Goes Here</td>
      <td>This is longer Content Goes Here Donec id elit non mi porta gravida at eget metus.</td>
      <td>Content Goes Here</td>
      <td>Content Goes Here</td>
    </tr>
  </tbody>
</table>
```

---

## Stacked Table

```html_example
<table class="stack">
  <thead>
    <tr>
      <th width="200">Table Header</th>
      <th>Table Header</th>
      <th width="150">Table Header</th>
      <th width="150">Table Header</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Content Goes Here</td>
      <td>This is longer content Donec id elit non mi porta gravida at eget metus.</td>
      <td>Content Goes Here</td>
      <td>Content Goes Here</td>
    </tr>
    <tr>
      <td>Content Goes Here</td>
      <td>This is longer Content Goes Here Donec id elit non mi porta gravida at eget metus.</td>
      <td>Content Goes Here</td>
      <td>Content Goes Here</td>
    </tr>
    <tr>
      <td>Content Goes Here</td>
      <td>This is longer Content Goes Here Donec id elit non mi porta gravida at eget metus.</td>
      <td>Content Goes Here</td>
      <td>Content Goes Here</td>
    </tr>
  </tbody>
</table>
```

---

## Scroll Table

```html_example
  <table class="table-scroll">
    <thead>
      <tr>
        <th>Table Header</th>
        <th width="400">Table Header</th>
        <th>Table Header</th>
        <th>Table Header</th>
        <th>Table Header</th>
        <th>Table Header</th>
        <th>Table Header</th>
        <th>Table Header</th>
        <th>Table Header</th>
        <th>Table Header</th>
        <th>Table Header</th>
        <th>Table Header</th>
        <th>Table Header</th>
        <th>Table Header</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Content Goes Here</td>
        <td>Hey This is longer content Donec id elit non mi porta gravida at eget metus.</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
      </tr>
      <tr>
        <td>Content Goes Here</td>
        <td>This is longer Content Goes Here Donec id elit non mi porta gravida at eget metus.</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
      </tr>
      <tr>
        <td>Content Goes Here</td>
        <td>This is longer Content Goes Here Donec id elit non mi porta gravida at eget metus.</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
        <td>Content Goes Here</td>
      </tr>
    </tbody>
  </table>
```