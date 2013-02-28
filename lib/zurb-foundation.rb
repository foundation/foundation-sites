root = File.join(File.dirname(__FILE__), "..")
require "foundation/version"

if defined?(Rails)
  require "foundation/generators/install_generator"
end

module Foundation
  require "foundation/engine" if defined?(Rails)
end
