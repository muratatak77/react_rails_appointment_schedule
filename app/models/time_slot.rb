class TimeSlot < ApplicationRecord
  belongs_to :availability, optional: false

  def self.get_availabilities(coach)
    joins(:availability)
    .where('availability_id IN (?)', coach.availabilities.ids)
    .references(:availability)
    .select(select_time_slots)
    .select(select_availability)
    .order(created_at: :asc)
  end

  private

  def self.select_time_slots
    "
      time_slots.id ts_id, 
      time_slots.is_available ts_is_available,
      time_slots.availability_id ts_availability_id, 
      time_slots.start_time ts_start_time, 
      time_slots.end_time ts_end_time
    "
  end

  def self.select_availability
    "
      availabilities.id avl_id,
      availabilities.coach_id avl_coach_id, 
      availabilities.day_of_week avl_day_of_week, 
      availabilities.available_at avl_available_at, 
      availabilities.available_until avl_available_until
    "
  end

end
