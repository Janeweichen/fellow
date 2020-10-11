Rails.application.routes.draw do
  devise_for :users

  resources :lists, only: [:index, :create, :update, :destroy] do
     member do
       put :move
     end  
  end

  resources :cards, only: [:create, :update, :destroy] do
    member do
      put :move
    end
  end

  root 'lists#index'
end
