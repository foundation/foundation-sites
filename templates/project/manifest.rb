description 'Foundation Compass Gem'

# Sass Files
stylesheet 'sass/_settings.scss',                                 :to => '_settings.scss'
stylesheet 'sass/foundation-style/globals.scss',                  :to => 'foundation-style/globals.scss', :media => "screen, projector, print"
stylesheet 'sass/foundation-style/typography.scss',               :to => 'foundation-style/typography.scss', :media => "screen, projector, print"
stylesheet 'sass/foundation-style/grid.scss',                     :to => 'foundation-style/grid.scss', :media => "screen, projector, print"
stylesheet 'sass/foundation-style/ui.scss',                       :to => 'foundation-style/ui.scss', :media => "screen, projector, print"
stylesheet 'sass/foundation-style/buttons.scss',                  :to => 'foundation-style/buttons.scss', :media => "screen, projector, print"
stylesheet 'sass/foundation-style/tabs.scss',                     :to => 'foundation-style/tabs.scss', :media => "screen, projector, print"
stylesheet 'sass/foundation-style/navbar.scss',                   :to => 'foundation-style/navbar.scss', :media => "screen, projector, print"
stylesheet 'sass/foundation-style/forms.scss',                    :to => 'foundation-style/forms.scss', :media => "screen, projector, print"
stylesheet 'sass/foundation-style/orbit.scss',                    :to => 'foundation-style/orbit.scss', :media => "screen, projector, print"
stylesheet 'sass/foundation-style/reveal.scss',                   :to => 'foundation-style/reveal.scss', :media => "screen, projector, print"
stylesheet 'sass/app.scss',                                       :to => 'app.scss', :media => "screen, projector, print"

# Relative asset paths
js_path = "/../../vendor/assets/javascripts/foundation"
images_path = "/../../vendor/assets/images/foundation"

# Javascripts
javascript "#{js_path}/jquery.min.js",             :to => "jquery.min.js"
javascript "#{js_path}/modernizr.foundation.js",   :to => "foundation/modernizr.foundation.js"
javascript "#{js_path}/jquery.customforms.js",     :to => "foundation/jquery.customforms.js"
javascript "#{js_path}/jquery.reveal.js",          :to => "foundation/jquery.reveal.js"
javascript "#{js_path}/jquery.orbit-1.4.0.js",     :to => "foundation/jquery.orbit-1.4.0.js"
javascript "#{js_path}/jquery.tooltips.js",        :to => "foundation/jquery.tooltips.js"
javascript "#{js_path}/jquery.placeholder.min.js", :to => "foundation/jquery.placeholder.min.js"
javascript "#{js_path}/app.js",                    :to => "app.js"

# Make sure you list all the project template files here in the manifest.
html 'index.html'
file 'humans.txt'
file 'robots.txt'
file 'MIT-LICENSE.txt'

# Image Files
image "#{images_path}/orbit/bullets.jpg",                   :to => "foundation/orbit/bullets.jpg"
image "#{images_path}/orbit/left-arrow.png",                :to => "foundation/orbit/left-arrow.png"
image "#{images_path}/orbit/left-arrow-small.png",          :to => "foundation/orbit/left-arrow-small.png"
image "#{images_path}/orbit/loading.gif",                   :to => "foundation/orbit/loading.gif"
image "#{images_path}/orbit/mask-black.png",                :to => "foundation/orbit/mask-black.png"
image "#{images_path}/orbit/pause-black.png",               :to => "foundation/orbit/pause-black.png"
image "#{images_path}/orbit/right-arrow.png",               :to => "foundation/orbit/right-arrow.png"
image "#{images_path}/orbit/right-arrow-small.png",         :to => "foundation/orbit/right-arrow-small.png"
image "#{images_path}/orbit/rotator-black.png",             :to => "foundation/orbit/rotator-black.png"
image "#{images_path}/orbit/timer-black.png",               :to => "foundation/orbit/timer-black.png"


help %Q{

If you need help, email us at foundation@zurb.com or visit foundation.zurb.com"

}

welcome_message %Q{

w00t! You're using ZURB Foundation, now go forth and rock 'n roll!

}
