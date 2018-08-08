class AddUniqueIndexToMovies < ActiveRecord::Migration[5.2]
  def change
    add_index :movies, [:title, :director, :year], unique: true
  end
end
