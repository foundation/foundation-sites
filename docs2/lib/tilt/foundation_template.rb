require 'tilt/template'
require 'redcarpet'
require 'rouge/plugins/redcarpet'
require 'yaml'

module Tilt
  class FoundationMarkdownTemplate < Template
    self.default_mime_type = 'text/html'

    class HTML < Redcarpet::Render::HTML
      include Rouge::Plugins::Redcarpet

      # This hook is provided to us by Redcarpet. We get access
      # to the whole text before anything else kicks off, which
      # means we can snag out the YAML at the beginning.
      def preprocess(full_document)
        full_document =~ /^(---\s*\n.*?\n?)^(---\s*$\n?)/m
        # @metadata = YAML.load($1) if $1

        $' or full_document
      end

      # # This accessor lets us access our metadata after the
      # # processing is all done.
      # def metadata
      #   @metadata || {}
      # end
    end

    def prepare
      # data holds template string
      options = {
        :autolink => true, 
        :space_after_headers => true, 
        :fenced_code_blocks => true, 
        :disable_indented_code_blocks => true, 
        :footnotes => true
      }
      @html = HTML.new
      @engine = Redcarpet::Markdown.new(@html, options)
      @output = nil
    end

    def evaluate(scope, locals, &block)
      @output ||= @engine.render(data)
    end
  end
end
