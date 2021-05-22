class CreateAppointments < ActiveRecord::Migration[6.1]
  def change
    create_table :appointments do |t|
    	t.integer :coach_id
    	t.integer :user_id
    	t.integer :time_slot_id
      t.timestamps
    end
    add_index :appointments, [:coach_id]
    add_index :appointments, [:user_id]
    add_index :appointments, [:time_slot_id]
  end
end
