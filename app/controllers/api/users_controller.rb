class Api::UsersController < ApplicationController
    
        before_action :authenticate_user!, except: [:index]

    def index
    @users = User.all
    render json: @users
    end

    def show
    @user = current_user
    render json: @user
    end


end
