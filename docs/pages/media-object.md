---
title: Media-Object
description: Media Objects are super useful componets for displaying an item, usually an image, alongside some content, usually text. You could put lists, grids, or even other media objects inside.
sass: 
  - scss/components/_media-object.scss
---

### Media-item on the left

```html_example
<div class="media-object">
  <div class="media-item">
    <a href="#">
      <img src= "http://placeimg.com/200/200/people">
    </a>
  </div>
  <div class="media-content">
    <h4 class="media-title">Dreams feel real while we're in them.</h4>
    <p>I'm going to improvise. Listen, there's something you should know about me... about inception. An idea is like a virus, resilient, highly contagious. The smallest seed of an idea can grow. It can grow to define or destroy you.</p>
    <p>So, once we've made the plant, how do we go out? Hope you have something more elegant in mind than shooting me in the head? A kick. What's a kick? This, Ariadne, would be a kick.</p>
  </div>
</div>
```

### Media-item on the right

```html_example
<div class="media-object">
  <div class="media-content">
    <h4 class="media-title">Why is it so important to dream?</h4>
    <p>What is the most resilient parasite? Bacteria? A virus? An intestinal worm? An idea. Resilient... highly contagious. Once an idea has taken hold of the brain it's almost impossible to eradicate. An idea that is fully formed - fully understood - that sticks; right in there somewhere.</p>
  </div>
  <div class="media-item">
    <a href="#">
      <img src= "http://placeimg.com/200/200/people">
    </a>
  </div>
</div>
```
---

### Vertically aligning media-items

By adding a class of `middle` or `bottom`, you can align the item in media item to the middle or bottom of the media-object.

```html_example
<div class="media-object">
  <div class="media-item middle">
    <a href="#">
      <img src= "http://placeimg.com/200/200/people">
    </a>
  </div>
  <div class="media-content">
    <h4 class="media-title">My thing is aligned in the middle</h4>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus excepturi sunt vitae odio voluptates. Dicta voluptatibus natus minus, incidunt facere, suscipit vel aut vero, ex veniam consequuntur dolores quam autem.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus excepturi sunt vitae odio voluptates. Dicta voluptatibus natus minus, incidunt facere, suscipit vel aut vero, ex veniam consequuntur dolores quam autem.</p>
  </div>
</div>

<div class="media-object">
  <div class="media-item bottom">
    <a href="#">
      <img src= "http://placeimg.com/200/200/people">
    </a>
  </div>
  <div class="media-content">
    <h4 class="media-title">Mine is at the bottom</h4>
    <p>If Strike Isn't Settled Quickly, It May Last a While. Red Tape Holds Up New Bridges. Drunk Gets Nine Months in Violin Case. Astronaut Takes Blame for Gas in Spacecraft. Stolen Painting Found by Tree.</p>
    <p>Couple Lost in Corn Maze Call 911. Two Sisters Reunited After 18 Years at Checkout Counter. Man Struck By Lightning Faces Battery Charge. Enraged Cow Injures Farmer With Ax. Typhoon Rips Through Cemetery; Hundreds Dead.</p>
  </div>
</div>
```
---

### Responsive: stack-for-small

By adding the `stack-for-small` class, you can make your media object responsive. Images will get a width of 100%, but you can change that.

```html_example
<div class="media-object stack-for-small">
  <div class="media-item">
    <a href="#">
      <img src= "http://placeimg.com/600/200/people">
    </a>
  </div>
  <div class="media-content">
    <h4 class="media-title">I Can Stack.</h4>
    <p>Shrink the browser width to see me stack. I do tricks for dog treats, but I'm not a dog.</p>
  </div>
</div>
```

---

### Nested Media Objects

By nesting a media object into the media-content section, you can easily indent it. This is great for comment strings.

```html_example
<div class="media-object">
  <div class="media-item">
    <a href="#">
      <img src= "http://placeimg.com/200/200/people">
    </a>
  </div>
  <div class="media-content">
    <h4 class="media-title">I'm First!</h4>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro at, tenetur cum beatae excepturi id ipsa? Esse dolor laboriosam itaque ea nesciunt, earum, ipsum commodi beatae velit id enim repellat.</p>
    <!-- nested media object goes here -->
    <div class="media-object">
      <div class="media-item">
        <a href="#">
          <img src= "http://placeimg.com/200/200/people">
        </a>
      </div>
      <div class="media-content">
        <h4 class="media-title">Nested</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas magni, quam mollitia voluptatum in, animi suscipit tempora ea consequuntur non nulla vitae doloremque. Eius rerum, cum earum quae eveniet odio.</p>
      </div>
    </div>
  </div>
</div>
```

---

### Other uses

It's a versatile component which can be used on many ways.

<div class="row">
  <div class="medium-6 columns">
    <div class="media-object">
      <div class="media-item">
        <a href="#" class="button">Button</a>
        <form>
          <input id="checkbox1" type="checkbox">
        </form>
      </div>
      <div class="media-content">
        <h4 class="media-title">Button and checkbox</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus excepturi sunt vitae odio voluptates. Dicta voluptatibus natus minus, incidunt facere, suscipit vel aut vero, ex veniam consequuntur dolores quam autem.</p>
      </div>
    </div>
  </div>
  <div class="medium-6 columns">
    <div class="media-object">
      <div class="media-item">
        <i class="fi-comments" style="font-size: 32px"></i>
      </div>
      <div class="media-content">
        <h4 class="media-title">With Foundicons!</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus excepturi sunt vitae odio voluptates. Dicta voluptatibus natus minus, incidunt facere, suscipit vel aut vero, ex veniam consequuntur dolores quam autem.</p>
      </div>
    </div>
  </div>
</div>
<br>
<div class="row">
  <div class="medium-6 columns">
    <div class="media-object">
      <div class="media-item">
        <img src= "http://placeimg.com/200/200/people">
      </div>
      <div class="media-content">
        <h4 class="media-title">I like to comment on things!</h4>
        <form>
          <label>
            <textarea placeholder="comment"></textarea>
          </label>
        </form>
      </div>
    </div>
  </div>
  <div class="medium-6 columns">
    <div class="media-object callout secondary">
      <div class="media-item">
        <i class="fi-comments" style="font-size: 32px"></i>
      </div>
      <div class="media-content middle">
        <h4 class="media-title">In a Callout</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus excepturi sunt vitae odio voluptates. Dicta voluptatibus natus minus, incidunt facere.</p>
      </div>
    </div>
  </div>
</div>
