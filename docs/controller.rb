require 'socket'
layout 'layout.html.erb'

ignore /css\//
ignore /js\//
ignore /.+.md/
ignore /Gemfile.*/
ignore /Procfile/
ignore /compile.rb/

helpers do
  def asset_path
    if @_stasis.options[:asset_path]
      @_stasis.options[:asset_path]
    elsif Socket.gethostname == "foundation"
      "http://foundation.zurb.com/docs/assets"
    else
      "http://#{Socket.ip_address_list.detect{|intf| intf.ipv4_private?}.getnameinfo[0]}:4001/assets"
    end
  end

  def code_example(code, lang=:ruby)
    "<div class='#{lang}'>" + CodeRay.scan(code, lang).div(:css => :class) + "</div>"
  end

  def foundation_home_path
    '/'
  end

  def features_path
    '/grid.php'
  end

  def add_ons_path
    '/templates.php'
  end

  def case_studies_path
    '/case-jacquelinewest.php'
  end

  def docs_path
    '/docs/'
  end
end
