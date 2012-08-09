root = File.join(File.dirname(__FILE__), "..")
require "foundation/version"
require "compass"
require "modular-scale"

Compass::Frameworks.register("foundation",
  :stylesheets_directory => File.join(root,"scss"),
  :templates_directory => File.join(root,"templates"),
  :images_dir => File.join(root,"vendor","assets","images","foundation")
)

if defined?(Rails)
  require "foundation/generators/layout_generator"
  require "foundation/generators/install_generator"
end

module Foundation
  require "foundation/engine" if defined?(Rails)
end
