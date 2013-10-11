require "ostruct"
require "./lib/tilt/foundation_template.rb"
require "./lib/foundation/helpers.rb"

# before /components\/*/ do
# end

layout "layout.html.erb"

# Run Markdown through ERB
before /\.html\.md$/ do
  template = Tilt::StringTemplate.new(_stasis.path)
  full_document = template.render(self) 
  full_document =~ /^(---\s*\n.*?\n?)^(---\s*$\n?)/m
  
  metadata = YAML.load($1) if $1
  metadata ||= {}
  @metadata = OpenStruct.new(metadata)
  @options = OpenStruct.new
  @options.javascript_enabled = true

  template_erb = Tilt::ERBTemplate.new(_stasis.path)
  out = template_erb.render(self)

  template_md = Tilt::FoundationMarkdownTemplate.new { out }
  instead template_md.render(out)
end

# Ignore Files
ignore /lib\/*/
ignore /Gemfile*/
ignore /\/_.*/
ignore /scss\/*/
ignore /\.bowerrc/
ignore /bower.json/
ignore /config.ru/
ignore /Procfile/
ignore /assets\/*/
ignore /.gitignore/
ignore /Rakefile/
ignore /README.md/

# Other Helpers
# puts @_stasis.options.inspect
# puts @_stasis.action.inspect
# puts @_stasis.path.inspect
# puts @_stasis.root.inspect
# puts @_stasis.plugins.inspect

helpers do
  include Foundation::Helpers
end