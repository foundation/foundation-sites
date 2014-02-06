module UrlHelper
  # @param relative_path the path relative to ./docs
  def url_for(relative_path)
    if Socket.gethostname == "foundation"
      "/docs/#{relative_path}"
    else
      "/#{relative_path}"
    end
  end

  def asset_path(relative_path=nil)
    return url_for("assets/#{relative_path}") if relative_path
    url_for("assets")
  end

  def link_to(name, relative_path=nil, &block)
    relative_path ||= name
    relative_path += ".html" if File.extname(relative_path) == ""
    if block_given?
      erbout = block.binding.eval('_erbout')
      erbout << "<a href='#{url_for(relative_path)}'>"
      yield
      erbout << "</a>"
      return
    else
      return "<a href='#{url_for(relative_path)}'>#{name}</a>"
    end
  end

  def image_path(relative_path)
    asset_path(relative_path)
  end

  def image_tag(relative_path)
    "<img src='#{image_path(relative_path)}' alt='foundation docs' />"
  end

  def stylesheet_link_tag(relative_path)
    relative_path += ".css" if File.extname(relative_path) != ".css"
    "<link rel='stylesheet' href='#{asset_path(relative_path)}' />"
    
  end

  def javascript_include_tag(relative_path)
    relative_path += ".js" if File.extname(relative_path) != ".js"
    "<script src='#{asset_path(relative_path)}'></script>"
  end

  # LEGACY ROUTES

  def foundation_home_path
    '/'
  end

  def features_path
    '/grid.php'
  end
  
  def training_path
    '/training.php'
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