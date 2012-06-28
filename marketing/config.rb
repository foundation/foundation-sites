#http_path = "/"
require "rubygems"
require "bundler"
Bundler.require
require "modular-scale"

add_import_path File.join("..", "stylesheets")
line_comments = false
relative_assets = true
output_style = :compact
sass_options = { :cache => true }
