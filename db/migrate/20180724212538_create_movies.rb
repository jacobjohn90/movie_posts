class CreateMovies < ActiveRecord::Migration[5.2]
  def change
    create_table :movies do |t|
      t.string :title
      t.string :mpaa_rating
      t.string :img
      t.text :summary

      t.timestamps
    end
  end
end
