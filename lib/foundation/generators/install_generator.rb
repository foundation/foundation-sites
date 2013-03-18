require 'rails/generators'

module Foundation
  module Generators
    class InstallGenerator < Rails::Generators::Base
      source_root File.join(File.dirname(__FILE__), 'templates')
      argument :layout_name, :type => :string, :default => 'application', :banner => 'layout_name'

      class_option :haml, :desc => 'Generate HAML layout instead of erb', :type => :boolean
      class_option :slim, :desc => 'Generate Slim layout instead of erb', :type => :boolean

      def add_assets
        # rails_ujs breaks, need to incorporate rails-behavior plugin for this to work seamlessly
        # gsub_file "app/assets/javascripts/application#{detect_js_format[0]}", /\/\/= require jquery\n/, ""
        insert_into_file "app/assets/javascripts/application#{detect_js_format[0]}", "#{detect_js_format[1]} require foundation\n", :after => "jquery_ujs\n"
        append_to_file "app/assets/javascripts/application#{detect_js_format[0]}", "\n$(document).foundation();\n"
        settings_file = File.join(File.dirname(__FILE__),"..","..","..","templates","project","scss","_settings.scss")
        create_file "app/assets/stylesheets/foundation_and_overrides.scss", File.read(settings_file)
        append_to_file "app/assets/stylesheets/foundation_and_overrides.scss", "\n@import 'foundation';\n"
        append_to_file "app/assets/stylesheets/application#{detect_css_format[0]}", "#{detect_css_format[1]} require foundation_and_overrides\n"
      end

      def detect_js_format
        return ['.js.coffee', '#='] if File.exist?('app/assets/javascripts/application.js.coffee')
        return ['.js', '//='] if File.exist?('app/assets/javascripts/application.js')
      end

      def detect_css_format
        return ['.css', ' *='] if File.exist?('app/assets/stylesheets/application.css')
        return ['.css.sass', ' //='] if File.exist?('app/assets/stylesheets/application.css.sass')
        return ['.sass', ' //='] if File.exist?('app/assets/stylesheets/application.sass')
        return ['.css.scss', ' //='] if File.exist?('app/assets/stylesheets/application.css.scss')
        return ['.scss', ' //='] if File.exist?('app/assets/stylesheets/application.scss')
      end

      def create_layout
        if options.haml?||(defined?(Haml) && !options.slim?)
          template 'application.html.haml', "app/views/layouts/#{file_name}.html.haml"
        elsif options.slim?||(defined?(Slim) && !options.haml?)
          template 'application.html.slim', "app/views/layouts/#{file_name}.html.slim"
        else
          template 'application.html.erb', "app/views/layouts/#{file_name}.html.erb"
        end
      end

      private

      def file_name
        layout_name.underscore.downcase
      end
    end
  end
end
