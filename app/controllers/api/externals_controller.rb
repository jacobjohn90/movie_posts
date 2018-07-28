class Api::ExternalsController < ApplicationController
    include HTTParty


    def index
       res = HTTParty.get("http://www.omdbapi.com/?apikey=#{Figaro.env.api_key}&t=#{params[:t]}&plot=full")
       render json: res
    end
end
