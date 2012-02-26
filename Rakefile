#!/usr/bin/env ruby

VERSION_STRING = '2.1.5'

require 'bundler'
Bundler.setup :default

def prepend_text(file_name, text)
  `exec 3<> '#{file_name}' && awk -v TEXT="#{text}" 'BEGIN {print TEXT}{print}' '#{file_name}' >&3`
end

desc "Creates a zip file of the Foundation template and the compressed assets"
task :build do
  `rm -rf public marketing/files/foundation-download.zip`
  `bundle exec jammit`
  `mkdir public/src public/src/javascripts public/src/stylesheets`
  `cp -R humans.txt images index.html robots.txt public/src`
  `cp public/assets/foundation.js public/src/javascripts`
  `cp stylesheets/ie.css public/src/stylesheets/ie.css`
  `cp stylesheets/app.css public/src/stylesheets/app.css`
  `cp javascripts/app.js public/src/javascripts/app.js`
  `cp javascripts/modernizr.foundation.js public/src/javascripts/modernizr.foundation.js`
  `cp javascripts/jquery.min.js public/src/javascripts/jquery.min.js`
  
  File.open('public/src/stylesheets/foundation.css', "w") do |file|  
    %w{stylesheets/globals.css stylesheets/typography.css stylesheets/grid.css stylesheets/ui.css stylesheets/forms.css stylesheets/orbit.css stylesheets/reveal.css stylesheets/mobile.css}.each do |stylesheet|
      file.puts File.read(stylesheet)
    end
  end
  
  file_name = 'public/src/index.html'
  
  text = File.read(file_name)
  text.gsub!(/<!-- Combine and Compress These CSS Files -->.+<!-- End Combine and Compress These CSS Files -->/m, "<link rel=\"stylesheet\" href=\"stylesheets/foundation.css\">")
  text.gsub!(/<!-- Combine and Compress These JS Files -->.+<!-- End Combine and Compress These JS Files -->/m, "<script src=\"javascripts/foundation.js\"></script>")
  
  File.open(file_name, "w") do |file|  
    file.puts text
  end
  
  %w{public/src/javascripts/app.js public/src/javascripts/foundation.js public/src/stylesheets/app.css public/src/stylesheets/foundation.css public/src/stylesheets/ie.css}.each do |file_name|
    prepend_text(file_name, "/* Foundation v#{VERSION_STRING} http://foundation.zurb.com */")
  end
  
  `cd public/src && zip -r ../../marketing/files/foundation-download-#{VERSION_STRING}.zip *`
  `rm -rf public`
end

task :default => :build

require "jshintrb/jshinttask"
Jshintrb::JshintTask.new :jshint do |t|
  t.pattern = 'javascripts/*.js'
  t.exclude_pattern = 'javascripts/jquery.min.js'
  t.options = :defaults
end

desc "Run local web server for testing"
task :server do
  Bundler.require :websrver

  current_dir = File.expand_path(File.dirname(__FILE__))

  begin
    require 'webrick/httputils' 
    mime_types = File.join current_dir, "config", "mime.type"
    list = WEBrick::HTTPUtils.load_mime_types(mime_types) 
    Rack::Mime::MIME_TYPES.merge!(list)
  rescue LoadError
    puts "Unable to load webrick/httputils"
  end

  require 'rack/contrib/try_static'
  app = Rack::Builder.app do
    use Rack::CommonLogger
    use Rack::ContentLength
    use Rack::TryStatic, :root => current_dir, :urls => %w[/], :try => ['index.html']

    run lambda { |env|
      path = File.join current_dir, Rack::Utils.unescape(env['PATH_INFO'])
      if File.exists?(path) && File.directory?(path)
        Rack::Directory.new(current_dir).call(env)
      else
        file_name = File.join current_dir, "404.html"
        if File.exists?(file_name) then
          contents = File.read(file_name)
        else
          contents = '<h1>404 Not found</h1>'
        end
        [404, {'Content-Type' => 'text/html'}, [contents]]  
      end
    }
  end

  require 'rack/handler/puma'
  Rack::Handler::Puma.run app
end
