map '/' do
  use Rack::ContentLength
  run Rack::Directory.new("./dist")
end