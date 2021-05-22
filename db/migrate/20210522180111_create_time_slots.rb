class CreateTimeSlots < ActiveRecord::Migration[6.1]
  def change
    create_table :time_slots do |t|
    	t.integer :availability_id
    	t.boolean :is_available, default: true
    	t.string :start_time
    	t.string :end_time
      t.timestamps
    end
    add_index :time_slots, [:availability_id]
  end
end
