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
      FileUtils.mkdir_p('public/assets/css')
      FileUtils.mkdir_p('public/assets/js')
      File.delete("public/assets/css/normalize.css") if File.exists?("public/assets/css/normalize.css")
      File.delete("public/assets/css/docs.css") if File.exists?("public/assets/css/docs.css")
      File.delete("public/assets/js/docs.js") if File.exists?("public/assets/js/docs.js")

      normalize_css_code = @environment["normalize.css"].to_s
      docs_css_code = @environment["docs.css"].to_s
      docs_js_code = Uglifier.compile(@environment["docs.js"].to_s)

      File.open("public/assets/css/normalize.css","w") {|f| f.puts normalize_css_code } 
      File.open("public/assets/css/docs.css","w") {|f| f.puts  docs_css_code}
      File.open("public/assets/js/docs.js","w") {|f| f.puts  docs_js_code}
    end
end

s = Stasis.new(File.expand_path('.',__FILE__))
s.render
f=FoundationDocs.new
f.compile
