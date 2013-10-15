require 'socket'
require 'rouge'
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
      "/assets"
    end
  end

  def code_example(code, lang=:ruby)    
    l = case lang
    when :ruby then "Ruby"
    when :bash then "Shell"
    when :html then "HTML"
    when :sass then "Sass"
    when :scss then "Sass"
    when :css then "Sass"
    when :js then "Javascript"
    when :json then "JSON"
    else
      "Shell"
    end
    formatter = Rouge::Formatters::HTML.new(:css_class => "")
    lexer = Kernel.eval("Rouge::Lexers::#{l}")
    "<div class='#{lang}'><div class='highlight'>" + formatter.format(lexer.lex(code)) + "</div></div>"
  end

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
