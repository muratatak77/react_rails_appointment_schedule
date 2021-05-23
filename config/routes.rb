Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do

      get 'coaches', to: 'coaches#index'
      get 'coaches/:id', to: 'coaches#show'

      # get 'recipes/index', to: 'recipes#index'
      # post 'recipes/create', to: 'recipes#create'
      # get '/show/:id', to: 'recipes#show'
      # delete '/destroy/:id', to: 'recipes#destroy'
      
      post 'appointments', to: 'appointments#create'
      get 'appointments/:id', to: 'appointments#show'

    end
  end
  root :to => "homepage#index"
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

