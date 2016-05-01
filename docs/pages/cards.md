---
title: Cards
description: Extending columns to cards with header, footer and image support.
sass: scss/components/_cards.scss
---

## Basics

A card is an extended column with the `.card` class applied.

```html_example
<div class="row">
    <div class="column card">
        <div class="card-block">
            <h4 class="card-title">Card title</h4>
            <p class="card-text">This is the card content block.</p>
        </div>
    </div>
</div>
```

## Image

A card can contain an image as first element or in between.

```html_example
<div class="row">
    <div class="column card">
        <img class="card-img-top" src="assets/img/generic/rectangle-1.jpg" alt="Card image cap">
        <div class="card-block">
            <h4 class="card-title">Card title</h4>
            <p class="card-text">Lorem ipsum sapientem ne neque dolor erat,eros solet invidunt duo Quisque aliquid leo. Pretium patrioque sociis eu nihil Cum enim ad, ipsum alii vidisse justo id. Option porttitor diam voluptua. Cu Eam augue dolor dolores quis, Nam aliquando elitr Etiam consetetur. Fringilla lucilius mel adipiscing rebum. Sit nulla Integer ad volumus, dicta scriptorem viderer lobortis est Utinam, enim commune corrumpit Aenean erat tellus. Metus sed amet dolore justo, gubergren sed. </p>
        </div>
    </div>
</div>
```

## Header

The card header is emphasized.

```html_example
<div class="row">
    <div class="column card">
        <div class="card-header"><h4>Card header</h4></div>
        <div class="card-block">
            <p class="card-text">Lorem ipsum sapientem ne neque dolor erat,eros solet invidunt duo Quisque aliquid leo. Pretium patrioque sociis eu nihil Cum enim ad, ipsum alii vidisse justo id. Option porttitor diam voluptua. Cu Eam augue dolor dolores quis, Nam aliquando elitr Etiam consetetur. Fringilla lucilius mel adipiscing rebum. Sit nulla Integer ad volumus, dicta scriptorem viderer lobortis est Utinam, enim commune corrumpit Aenean erat tellus. Metus sed amet dolore justo, gubergren sed. </p>
        </div>
    </div>
</div>
```

## Footer

The card footer is align at the bottom of the card. All footers are align equaly.

```html_example
<div class="row small-up-2 medium-up-3 large-up-4">
    <div class="column card">
        <div class="card-block">
            <h4 class="card-title">Card title</h4>
            <p class="card-text">Lorem ipsum sapientem ne neque dolor erat,eros solet invidunt duo Quisque aliquid leo. Pretium patrioque sociis eu nihil Cum enim ad, ipsum alii vidisse justo id. Option porttitor diam voluptua. Cu Eam augue dolor dolores quis, Nam aliquando elitr Etiam consetetur. Fringilla lucilius mel adipiscing rebum. Sit nulla Integer ad volumus, dicta scriptorem viderer lobortis est Utinam, enim commune corrumpit Aenean erat tellus. Metus sed amet dolore justo, gubergren sed. </p>
        </div>
        <div class="card-footer">
            <small>This is the first footer</small>
        </div>
    </div>
    <div class="column card">
        <div class="card-block">
            <h4 class="card-title">Card title</h4>
            <p class="card-text">Lorem ipsum sapientem ne neque dolor erat,eros solet invidunt duo Quisque aliquid leo. Pretium patrioque sociis eu nihil Cum enim ad, ipsum alii vidisse justo id. Option porttitor diam voluptua. Cu Eam augue dolor dolores quis, Nam aliquando elitr Etiam consetetur. Fringilla lucilius mel adipiscing rebum. Sit nulla Integer ad volumus, dicta scriptorem viderer lobortis est Utinam, enim commune corrumpit Aenean erat tellus. Metus sed amet dolore justo, gubergren sed. </p>
            <p class="card-text">Lorem ipsum sapientem ne neque dolor erat,eros solet invidunt duo Quisque aliquid leo. Pretium patrioque sociis eu nihil Cum enim ad, ipsum alii vidisse justo id. Option porttitor diam voluptua. Cu Eam augue dolor dolores quis, Nam aliquando elitr Etiam consetetur. Fringilla lucilius mel adipiscing rebum. Sit nulla Integer ad volumus, dicta scriptorem viderer lobortis est Utinam, enim commune corrumpit Aenean erat tellus. Metus sed amet dolore justo, gubergren sed. </p>
        </div>
        <div class="card-footer">
            <small>This is the second footer</small>
        </div>
    </div>
</div>
```

## Button

Cards also may contain a button. To fit the best the button should have the class `.expanded`. Button groups will also work.

```html_example
<div class="row">
    <div class="column card">
        <div class="card-block">
            <h4 class="card-title">Card title</h4>
            <p class="card-text">Lorem ipsum sapientem ne neque dolor erat,eros solet invidunt duo Quisque aliquid leo. Pretium patrioque sociis eu nihil Cum enim ad, ipsum alii vidisse justo id. Option porttitor diam voluptua. Cu Eam augue dolor dolores quis, Nam aliquando elitr Etiam consetetur. Fringilla lucilius mel adipiscing rebum. Sit nulla Integer ad volumus, dicta scriptorem viderer lobortis est Utinam, enim commune corrumpit Aenean erat tellus. Metus sed amet dolore justo, gubergren sed. </p>
        </div>
        <div class="card-button">
            <button class="button expanded">Button</button>
        </div>
    </div>
</div>
```

