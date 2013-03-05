module Foundation
  class Engine < Rails::Engine
    # Save this block, we'll use it in two calls to .initializer
    add_paths_block = lambda { |app|
      app.config.assets.paths << File.expand_path("../../../scss", __FILE__)
      app.config.assets.paths << File.expand_path("../../../js", __FILE__)

      # Ensure Zepto and Modernizr are precompiled in production
      app.config.assets.precompile += %w(vendor/zepto.js vendor/custom.modernizr.js)
    }

    # Standard initializer
    initializer 'foundation.update_asset_paths', &add_paths_block

    # Special initializer lets us precompile assets without fully initializing
    initializer 'foundation.update_asset_paths', :group => :assets,
                &add_paths_block

  end
end
