class CreateCoaches < ActiveRecord::Migration[6.1]
  def change
    create_table :coaches do |t|
      t.string :name
      t.string :time_zone
      t.timestamps
    end
    add_index :coaches, [:name]
  end
end
