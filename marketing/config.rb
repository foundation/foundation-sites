http_path = "/"
project_path = File.dirname(__FILE__)
add_import_path File.join("..", "stylesheets")
images_path = File.join(project_path, "..", "vendor", "assets", "images", "foundation")
javascripts_path = File.join(project_path, "..", "vendor", "assets", "javascripts", "foundation")

line_comments = false
relative_assets = true
output_style = :expand
sass_options = { :cache => "false" }
