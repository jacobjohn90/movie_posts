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
end
