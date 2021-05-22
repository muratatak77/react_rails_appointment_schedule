class Coach < ApplicationRecord
  has_many :availabilities
  has_many :appointments
  validates :name, presence: true
end
