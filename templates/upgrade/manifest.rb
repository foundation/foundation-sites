description 'Foundation Compass Gem'

stylesheet '../../scss/normalize.scss',                   :to => '_normalize.scss'
stylesheet '../../scss/foundation/_variables.scss',       :to => '_settings.scss'

def copy_js_from(relative_path, prefix_path, excludes=[])
  absolute_path = File.join(File.dirname(__FILE__), relative_path, prefix_path)
  js_files = Dir.glob("#{absolute_path}/*.js")
  js_files.reject! {|f| excludes.include? File.basename(f)}
  js_files.each do |js|
    javascript "#{relative_path}/#{prefix_path}/#{File.basename(js)}", 
      :to => "#{prefix_path}/#{File.basename(js)}"
  end
end

javascripts = copy_js_from("../../js", "foundation", ["index.js"])
copy_js_from("../../js", "vendor")

html '../project/index.html', :erb => true, :javascripts => javascripts, :version => Foundation::VERSION, :to => 'upgrade.html'

help %Q{

If you need help, email us at foundation@zurb.com or visit foundation.zurb.com"

}

welcome_message %Q{

bundle exec compass install -r zurb-foundation foundation/upgrade

Your project assets have been upgraded, w00t!  It's possible there have been additional customizable settings added to Foundation so you should check out http://foundation.zurb.com/docs/gem-install.php#settings.

}