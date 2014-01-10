foundation + placeholders
=========================

Using the power of SASS' placeholders, it's even easier (and more efficient) to build responsive and semantic sites.

No need to stuff your HTML with class="small-5 preffix-1" nor to repeat the same things over and over in your CSS after using too many @imports.

Inspired by http://ianstormtaylor.com/oocss-plus-sass-is-the-best-way-to-css/

USE:

*Import both _grid AND _grid-placeholders.

*Apply the styles to your desired element with "extend":

    @extend %small-block-grid-2;
    @extend %large-block-grid-5;
