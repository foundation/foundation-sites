require 'foundation/version'
require 'compass'
extension_path = File.expand_path(File.join(File.dirname(__FILE__), '..'))
Compass::Frameworks.register('foundation', :path => extension_path)

module Foundation
  require "foundation/engine" if defined?(Rails)
end
