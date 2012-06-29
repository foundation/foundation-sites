require "foundation/version"
require "compass"
extension_path = File.expand_path(File.dirname(File.dirname(__FILE__)))
config = {:path => extension_path}
Compass::Frameworks.register("foundation", config)
require "foundation/sass_script_functions"

module Foundation
  require "foundation/engine" if defined?(Rails)
end
