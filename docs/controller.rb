require 'socket'

require './lib/url_helper'
require './lib/code_helper'
layout 'layout.html.erb'

ignore /css\//
ignore /js\//
ignore /.+.md/
ignore /Gemfile.*/
ignore /Procfile/
ignore /compile.rb/

helpers do
  include UrlHelper
  include CodeHelper
end
