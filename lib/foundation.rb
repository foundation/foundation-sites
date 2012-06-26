require "foundation/version"
require "modular-scale"
require "linguistics"
Linguistics::use( :en )
require "compass"
extension_path = File.expand_path(File.dirname(File.dirname(__FILE__)))
Compass::Frameworks.register("foundation", :path => extension_path)
require "foundation/sass_script_functions"

module Foundation
  require "foundation/engine" if defined?(Rails)
end
