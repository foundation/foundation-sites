require 'bundler'
Bundler.require
require 'fileutils'

class FoundationDocs
    def initialize
      @environment = Sprockets::Environment.new
      @environment.append_path File.expand_path('../../scss', __FILE__)
      @environment.append_path File.expand_path('../css', __FILE__)
      @environment.append_path File.expand_path('../../js', __FILE__)
      @environment.append_path File.expand_path('../js', __FILE__)
    end
    def compile
      FileUtils.mkdir_p('public/assets')
      File.delete("public/assets/normalize.css") if File.exists?("public/assets/normalize.css")
      File.delete("public/assets/docs.css") if File.exists?("public/assets/docs.css")
      File.delete("public/assets/docs.js") if File.exists?("public/assets/docs.js")

      normalize_css_code = @environment["normalize.css"].to_s
      docs_css_code = @environment["docs.css"].to_s
      docs_js_code = Uglifier.compile(@environment["docs.js"].to_s)

      File.open("public/assets/normalize.css","w") {|f| f.puts normalize_css_code } 
      File.open("public/assets/docs.css","w") {|f| f.puts  docs_css_code}
      File.open("public/assets/docs.js","w") {|f| f.puts  docs_js_code}
    end
end

#s = Stasis.new(File.expand_path('.',__FILE__), File.expand_path('./public', __FILE__))
#s.render
`bundle exec stasis`
f=FoundationDocs.new
f.compile
