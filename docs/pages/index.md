---
title: Foundation for Sites
description: We built Foundation for Sites to be the most advanced responsive front-end framework in the world.
tags:
- index
- home
layout: homepage
---

<div class="row">
  <div class="medium-6 columns">
    <h2 id="installing-foundation">Installing Foundation</h2>
    <p>There are a number of ways to install Foundation for Sites. If you're just getting started, we recommend installing our CLI, which allows you to quickly set up starter projects with any Foundation framework.</p>
    <p>It's also possible to manually install Foundation for Sites into your project through NPM, Bower, Meteor, or Composer.</p>
    <a href="installation.html" class="button-docs">Install Foundation for Sites</a>
    <ul class="dropdown menu docs-dropdown align-top" data-dropdown-menu>
      <li>
        <a href="#">Other versions</a>
        <ul class="menu">
          <li><a href="http://foundation.zurb.com/sites/docs/v/5.5.3"><i class="di-open"></i>Foundation 5</a></li>
          <li><a href="http://foundation.zurb.com/sites/docs/v/4.3.2"><i class="di-open"></i>Foundation 4</a></li>
          <li><a href="http://foundation.zurb.com/sites/docs/v/3.2.5/"><i class="di-open"></i>Foundation 3</a></li>
        </ul>
      </li>
    </ul>
    <p class="docs-nav-version">
      <span data-docs-version></span>
      <a href="https://github.com/zurb/foundation-sites/releases/" target="_blank">(Changelog)</a>
    </p>
    <br>
  </div>
  <div class="medium-6 columns">
    <h2 id="learning-foundation">Learning Foundation</h2>
    <h4>Understanding the framework</h4>
    <p>With an easy to understand syntax and consistent structure, you’ll learn your way around Foundation in no time!</p>

    <div class="row up-1 medium-up-2 large-up-3 docs-big-index">
      <div class="column"><a href="global.html">
        <strong>Getting Started</strong>
        <p>6 part video series</p>
      </a></div>
      <div class="column"><a href="global.html">
        <strong>Templates</strong>
        <p>Annotated for beginners</p>
      </a></div>
      <div class="column"><a href="global.html">
        <strong>Lessons</strong>
        <p>Specific intro lessons</p>
      </a></div>
    </div>


  </div>
</div>

---
<div class="row columns">
  <h2 id="documentation">Documentation</h2>
</div>

<div class="row">
  <div class="medium-12 large-6 columns columns">

    <div class="flex-video widescreen">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/UVLINsAuFEI" frameborder="0" allowfullscreen></iframe>
    </div>
    <h4 class="subheader" id="most-viewed-pages">Most-viewed Pages</h4>
    <!-- @TODO: Add real links -->
    <ul class="icon-buttons-docs row small-up-2 medium-up-2 large-up-4" data-equalizer data-equalize-on="medium">
      <li class="column" data-equalizer-watch>
        <a href="#">
          <img src="assets/icons/general.svg" alt="Grid"> Grid
        </a>
      </li>
      <li class="column" data-equalizer-watch>
        <a href="#">
          <img src="assets/icons/settings.svg" alt="Buttons and Controls"> Buttons &amp; Controls
        </a>
      </li>
      <li class="column" data-equalizer-watch>
        <a href="#">
          <img src="assets/icons/navigation.svg" alt="Buttons and Controls"> Navigation
        </a>
      </li>
      <li class="column" data-equalizer-watch>
        <a href="#">
          <img src="assets/icons/general.svg" alt="Buttons and Controls"> Forms
        </a>
      </li>
      <li class="column" data-equalizer-watch>
        <a href="#">
          <img src="assets/icons/typography.svg" alt="Buttons and Controls"> Typography
        </a>
      </li>
      <li class="column" data-equalizer-watch>
        <a href="#">
          <img src="assets/icons/sass.svg" alt="Buttons and Controls"> Sass
        </a>
      </li>
      <li class="column" data-equalizer-watch>
        <a href="#">
          <img src="assets/icons/navigation.svg" alt="Buttons and Controls"> Top Bar
        </a>
      </li>
      <li class="column" data-equalizer-watch>
        <a href="#">
          <img src="assets/icons/plugins.svg" alt="Buttons and Controls"> Abide
        </a>
      </li>
    </ul>
  </div>
  <div class="medium-12 large-6 columns docs-stacked-spacing" style="margin-top:0">
    <ul class="faq-accordion" data-accordion style="margin-top:0">
      <li class="faq-accordion-item" data-accordion-item>
        <a href="#" class="faq-accordion-title">Getting Help</a>
        <div class="faq-accordion-content" data-tab-content>
          This is where the content goes.
        </div>
      </li>
      <li class="faq-accordion-item" data-accordion-item>
        <a href="#" class="faq-accordion-title">Using code in your projects</a>
        <div class="faq-accordion-content" data-tab-content>
          This is where the content goes.
        </div>
      </li>
      <li class="faq-accordion-item" data-accordion-item>
        <a href="#" class="faq-accordion-title">Keyboard shortcuts</a>
        <div class="faq-accordion-content" data-tab-content>
          This is where the content goes.
        </div>
      </li>
    </ul>
  </div>
</div>


---


<div class="row columns">
  <h2>Templates</h2>
  <h4 class="subheader">Quickly get started with our ready-to-use Foundation templates.</h4>
  <hr class="docs-hr-small">

  <!-- @TODO: Add real content -->
  <div class="row small-up-2 medium-up-3 large-up-3">
    {{#repeat 6}}
    <div class="column docs-grid-content-block">
      <img src="http://foundation.zurb.com/assets/img/sites-templates/f6-template-news-mag.svg" alt="" />
      <h5>Blog w/ Sidebar</h5>
      <p>Large images, an easy to navigate layout, and versatile sidebar will help you get your blog up and running.</p>
    </div>
    {{/repeat}}
  </div>

  <a href="#" class="button-docs secondary">View All Templates</a>

</div>


---

<div class="row columns">
  <h2>Built with Foundation</h2>
  <p class="subheader">Thousands of the world’s biggest and most trusted brands (like Disney, Adobe, Amazon, and more) have chosen to build their responsive websites on the Foundation framework.</p>
  <hr class="docs-hr-small">

  <!-- @TODO: make this its own component instead of being specific -->
  <div class="docs-examples small-up-2 medium-up-2 large-up-5 row">
    {{#repeat 5}}
      <div class="section-inspiration column">
        <div class="image-container">
          <a href="#">
            <img src="https://prod-university-library.s3.amazonaws.com/uploads/site/mobile_screenshot/17537/Screen_Shot_2016-08-04_at_10.02.33_AM.png" alt="" />
          </a>
        </div>
        <h5>Snapfish</h5>
        <p>Snapfish jams a ton of navigation power to help people find where they are going.</p>
        <a href="#" class="secondary button-docs">Take a look <i class="di-arrow-right di-margin-left"></i></a>
      </div>
      {{/repeat}}
    </div>

  <a href="#" class="button-docs secondary">View More Sites Built with Foundation</a>
</div>

---

<div class="row columns">
  <h2>Ready to Start?</h2>
  <p>Join millions of designers and developers around the world that use Foundation to build beautiful responsive websites every day.</p>
  <a href="installation.html" class="large button-docs">Install Foundation for Sites</a>
</div>
