Rails.application.routes.draw do
  resources :reviews
  resources :users

  # get 'users/:id', to: 'users#show', as: 'user'
  # get '/reviews/:id', to: 'reviews#show', as: 'review'
  # patch '/reviews/:id', to: 'reviews#update', as: 'review'
end
