root = File.join(File.dirname(__FILE__), "..")
require "foundation/version"

if defined?(Rails::Generators::Base)
  require "foundation/generators/install_generator"
end

module Foundation
  if defined?(Rails::Engine)
    require "foundation/engine"
  elsif defined?(Sprockets)
    require "foundation/sprockets"
  end
end

if defined?(Compass)
  Compass::Frameworks.register("foundation",
    :stylesheets_directory => File.join(root,"scss"),
    :templates_directory => File.join(root,"templates")
  )
end
