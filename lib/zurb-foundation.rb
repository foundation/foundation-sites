require 'foundation/version'
if defined?(Rails)
  require "foundation/generators/layout_generator"
  require "foundation/generators/install_generator"
end
require 'compass'
require 'modular-scale'
extension_path = File.expand_path(File.join(File.dirname(__FILE__), '..'))
Compass::Frameworks.register('foundation', :path => extension_path)

module Foundation
  require "foundation/engine" if defined?(Rails)
end
