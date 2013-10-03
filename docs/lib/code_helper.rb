require 'rouge'
require 'erb'

# ERB.new(template).result(block.binding)

module CodeHelper
  def code(lang=:ruby, &block)
    code = ""
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

    erbout = block.binding.eval('_erbout')
    puts block.binding.inspect
    start_pos = erbout.length.to_i
    # start_pos.times { erbout.chop! }
    
    yield
    code += erbout.to_s
    puts "after yield code:\n#{code}"
    
    len = start_pos + code.length.to_i
    end_pos = start_pos + len
    
    erbout.reverse!
    len.times {erbout.chop!}
    erbout.reverse!
    
    formatter = Rouge::Formatters::HTML.new(:css_class => "")
    lexer = Kernel.eval("Rouge::Lexers::#{l}")
    erbout << "<div class='#{lang}'><div class='highlight'>" + formatter.format(lexer.lex(code)) + "</div></div>"
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
end