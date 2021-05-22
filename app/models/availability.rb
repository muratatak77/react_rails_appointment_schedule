class Availability < ApplicationRecord
  belongs_to :coach
  has_many :time_slots
  validates :coach_id, uniqueness: { scope: [:day_of_week, :available_at, :available_until], message: "Can not be  multiple available times in a same day." }
end
