class Movie < ApplicationRecord
    has_many :comments
    has_many :users, through: :comments

    validates :title, uniqueness: { scope: [:director, :year] }
end
