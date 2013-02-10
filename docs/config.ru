require 'sprockets'

map '/assets' do
  environment = Sprockets::Environment.new
  environment.append_path File.expand_path('../../test/js', __FILE__)
  environment.append_path File.expand_path('../../lib/assets/js', __FILE__)
  environment.append_path File.expand_path('../../lib/assets/img', __FILE__)
  environment.append_path File.expand_path('../../scss', __FILE__)
  run environment
end