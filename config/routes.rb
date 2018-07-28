Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  namespace :api do
    resources :users do
      resources :comments
    end
    resources :movies do
      resources :comments
    end
  end
  get '/api/externals/10', to: 'api/externals#search10'
  get '/api/externals/1', to: 'api/externals#search1'
end
