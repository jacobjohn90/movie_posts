class Api::CommentsController < ApplicationController
    before_action :authenticate_user!, except: [:show, :index]
    load_and_authorize_resource only: [:destroy]

    def index
        @comments = Comment.all
        render json: @comments
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
