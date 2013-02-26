require 'socket'
layout 'layout.html.erb'

ignore /css\//
ignore /js\//

helpers do
  def asset_path
    "http://#{Socket.ip_address_list.detect{|intf| intf.ipv4_private?}.getnameinfo[0]}:4001/assets"
  end

  def code_example(code, lang=:ruby)
    "<div class='#{lang}'>" + CodeRay.scan(code, lang).div(:css => :class) + "</div>"
  end
end