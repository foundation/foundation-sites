;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs = Foundation.libs || {};

  Foundation.libs.orbit = {
    version: '4.0.0.alpha',

    settings: {
      namespace: '.fndtn.orbit',
      timer: 1500
    },

    init: function(scope, method, options) {
      console.info('init orbit!');
      var self = this;
      $('.orbit-container').each($.proxy(self._init, self));
    },

    _init: function(idx, slider) {
      this._init_timer($(slider), 0);
      // generally we may need to construct markup here
      var slidesContainer = $(".orbit-slides", slider);
      var slides = slidesContainer.children();
      slidesContainer.css("width", slides.length * 100 + "%");
      slides.css("width", 100 / slides.length + "%");

    },

    _init_timer: function($slider, slideIdx) {
      var self = this;
      var totalSlides = $slider.find('.orbit-slides').children().length;
      // $slider.data('activeIndex', ++activeIndex%totalSlides);
      setTimeout(function(){
        $slider.find('.orbit-slides').animate({'marginLeft': '-' + (slideIdx*100) + '%'}, 500);
        self._init_timer($slider, (slideIdx+1)%totalSlides);
      }, self.settings.timer);
    }
  };

  $.fn.orbit = function (options) {
    return this.each(function () {
      var orbit = $.extend({}, ORBIT);
      orbit.init(this, options);
    });
  };

})(Foundation.zj);

/*!
 * jQuery imageready Plugin
 * http://www.zurb.com/playground/
 *
 * Copyright 2011, ZURB
 * Released under the MIT License
 */
(function ($) {

  var options = {};

  $.event.special.imageready = {

    setup: function (data, namespaces, eventHandle) {
      options = data || options;
    },

    add: function (handleObj) {
      var $this = $(this),
          src;

      if ( this.nodeType === 1 && this.tagName.toLowerCase() === 'img' && this.src !== '' ) {
        if (options.forceLoad) {
          src = $this.attr('src');
          $this.attr('src', '');
          bindToLoad(this, handleObj.handler);
          $this.attr('src', src);
        } else if ( this.complete || this.readyState === 4 ) {
          handleObj.handler.apply(this, arguments);
        } else {
          bindToLoad(this, handleObj.handler);
        }
      }
    },

    teardown: function (namespaces) {
      $(this).unbind('.imageready');
    }
  };

  function bindToLoad(element, callback) {
    var $this = $(element);

    $this.bind('load.imageready', function () {
       callback.apply(element, arguments);
       $this.unbind('load.imageready');
     });
  }

}(Foundation.zj));

/*

Holder - 1.3 - client side image placeholders
(c) 2012 Ivan Malopinsky / http://imsky.co

Provided under the Apache 2.0 License: http://www.apache.org/licenses/LICENSE-2.0
Commercial use requires attribution.

*/

