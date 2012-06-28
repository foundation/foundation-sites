# use local key for authentication
ssh_options[:forward_agent] = true
default_run_options[:pty] = true

set :application, "foundation"
set :repository,  "git@github.com:zurb/#{application}.git"
set :user, application
set :deploy_to, "/var/www/#{application}"
set :use_sudo, false

set :scm, :git

server 'app1', :web

#after "deploy:update_code", "deploy:link_cached_files"
#after "deploy:update_code", "deploy:link_assets"
set :keep_releases, 3
after "deploy:update", "deploy:cleanup"

namespace :deploy do
  task :default do
    update
  end

  desc "Symlink cached files"
  task :link_cached_files do
    run "rm -rf #{release_path}/marketing/cache"
    run "ln -nfs #{shared_path}/cache #{release_path}/marketing/cache"
    run "ln -nfs #{release_path}/images/misc #{release_path}/marketing/images/misc"
    run "ln -nfs #{release_path}/images/orbit #{release_path}/marketing/images/orbit"
  end

  desc "Symlink to stylesheets and javascripts"
  task :link_assets do
    run "ln -nfs #{release_path}/stylesheets #{release_path}/marketing/stylesheets"
    run "ln -nfs #{release_path}/javascripts #{release_path}/marketing/javascripts"
  end
end