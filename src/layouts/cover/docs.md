## When to use it

A cover is the hero section, the sign-in screen, the "coming soon" page: one thing centered in the height of the viewport, with a navigation bar above it or a footnote below it when you want them.

## How it works

The cover is a flex column with a minimum block size of `--yeti-cover-height`, `100dvh` by default so it tracks the browser chrome on phones. The child marked `data-center` gets automatic block margins, which take up all the free space equally above and below it; anything else sits at its natural size at the top or bottom. The gap keeps the centered child from touching its neighbours when the content is taller than the viewport.

## Why this name

The block covers the viewport. Foundation 6 had no primitive for this; people combined a full-height utility with vertical alignment classes on the grid.