var Holder = Holder || {};
(function (app, win) {

var preempted = false,
fallback = false,
canvas = document.createElement('canvas');

//http://javascript.nwbox.com/ContentLoaded by Diego Perini with modifications
function contentLoaded(n,t){var l="complete",s="readystatechange",u=!1,h=u,c=!0,i=n.document,a=i.documentElement,e=i.addEventListener?"addEventListener":"attachEvent",v=i.addEventListener?"removeEventListener":"detachEvent",f=i.addEventListener?"":"on",r=function(e){(e.type!=s||i.readyState==l)&&((e.type=="load"?n:i)[v](f+e.type,r,u),!h&&(h=!0)&&t.call(n,null))},o=function(){try{a.doScroll("left")}catch(n){setTimeout(o,50);return}r("poll")};if(i.readyState==l)t.call(n,"lazy");else{if(i.createEventObject&&a.doScroll){try{c=!n.frameElement}catch(y){}c&&o()}i[e](f+"DOMContentLoaded",r,u),i[e](f+s,r,u),n[e](f+"load",r,u)}};

//https://gist.github.com/991057 by Jed Schmidt with modifications
function selector(a){
	a=a.match(/^(\W)?(.*)/);var b=document["getElement"+(a[1]?a[1]=="#"?"ById":"sByClassName":"sByTagName")](a[2]);
	var ret=[];	b!=null&&(b.length?ret=b:b.length==0?ret=b:ret=[b]);	return ret;
}

//shallow object property extend
function extend(a,b){var c={};for(var d in a)c[d]=a[d];for(var e in b)c[e]=b[e];return c}

function draw(ctx, dimensions, template) {
	var dimension_arr = [dimensions.height, dimensions.width].sort();
	var maxFactor = Math.round(dimension_arr[1] / 16),
		minFactor = Math.round(dimension_arr[0] / 16);
	var text_height = Math.max(template.size, maxFactor);
	canvas.width = dimensions.width;
	canvas.height = dimensions.height;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillStyle = template.background;
	ctx.fillRect(0, 0, dimensions.width, dimensions.height);
	ctx.fillStyle = template.foreground;
	ctx.font = "bold " + text_height + "px sans-serif";
	var text = template.text ? template.text : (dimensions.width + "x" + dimensions.height);
	if (Math.round(ctx.measureText(text).width) / dimensions.width > 1) {
		text_height = Math.max(minFactor, template.size);
	}
	ctx.font = "bold " + text_height + "px sans-serif";
	ctx.fillText(text, (dimensions.width / 2), (dimensions.height / 2), dimensions.width);
	return canvas.toDataURL("image/png");
}

if (!canvas.getContext) {
	fallback = true;
} else {
	if (canvas.toDataURL("image/png").indexOf("data:image/png") < 0) {
		//Android doesn't support data URI
		fallback = true;
	} else {
		var ctx = canvas.getContext("2d");
	}
}

var settings = {
	domain: "holder.js",
	images: "img",
	themes: {
		"gray": {
			background: "#eee",
			foreground: "#aaa",
			size: 12
		},
		"social": {
			background: "#3a5a97",
			foreground: "#fff",
			size: 12
		},
		"industrial": {
			background: "#434A52",
			foreground: "#C2F200",
			size: 12
		}
	}
};



app.flags = {
	dimensions: {
		regex: /([0-9]+)x([0-9]+)/,
		output: function(val){
			var exec = this.regex.exec(val);
			return {
				width: +exec[1],
				height: +exec[2]
			}
		}
	},
	colors: {
		regex: /#([0-9a-f]{3,})\:#([0-9a-f]{3,})/i,
		output: function(val){
			var exec = this.regex.exec(val);
			return {
					size: settings.themes.gray.size,
					foreground: "#" + exec[2],
					background: "#" + exec[1]
					}
		}
	},
	text: {
		regex: /text\:(.*)/,
		output: function(val){
			return this.regex.exec(val)[1];
		}
	}
}

for(var flag in app.flags){
	app.flags[flag].match = function (val){
		return val.match(this.regex)
	}
}

app.add_theme = function (name, theme) {
	name != null && theme != null && (settings.themes[name] = theme);
	return app;
};

app.add_image = function (src, el) {
	var node = selector(el);
	if (node.length) {
		for (var i = 0, l = node.length; i < l; i++) {
			var img = document.createElement("img")
			img.setAttribute("data-src", src);
			node[i].appendChild(img);
		}
	}
	return app;
};

app.run = function (o) {
	var options = extend(settings, o),
		images = selector(options.images),
		preempted = true;

	for (var l = images.length, i = 0; i < l; i++) {
		var theme = settings.themes.gray;
		var src = images[i].getAttribute("data-src") || images[i].getAttribute("src");
		if ( !! ~src.indexOf(options.domain)) {
			var render = false,
				dimensions = null,
				text = null;
			var flags = src.substr(src.indexOf(options.domain) + options.domain.length + 1).split("/");
			for (sl = flags.length, j = 0; j < sl; j++) {
				if (app.flags.dimensions.match(flags[j])) {
					render = true;
					dimensions = app.flags.dimensions.output(flags[j]);
				} else if (app.flags.colors.match(flags[j])) {
					theme = app.flags.colors.output(flags[j]);
				} else if (options.themes[flags[j]]) {
					//If a theme is specified, it will override custom colors
					theme = options.themes[flags[j]];
				} else if (app.flags.text.match(flags[j])) {
					text = app.flags.text.output(flags[j]);
				}
			}
			if (render) {
				images[i].setAttribute("data-src", src);
				var dimensions_caption = dimensions.width + "x" + dimensions.height;
				images[i].setAttribute("alt", text ? text : theme.text ? theme.text + " [" + dimensions_caption + "]" : dimensions_caption);

				// Fallback
        // images[i].style.width = dimensions.width + "px";
        // images[i].style.height = dimensions.height + "px";
				images[i].style.backgroundColor = theme.background;

				var theme = (text ? extend(theme, {
						text: text
					}) : theme);

				if (!fallback) {
					images[i].setAttribute("src", draw(ctx, dimensions, theme));
				}
			}
		}
	}
	return app;
};
contentLoaded(win, function () {
	preempted || app.run()
})

})(Holder, window);
