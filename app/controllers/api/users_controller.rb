class Api::UsersController < ApplicationController
    
    before_action :authenticate_user!

    def show
    @user = current_user
    render json: @user
    end


end
