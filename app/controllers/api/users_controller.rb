class Api::UsersController < ApplicationController
    
    before_action :authenticate_user!

    def index
    @users = User.all
    render json: @users
    end

    def show
    @user = current_user
    render json: @user
    end


end
