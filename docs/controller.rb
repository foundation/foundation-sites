layout 'layout.html.erb'

ignore /css\//
ignore /js\//

helpers do
  def asset_path
    'http://localhost:4001/assets'
  end
end