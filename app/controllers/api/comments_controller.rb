class Api::CommentsController < ApplicationController
    before_action :authenticate_user!, except: [:show, :index]
    load_and_authorize_resource only: [:destroy]

    def index
        if params[:movie_id]
            @movie = Movie.find(params[:movie_id])
            @comments = @movie.comments
            render json: @comments
        else
            @user = User.find(params[:user_id])
            @comments = @user.comments
            render json: @comments
        end
    end

    def show
        @comment = Comment.find(params[:id])
        render json: @comment
    end

    def create
        @movie = Movie.find(params[:movie_id])
        @comment = @movie.comments.create!(comment_params)
        render json: @comment
    end

    def update
        @comment = Comment.find(params[:id])
        @comment.update!(comment_params)
        render json: @comment
    end

    def destroy
        @user = current_user
        @comment = Comment.find(params[:id])
        @comment.destroy
        render status: :ok
    end

    private
    def comment_params
        params.require(:comment).permit(:content)
    end
end