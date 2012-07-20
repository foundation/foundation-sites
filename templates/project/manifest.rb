description 'Foundation Compass Gem'

# Sass Files
stylesheet 'sass/_settings.scss',                                 :to => '_settings.scss'
stylesheet 'sass/foundation/globals.scss',                  :to => 'foundation-style/globals.scss', :media => "screen, projector, print"
stylesheet 'sass/foundation/typography.scss',               :to => 'foundation-style/typography.scss', :media => "screen, projector, print"
stylesheet 'sass/foundation/grid.scss',                     :to => 'foundation-style/grid.scss', :media => "screen, projector, print"
stylesheet 'sass/foundation/ui.scss',                       :to => 'foundation-style/ui.scss', :media => "screen, projector, print"
stylesheet 'sass/foundation/buttons.scss',                  :to => 'foundation-style/buttons.scss', :media => "screen, projector, print"
stylesheet 'sass/foundation/tabs.scss',                     :to => 'foundation-style/tabs.scss', :media => "screen, projector, print"
stylesheet 'sass/foundation/navbar.scss',                   :to => 'foundation-style/navbar.scss', :media => "screen, projector, print"
stylesheet 'sass/foundation/forms.scss',                    :to => 'foundation-style/forms.scss', :media => "screen, projector, print"
stylesheet 'sass/foundation/orbit.scss',                    :to => 'foundation-style/orbit.scss', :media => "screen, projector, print"
stylesheet 'sass/foundation/reveal.scss',                   :to => 'foundation-style/reveal.scss', :media => "screen, projector, print"
stylesheet 'sass/app.scss',                                       :to => 'app.scss', :media => "screen, projector, print"

# Relative asset paths
js_path = "/../../vendor/assets/javascripts/foundation"
compressed_js_path = "/../../public/assets"
images_path = "/../../vendor/assets/images/foundation"

# Compressed Javascripts
javascript "#{compressed_js_path}/jquery.js",             :to => "jquery.min.js"
javascript "#{compressed_js_path}/foundation.js",         :to => "foundation.min.js"

# Uncompressed Javascripts
javascript "#{js_path}/jquery.js",                        :to => "jquery.js"
javascript "#{js_path}/modernizr.foundation.js",          :to => "foundation/modernizr.foundation.js"
javascript "#{js_path}/jquery.placeholder.js",            :to => "foundation/jquery.placeholder.js"
javascript "#{js_path}/jquery.foundation.alerts.js",      :to => "foundation/jquery.foundation.alerts.js"
javascript "#{js_path}/jquery.foundation.accordion.js",   :to => "foundation/jquery.foundation.accordion.js" 
javascript "#{js_path}/jquery.foundation.buttons.js",     :to => "foundation/jquery.foundation.buttons.js"
javascript "#{js_path}/jquery.foundation.tooltips.js",    :to => "foundation/jquery.foundation.tooltips.js"
javascript "#{js_path}/jquery.foundation.forms.js",       :to => "foundation/jquery.foundation.forms.js"
javascript "#{js_path}/jquery.foundation.tabs.js",        :to => "foundation/jquery.foundation.tabs.js"
javascript "#{js_path}/jquery.foundation.navigation.js",  :to => "foundation/jquery.foundation.navigation.js"
javascript "#{js_path}/jquery.foundation.reveal.js",      :to => "foundation/jquery.foundation.reveal.js"
javascript "#{js_path}/jquery.foundation.orbit.js",       :to => "foundation/jquery.foundation.orbit.js"

# Customizable Javascript
javascript "#{js_path}/app.js",                           :to => "app.js"

# Make sure you list all the project template files here in the manifest.
html 'index.html', :erb => true
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
