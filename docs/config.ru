require 'sprockets'
require 'sass'

map '/assets' do
  environment = Sprockets::Environment.new
  environment.append_path File.expand_path('../../scss', __FILE__)
  environment.append_path File.expand_path('../../js', __FILE__)
  environment.append_path File.expand_path('../css', __FILE__)
  environment.append_path File.expand_path('../../test/js', __FILE__)
  environment.append_path File.expand_path('../js', __FILE__)
  environment.append_path File.expand_path('../img', __FILE__)
  
  # environment.css_compressor = YUI::CssCompressor.new
  # environment.js_compressor  = Uglifier.new(mangle: true)

  run environment
end

map '/' do
  use Rack::ContentLength
  use Rack::Static, 
    :urls => ["/images", "/js", "/css"],
    :root => "public",
    :index => 'index.html'

  run Rack::File.new("public")

end


