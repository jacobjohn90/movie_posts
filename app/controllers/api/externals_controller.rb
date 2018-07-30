class Api::ExternalsController < ApplicationController
    include HTTParty


    def search10
       res = HTTParty.get("http://www.omdbapi.com/?apikey=#{Figaro.env.api_key}&s=#{params[:s]}&type=movie")
       render json: res
    end

    def search1
        res = HTTParty.get("http://www.omdbapi.com/?apikey=#{Figaro.env.api_key}&t=#{params[:t]}&plot=full")
        render json: res
    end
end
