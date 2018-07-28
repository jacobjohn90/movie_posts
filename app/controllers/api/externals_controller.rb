class Api::ExternalsController < ApplicationController
    include HTTParty


    def index
       res = HTTParty.get("http://www.omdbapi.com/?apikey=#{Figaro.env.api_key}&s=#{params[:s]}")
       render json: res
    end

    def create
        res = HTTParty.get("http://www.omdbapi.com/?apikey=#{Figaro.env.api_key}&t=#{params[:t]}")
        render json: res
    end
end
