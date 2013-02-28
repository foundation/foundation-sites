module Foundation
  class Engine < Rails::Engine
    # auto wire assets
    initializer 'foundation.update_asset_paths' do |app|
      app.config.assets.paths << File.expand_path("../../../scss", __FILE__)
      app.config.assets.paths << File.expand_path("../../../js", __FILE__)

      # Ensure Zepto and Modernizr are precompiled in production
      app.config.assets.precompile += %w(vendor/zepto.js vendor/custom.modernizr.js)
    end
  end
end