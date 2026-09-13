## When to use it

Use a frame wherever images of unpredictable shape must present as the same shape: card thumbnails, avatars, a video embed that should not reflow the page while it loads. The frame owns the shape; the media fills it.

## How it works

`aspect-ratio` sizes the frame from its width, and `overflow: hidden` clips. An image or video child is stretched to both dimensions with `object-fit: cover`, so it fills without distortion and loses only the overflow. Any other child, a placeholder or an icon, is centered with flexbox.

## Why this name

Every Layout's Frame, kept: it is what a picture frame does. Foundation 6 had `.responsive-embed` for video ratios only; a frame does the same for anything.
