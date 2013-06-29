require 'rails/generators'

module Foundation
  module Generators
    class InstallGenerator < Rails::Generators::Base
      source_root File.join(File.dirname(__FILE__), 'templates')
      argument :layout_name, :type => :string, :default => 'application', :banner => 'layout_name'

      class_option :haml, :desc => 'Generate HAML layout instead of erb', :type => :boolean
      class_option :slim, :desc => 'Generate Slim layout instead of erb', :type => :boolean
      class_option :engine, :desc => 'If the are running this generator in the context of an engine include the engine name', :type => :string

      def add_assets
        # rails_ujs breaks, need to incorporate rails-behavior plugin for this to work seamlessly
        # gsub_file "app/assets/javascripts/application#{detect_js_format[0]}", /\/\/= require jquery\n/, ""
        insert_into_file File.join(javascripts_base_dir, "application#{detect_js_format[0]}"), "#{detect_js_format[1]} require foundation\n", :before => "//= require_tree ."
        if options.engine?
          insert_into_file File.join(javascripts_base_dir, "application#{detect_js_format[0]}"), "#{detect_js_format[1]} require vendor/jquery\n", :before => "#{detect_js_format[0]} require foundation ."
        end
        append_to_file File.join(javascripts_base_dir, "application#{detect_js_format[0]}"), "\n$(function(){ $(document).foundation(); });\n"
        settings_file = File.join(File.dirname(__FILE__),"..","..","..","scss","foundation","_variables.scss")
        create_file File.join(css_base_dir, "foundation_and_overrides.scss"), File.read(settings_file)
        append_to_file File.join(css_base_dir, "foundation_and_overrides.scss"), "\n@import 'foundation';\n"
        insert_into_file File.join(css_base_dir, "application#{detect_css_format[0]}"), "#{detect_css_format[1]} require #{"#{options.engine}/" if options.engine?}foundation_and_overrides\n", :after => "require_self\n"
      end

      def detect_js_format
        return ['.coffee', '#='] if File.exist?(File.join(javascripts_base_dir, 'application.coffee'))
        return ['.js.coffee', '#='] if File.exist?(File.join(javascripts_base_dir, 'application.js.coffee'))
        return ['.js', '//='] if File.exist?(File.join(javascripts_base_dir, 'application.js'))
      end

      def detect_css_format
        return ['.css', ' *='] if File.exist?(File.join(css_base_dir, 'application.css'))
        return ['.css.sass', ' //='] if File.exist?(File.join(css_base_dir, 'application.css.sass'))
        return ['.sass', ' //='] if File.exist?(File.join(css_base_dir, 'application.sass'))
        return ['.css.scss', ' //='] if File.exist?(File.join(css_base_dir, 'application.css.scss'))
        return ['.scss', ' //='] if File.exist?(File.join(css_base_dir, 'application.scss'))
      end

      def create_layout
        if options.haml?||(defined?(Haml) && options.haml?)
          template 'application.html.haml', File.join(base_layout_dir, "#{file_name}.html.haml")
        elsif options.slim?||(defined?(Slim) && options.slim?)
          template 'application.html.slim', File.join(base_layout_dir, "#{file_name}.html.slim")
        else
          template 'application.html.erb', File.join(base_layout_dir, "#{file_name}.html.erb")
        end
      end

      private

      def file_name
        layout_name.underscore.downcase
      end

      def javascripts_base_dir
        ret = File.join('app', 'assets', 'javascripts')
        ret = File.join(ret, options.engine) if options.engine?
        ret
      end

      def css_base_dir
        ret = File.join('app', 'assets', 'stylesheets')
        ret = File.join(ret, options.engine) if options.engine?
        ret
      end

      def base_layout_dir
        ret = File.join('app', 'views', 'layouts')
        ret = File.join(ret, options.engine) if options.engine?
        ret
      end
    end
  end
end
