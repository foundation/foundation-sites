## When to use it

Around anything that should change shape at its own width, when the thing itself cannot measure its own box. A layout can query itself and change its children, but nothing can change its own tracks from inside its own query; wrap it in a container and query that.

## How it works

One declaration: the box becomes a size container. Nothing else. To target it by name in your own CSS, give the container a name in your stylesheet, since a name cannot come from an attribute:

```css
.container.sidebar-slot { container-name: slot; }
@container slot (inline-size < 30rem) { .cluster { flex-direction: column; } }
```

The Yeti layouts that query themselves (`grid` with `data-fold`, `breakout` with notes, `timeline`) do not need one; this is for your own queries and for components that must restyle themselves.

## Why this name

It contains, and it is what a container query measures. Foundation 6's `.grid-container` was a page column; that job is `center`.
