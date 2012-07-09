description 'Foundation Compass Gem'

# Sass Files
stylesheet 'sass/_settings.scss',                           :to => '_settings.scss'
stylesheet 'sass/foundation/foundation-base.scss',          :to => 'foundation/foundation-base.scss', :media => "screen, projector, print"
stylesheet 'sass/foundation/globals.scss',                  :to => 'foundation/globals.scss', :media => "screen, projector, print"
stylesheet 'sass/foundation/typography.scss',               :to => 'foundation/typography.scss', :media => "screen, projector, print"
stylesheet 'sass/foundation/grid.scss',                     :to => 'foundation/grid.scss', :media => "screen, projector, print"
stylesheet 'sass/foundation/ui.scss',                       :to => 'foundation/ui.scss', :media => "screen, projector, print"
stylesheet 'sass/foundation/buttons.scss',                  :to => 'foundation/buttons.scss', :media => "screen, projector, print"
stylesheet 'sass/foundation/tabs.scss',                     :to => 'foundation/tabs.scss', :media => "screen, projector, print"
stylesheet 'sass/foundation/navbar.scss',                   :to => 'foundation/navbar.scss', :media => "screen, projector, print"
stylesheet 'sass/foundation/forms.scss',                    :to => 'foundation/forms.scss', :media => "screen, projector, print"
stylesheet 'sass/foundation/orbit.scss',                    :to => 'foundation/orbit.scss', :media => "screen, projector, print"
stylesheet 'sass/foundation/reveal.scss',                   :to => 'foundation/reveal.scss', :media => "screen, projector, print"
stylesheet 'sass/app.scss',                                 :to => 'app.scss', :media => "screen, projector, print"

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
