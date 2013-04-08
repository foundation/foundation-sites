require 'sprockets'
require 'sass'

map '/assets' do
  environment = Sprockets::Environment.new
  environment.append_path File.expand_path('../../scss', __FILE__)
  environment.append_path File.expand_path('../css', __FILE__)
  environment.append_path File.expand_path('../../test/js', __FILE__)
  environment.append_path File.expand_path('../../js', __FILE__)
  environment.append_path File.expand_path('../js', __FILE__)
  run environment
end