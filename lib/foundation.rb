require "foundation/version"
require "modular-scale"
require "linguistics"
Linguistics::use( :en )
require "compass"
extension_path = File.expand_path(File.dirname(File.dirname(__FILE__)))
javascripts_dir = "/../../vendor/assets/javascripts/foundation/"
images_dir = "/../../vendor/assets/images/foundation/"
config = {:path => extension_path}
config.merge(:javascripts_dir => javascripts_dir, :images_dir => images_dir) if defined?(Rails)
Compass::Frameworks.register("foundation", config)
require "foundation/sass_script_functions"

module Foundation
  require "foundation/engine" if defined?(Rails)
end
