class AddColumnsToMovies < ActiveRecord::Migration[5.2]
  def change
    add_column :movies, :actor, :string
    add_column :movies, :rating, :decimal
    add_column :movies, :director, :string
    add_column :movies, :year, :integer
  end
end
