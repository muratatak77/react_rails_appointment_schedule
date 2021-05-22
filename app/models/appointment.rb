class Appointment < ApplicationRecord
	belongs_to :coach, optional: false
	belongs_to :user, optional: false
	belongs_to :time_slot, optional: false
	validates :coach_id, uniqueness: { scope: [:user_id, :time_slot_id], message: "Can not be multiple appointments with the same , coach, user and times." }
end