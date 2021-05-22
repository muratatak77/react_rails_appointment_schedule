class CreateAvailabilities < ActiveRecord::Migration[6.1]
  def change
    create_table :availabilities do |t|
      t.integer :coach_id
      t.integer :day_of_week
      t.string :available_at
      t.string :available_until
      t.timestamps
    end
    add_index :availabilities, [:coach_id]
  end
end
