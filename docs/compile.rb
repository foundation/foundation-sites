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
      FileUtils.mkdir_p('public/assets/vendor')
      File.delete("public/assets/normalize.css") if File.exists?("public/assets/normalize.css")
      File.delete("public/assets/docs.css") if File.exists?("public/assets/docs.css")
      File.delete("public/assets/docs.js") if File.exists?("public/assets/docs.js")
      File.delete("public/assets/vendor/custom.modernizr.js") if File.exists?("public/assets/vendor/custom.modernizr.js")
      File.delete("public/assets/vendor/zepto.js") if File.exists?("public/assets/vendor/zepto.js")
      File.delete("public/assets/vendor/jquery.js") if File.exists?("public/assets/vendor/jquery.js")

      normalize_css_code = @environment["normalize.css"].to_s
      docs_css_code = @environment["docs.css"].to_s
      docs_js_code = Uglifier.compile(@environment["docs.js"].to_s)
      modernizr_code = Uglifier.compile(@environment["vendor/custom.modernizr.js"].to_s)
      jquery_code = Uglifier.compile(@environment["vendor/jquery.js"].to_s)
      zepto_code = Uglifier.compile(@environment["vendor/zepto.js"].to_s)

      File.open("public/assets/normalize.css","w") {|f| f.puts normalize_css_code } 
      File.open("public/assets/docs.css","w") {|f| f.puts  docs_css_code}
      File.open("public/assets/docs.js","w") {|f| f.puts  docs_js_code}

      File.open("public/assets/vendor/custom.modernizr.js","w") {|f| f.puts modernizr_code }
      File.open("public/assets/vendor/zepto.js","w") {|f| f.puts zepto_code}
      File.open("public/assets/vendor/jquery.js","w") {|f| f.puts jquery_code}
    end
end

#s = Stasis.new(File.expand_path('.',__FILE__), File.expand_path('./public', __FILE__))
#s.render
`bundle exec stasis`
f=FoundationDocs.new
f.compile
