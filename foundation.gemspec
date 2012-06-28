# -*- encoding: utf-8 -*-
require File.expand_path('../lib/foundation/version', __FILE__)

Gem::Specification.new do |gem|
  gem.authors       = ["Mark Hayes"]
  gem.email         = ["mark@zurb.com"]
  gem.description   = %q{ZURB Foundation on SASS/Compass}
  gem.summary       = %q{ZURB Foundation on SASS/Compass}
  gem.homepage      = "http://foundation.zurb.com"

  gem.files         = `git ls-files`.split($\).reject {|f| /marketing\/*/.match(f)}
  gem.executables   = gem.files.grep(%r{^bin/}).map{ |f| File.basename(f) }
  gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})
  gem.name          = "foundation"
  gem.require_paths = ["lib"]
  gem.version       = Foundation::VERSION
  
  gem.add_dependency "compass", "0.12.1"
  gem.add_dependency "sass", "3.2.0.alpha.244"
  gem.add_dependency "linguistics", "~> 1.0.9"
  gem.add_dependency "modular-scale", "~> 0.0.5"
  gem.add_dependency "rake"
end
