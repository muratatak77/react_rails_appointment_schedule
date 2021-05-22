Rails.application.routes.draw do
  resources :articles
  namespace :api do
    namespace :v1 do
      get 'recipes/index', to: 'recipes#index'
      post 'recipes/create', to: 'recipes#create'
      get '/show/:id', to: 'recipes#show'
      delete '/destroy/:id', to: 'recipes#destroy'
    end
  end
  # get 'homepage/index'
  root :to => "homepage#index"
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end