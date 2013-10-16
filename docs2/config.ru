require 'sprockets-sass'
require 'sass'
require 'compass'

map '/assets' do
  environment = Sprockets::Environment.new
  environment.append_path File.expand_path('../../scss', __FILE__)
  environment.append_path File.expand_path('../../js', __FILE__)
  environment.append_path File.expand_path('../assets/css', __FILE__)
  environment.append_path File.expand_path('../assets/js', __FILE__)
  environment.append_path File.expand_path('../assets/img', __FILE__)

  run environment
end

map '/' do
  use Rack::ContentLength
  use Rack::Static, 
    :root => "public",
    :index => 'index.html'

  run Rack::File.new("public")
end