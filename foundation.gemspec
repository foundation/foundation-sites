# -*- encoding: utf-8 -*-
require File.expand_path('../lib/foundation/version', __FILE__)

Gem::Specification.new do |gem|
  gem.authors       = ["ZURB"]
  gem.email         = ["foundation@zurb.com"]
  gem.description   = %q{ZURB Foundation on Sass/Compass}
  gem.summary       = %q{ZURB Foundation on Sass/Compass}
  gem.homepage      = "http://foundation.zurb.com"

  gem.files         = `git ls-files`.split($\)
  gem.executables   = gem.files.grep(%r{^bin/}).map{ |f| File.basename(f) }
  gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})
  gem.name          = "zurb-foundation"
  gem.require_paths = ["lib"]
  gem.version       = Foundation::VERSION

  gem.add_dependency "sass", [">= 3.2.0"]
  gem.add_development_dependency "rake"
  gem.add_development_dependency "jasmine"
end