## Blocks

Cards work best with block width defined on rows.

```html_example
<div class="row small-up-2 medium-up-3 large-up-4">
    <div class="column card">
        <img class="card-img-top" src="assets/img/generic/rectangle-1.jpg">
        <div class="card-block">
            <h4 class="card-title">Card title</h4>
            <p class="card-text">Lorem ipsum sapientem ne neque dolor erat,eros solet invidunt duo Quisque aliquid leo. Pretium patrioque sociis eu nihil Cum enim ad, ipsum alii vidisse justo id. Option porttitor diam voluptua. Cu Eam augue dolor dolores quis, Nam aliquando elitr Etiam consetetur. Fringilla lucilius mel adipiscing rebum. Sit nulla Integer ad volumus, dicta scriptorem viderer lobortis est Utinam, enim commune corrumpit Aenean erat tellus. Metus sed amet dolore justo, gubergren sed. </p>
        </div>
        <div class="card-footer">
            <small>Card footer</small>
        </div>
    </div>
    <div class="column card">
        <div class="card-header"><h4>Card header</h4></div>
        <div class="card-block">
            <p class="card-text">Lorem ipsum sapientem ne neque dolor erat,eros solet invidunt duo Quisque aliquid leo. Pretium patrioque sociis eu nihil Cum enim ad, ipsum alii vidisse justo id. Option porttitor diam voluptua. Cu Eam augue dolor dolores quis, Nam aliquando elitr Etiam consetetur. Fringilla lucilius mel adipiscing rebum. Sit nulla Integer ad volumus, dicta scriptorem viderer lobortis est Utinam, enim commune corrumpit Aenean erat tellus. Metus sed amet dolore justo, gubergren sed. </p>
        </div>
    </div>
    <div class="column card">
        <div class="card-block">
            <h4 class="card-title">Card title</h4>
            <p class="card-text">Lorem ipsum sapientem ne neque dolor erat,eros solet invidunt duo Quisque aliquid leo. Pretium patrioque sociis eu nihil Cum enim ad, ipsum alii vidisse justo id. Option porttitor diam voluptua. Cu Eam augue dolor dolores quis, Nam aliquando elitr Etiam consetetur. Fringilla lucilius mel adipiscing rebum. Sit nulla Integer ad volumus, dicta scriptorem viderer lobortis est Utinam, enim commune corrumpit Aenean erat tellus. Metus sed amet dolore justo, gubergren sed. </p>
        </div>
        <div class="card-footer">
            <small>This is the first footer</small>
        </div>
    </div>
    <div class="column card">
        <div class="card-block">
            <h4 class="card-title">Card title</h4>
            <p class="card-text">Lorem ipsum sapientem ne neque dolor erat,eros solet invidunt duo Quisque aliquid leo. Pretium patrioque sociis eu nihil Cum enim ad, ipsum alii vidisse justo id. Option porttitor diam voluptua. Cu Eam augue dolor dolores quis, Nam aliquando elitr Etiam consetetur. Fringilla lucilius mel adipiscing rebum. Sit nulla Integer ad volumus, dicta scriptorem viderer lobortis est Utinam, enim commune corrumpit Aenean erat tellus. Metus sed amet dolore justo, gubergren sed. </p>
            <p class="card-text">Lorem ipsum sapientem ne neque dolor erat,eros solet invidunt duo Quisque aliquid leo. Pretium patrioque sociis eu nihil Cum enim ad, ipsum alii vidisse justo id. Option porttitor diam voluptua. Cu Eam augue dolor dolores quis, Nam aliquando elitr Etiam consetetur. Fringilla lucilius mel adipiscing rebum. Sit nulla Integer ad volumus, dicta scriptorem viderer lobortis est Utinam, enim commune corrumpit Aenean erat tellus. Metus sed amet dolore justo, gubergren sed. </p>
        </div>
        <div class="card-footer">
            <small>This is the second footer</small>
        </div>
    </div>
    <div class="column card">
        <div class="card-block">
            <h4 class="card-title">Card title</h4>
            <p class="card-text">Lorem ipsum sapientem ne neque dolor erat,eros solet invidunt duo Quisque aliquid leo. Pretium patrioque sociis eu nihil Cum enim ad, ipsum alii vidisse justo id. Option porttitor diam voluptua. Cu Eam augue dolor dolores quis, Nam aliquando elitr Etiam consetetur. Fringilla lucilius mel adipiscing rebum. Sit nulla Integer ad volumus, dicta scriptorem viderer lobortis est Utinam, enim commune corrumpit Aenean erat tellus. Metus sed amet dolore justo, gubergren sed. </p>
        </div>
        <div class="card-button">
            <button class="button expanded">Button</button>
        </div>
    </div>
</div>
```
