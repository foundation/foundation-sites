module Foundation
  class Engine < Rails::Engine
    # auto wire assets
    initializer 'foundation.update_asset_paths' do |app|
      app.config.assets.paths << File.expand_path("../../../scss", __FILE__)
      app.config.assets.paths << File.expand_path("../../../js", __FILE__)
    end
  end
end