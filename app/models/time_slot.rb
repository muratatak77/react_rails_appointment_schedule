class TimeSlot < ApplicationRecord
  belongs_to :availability, optional: false
end     