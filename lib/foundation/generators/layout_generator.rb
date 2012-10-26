require 'rails/generators'

module Foundation
  module Generators
    class LayoutGenerator < Rails::Generators::Base
      source_root File.join(File.dirname(__FILE__), 'templates')
      argument :layout_name, :type => :string, :default => 'application', :banner => 'layout_name'

      class_option :haml, :desc => 'Generate HAML layout instead of ERB.', :type => :boolean
      class_option :slim, :desc => 'Generate Slim layout instead of ERB.', :type => :boolean

      def create_layout
        if options.haml?
          template 'application.html.haml', "app/views/layouts/#{file_name}.html.haml"
        elsif options.slim?
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
