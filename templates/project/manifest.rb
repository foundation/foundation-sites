description 'Foundation Compass Gem'

# Sass Files
file 'scss/_settings.scss',                         :to => 'scss/_settings.scss'
file 'scss/normalize.scss',                         :to => 'scss/normalize.scss', :media => "screen, projector, print"
file 'scss/app.scss',                               :to => 'scss/app.scss', :media => "screen, projector, print"

# Make sure you list all the project template files here in the manifest.
file 'humans.txt'
file 'robots.txt'
file 'MIT-LICENSE.txt'

def copy_js_from(relative_path, prefix_path, excludes=[])
  absolute_path = File.join(File.dirname(__FILE__), relative_path, prefix_path)
  js_files = Dir.glob("#{absolute_path}/*.js")
  js_files.reject! {|f| excludes.include? File.basename(f)}
  js_files.each do |js|
    file "#{relative_path}/#{prefix_path}/#{File.basename(js)}",
      :to => "js/#{prefix_path}/#{File.basename(js)}"
  end
  return js_files.map {|f| "#{prefix_path}/#{File.basename(f)}"}
end

javascripts = copy_js_from("../../js", "foundation", ["index.js"])
vendor_javascripts = copy_js_from("../../js", "vendor")

# javascripts.reject! do |f|
#   [
#     "jquery.js",
#     "modernizr.foundation.js",
#     "app.js",
#     "jquery.offcanvas.js"
#   ].include?(File.basename(f))
# end

html 'index.html', :erb => true, :javascripts => javascripts, :version => Foundation::VERSION

help %Q{

If you need help, email us at foundation@zurb.com or visit foundation.zurb.com"

}

welcome_message %Q{

w00t! You're using ZURB Foundation, now go forth and rock 'n roll!

}

file 'config.rb'

no_configuration_file!