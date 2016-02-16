---
title: Media Object
description: Media objects are super useful components for displaying an item, usually an image, alongside some content, usually text. You could put lists, grids, or even other media objects inside.
sass: scss/components/_media-object.scss
flex: true
---

## Basics

A media object is a container with the class `.media-object`, and two or three sections with the class `.media-object-section`.

```html_example
<div class="media-object">
  <div class="media-object-section">
    <div class="thumbnail">
      <img src= "assets/img/media-object/avatar-1.jpg">
    </div>
  </div>
  <div class="media-object-section">
    <h4>Dreams feel real while we're in them.</h4>
    <p>I'm going to improvise. Listen, there's something you should know about me... about inception. An idea is like a virus, resilient, highly contagious. The smallest seed of an idea can grow. It can grow to define or destroy you.</p>
  </div>
</div>
```

In flexbox mode, the class `.main-section` must be added to your center section in order to properly size it.

```html
<div class="media-object">
  <div class="media-object-section">
    <div class="thumbnail">
      <img src= "assets/img/media-object/avatar-1.jpg">
    </div>
  </div>
  <div class="media-object-section main-section">
    <h4>Dreams feel real while we're in them.</h4>
    <p>I'm going to improvise. Listen, there's something you should know about me... about inception. An idea is like a virus, resilient, highly contagious. The smallest seed of an idea can grow. It can grow to define or destroy you.</p>
  </div>
</div>
```

---

## Section Alignment

Each section aligns to the top by default, but individual sections can also be middle- or bottom-aligned with the `.middle` and `.bottom` classes.

```html_example
<div class="media-object">
  <div class="media-object-section middle">
    <div class="thumbnail">
      <img src= "assets/img/media-object/avatar-2.jpg">
    </div>
  </div>
  <div class="media-object-section">
    <h4>Why is it so important to dream?</h4>
    <p>So, once we've made the plant, how do we go out? Hope you have something more elegant in mind than shooting me in the head? A kick. What's a kick? This, Ariadne, would be a kick.</p>
    <p>What is the most resilient parasite? Bacteria? A virus? An intestinal worm? An idea. Resilient... highly contagious. Once an idea has taken hold of the brain it's almost impossible to eradicate. An idea that is fully formed - fully understood - that sticks; right in there somewhere.</p>
  </div>
  <div class="media-object-section bottom">
    <div class="thumbnail">
      <img src= "assets/img/media-object/avatar-3.jpg">
    </div>
  </div>
</div>
```

In flexbox mode, you can use the <a href="flex-classes.html">flexbox helper classes</a> instead to get the same result. The `.align-*` classes can be used on the container to align every child section at once, or individual child sections can be aligned with `.align-self-*` classes.

```html
<div class="media-object">
  <div class="media-object-section align-self-center">
    <div class="thumbnail">
      <img src= "assets/img/media-object/avatar-2.jpg">
    </div>
  </div>
  <div class="media-object-section main-section">
    <h4>Why is it so important to dream?</h4>
    <p>So, once we've made the plant, how do we go out? Hope you have something more elegant in mind than shooting me in the head? A kick. What's a kick? This, Ariadne, would be a kick.</p>
    <p>What is the most resilient parasite? Bacteria? A virus? An intestinal worm? An idea. Resilient... highly contagious. Once an idea has taken hold of the brain it's almost impossible to eradicate. An idea that is fully formed - fully understood - that sticks; right in there somewhere.</p>
  </div>
  <div class="media-object-section align-self-bottom">
    <div class="thumbnail">
      <img src= "assets/img/media-object/avatar-3.jpg">
    </div>
  </div>
</div>
```

---

### Stack on Small

By adding the `.stack-for-small` class, you can make your media object responsive. Images will get a width of 100%, but this can be changed.

```html_example
<div class="media-object stack-for-small">
  <div class="media-object-section">
    <div class="thumbnail">
      <img src= "assets/img/generic/rectangle-1.jpg">
    </div>
  </div>
  <div class="media-object-section">
    <h4>I Can Stack.</h4>
    <p>Shrink the browser width to see me stack. I do tricks for dog treats, but I'm not a dog.</p>
  </div>
</div>
```

---

### Nesting Media Objects

By nesting a media object into the media-object-section section, you can easily indent it. This is great for comment strings.

```html_example
<div class="media-object">
  <div class="media-object-section">
    <div class="thumbnail">
      <img src= "assets/img/media-object/avatar-1.jpg">
    </div>
  </div>
  <div class="media-object-section">
    <h4>I'm First!</h4>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro at, tenetur cum beatae excepturi id ipsa? Esse dolor laboriosam itaque ea nesciunt, earum, ipsum commodi beatae velit id enim repellat.</p>
    <!-- Nested media object starts here -->
    <div class="media-object">
      <div class="media-object-section">
        <div class="thumbnail">
          <img src= "assets/img/media-object/avatar-2.jpg">
        </div>
      </div>
      <div class="media-object-section">
        <h4>I'm Second!</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas magni, quam mollitia voluptatum in, animi suscipit tempora ea consequuntur non nulla vitae doloremque. Eius rerum, cum earum quae eveniet odio.</p>
      </div>
    </div>
    <!-- And ends here -->
  </div>
</div>
```
