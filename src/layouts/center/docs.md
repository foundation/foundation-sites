## When to use it

A center is the page column: the wrapper that keeps a page or a section from spreading across a wide screen, and keeps it off the edges of a narrow one. Use `data-max="lg"` for reading, `xl` or `2xl` for pages with sidebars and grids.

## How it works

`max-inline-size` caps the content, automatic inline margins split the remaining space equally, and `padding-inline` supplies the gutters. The box is `content-box`, so `data-max` is the width of the content, not the content plus gutters. `data-intrinsic` turns it into a flex column that centers each child on its own width, for a heading and a button that should sit in the middle rather than stretch.

## Why this name

Every Layout's Center, kept, because centering is the whole job. Foundation 6 readers: this is `.grid-container`, with the width and gutters as attributes instead of Sass variables.
