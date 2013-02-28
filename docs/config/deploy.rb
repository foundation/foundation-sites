# use local key for authentication
ssh_options[:forward_agent] = true
default_run_options[:pty] = true

set :application, "foundation"
set :repository,  "git@github.com:zurb/#{application}.git"
set :user, application
set :deploy_to, "/var/www/foundation-docs"
set :deploy_via, :remote_cache
set :use_sudo, false
set :branch, "4.0-wip"
set :bundle_gemfile, "docs/Gemfile"

set :scm, :git

server 'foundation.zurb.com', :web

after "deploy:update_code", "deploy:generate_static_site"
set :keep_releases, 3
after "deploy:update", "deploy:cleanup"

namespace :deploy do
  task :default do
    update
  end
  
  task :generate_static_site do
    run "cd #{release_path}/docs && bundle exec ruby #{release_path}/docs/compile.rb"
  end

end

require "bundler/capistrano"