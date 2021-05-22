=begin
Name,Timezone,Day of Week,Available at,Available until

Christy Schumm,(GMT-06:00) America/North_Dakota/New_Salem,Monday, 9:00AM, 5:30PM
Christy Schumm,(GMT-06:00) America/North_Dakota/New_Salem,Tuesday, 8:00AM, 4:00PM
Christy Schumm,(GMT-06:00) America/North_Dakota/New_Salem,Thursday, 9:00AM, 4:00PM
Christy Schumm,(GMT-06:00) America/North_Dakota/New_Salem,Friday, 7:00AM, 2:00PM

Natalia Stanton Jr.,(GMT-06:00) Central Time (US & Canada),Tuesday, 8:00AM,10:00AM
Natalia Stanton Jr.,(GMT-06:00) Central Time (US & Canada),Wednesday,11:00AM, 6:00PM
Natalia Stanton Jr.,(GMT-06:00) Central Time (US & Canada),Saturday, 9:00AM, 3:00PM
Natalia Stanton Jr.,(GMT-06:00) Central Time (US & Canada),Sunday, 8:00AM, 3:00PM

Nola Murazik V,(GMT-09:00) America/Yakutat,Monday, 8:00AM,10:00AM
Nola Murazik V,(GMT-09:00) America/Yakutat,Tuesday,11:00AM, 1:00PM
Nola Murazik V,(GMT-09:00) America/Yakutat,Wednesday, 8:00AM,10:00AM
Nola Murazik V,(GMT-09:00) America/Yakutat,Saturday, 8:00AM,11:00AM
Nola Murazik V,(GMT-09:00) America/Yakutat,Sunday, 7:00AM, 9:00AM

Elyssa O'Kon,(GMT-06:00) Central Time (US & Canada),Monday, 9:00AM, 3:00PM
Elyssa O'Kon,(GMT-06:00) Central Time (US & Canada),Tuesday, 6:00AM, 1:00PM
Elyssa O'Kon,(GMT-06:00) Central Time (US & Canada),Wednesday, 6:00AM,11:00AM
Elyssa O'Kon,(GMT-06:00) Central Time (US & Canada),Friday, 8:00AM,12:00PM
Elyssa O'Kon,(GMT-06:00) Central Time (US & Canada),Saturday, 9:00AM, 4:00PM
Elyssa O'Kon,(GMT-06:00) Central Time (US & Canada),Sunday, 8:00AM,10:00AM

Dr. Geovany Keebler,(GMT-06:00) Central Time (US & Canada),Thursday, 7:00AM, 2:00PM
Dr. Geovany Keebler,(GMT-06:00) Central Time (US & Canada),Thursday, 3:00PM, 5:00PM

=end

require 'open-uri'
require 'csv'
require 'constant'
require 'date_util'

# DAYS_OF_WEEK = %w[Sunday Monday Tuesday Wednesday Thursday Friday Saturday].freeze
# DURATION_MINUTES = 30

def self.generate_time_slots(start_time, finish_time)
  time_slots = []
  start_time = Time.parse(start_time)
  finish_time = Time.parse(finish_time)
  
  # puts " > start_time : #{start_time}, finish_time : #{finish_time}"
  # puts "(finish_time.hour - start_time.hour)  : #{(finish_time.hour - start_time.hour) }"
  # puts "(60 / Constant::DURATION_MINUTES)  : #{(60 / Constant::DURATION_MINUTES)}"

  total = (finish_time.hour - start_time.hour) * (60 / Constant::DURATION_MINUTES)
  # puts "	 > total : #{total} time slots"

  1.upto(total) do
    time_slots << DateUtil.convert_to_string(start_time)
    start_time += (Constant::DURATION_MINUTES * 60)
  end

  # puts "	 > We got time_slots : #{time_slots}"
  time_slots

end

def self.create_coach(item)
  coach = Coach.new()
  coach.name = item[:name]
  coach.time_zone = item[:time_zone]
  if coach.save!
    puts "Coach is created : #{coach.id}"
  else
    puts "Coach is not created : #{coach.errors}"
  end
  coach
end

def load_data
  data_url = "https://gist.githubusercontent.com/wireframe/4a6f196d1b4b24617916d81239eea658/raw/7ca471b2a915c5a6f9a205d68b3fc0cedd527938/data.csv"
  coaches_data = []
  CSV.new(open(data_url), :headers => :first_row).each do |line|
    obj = {}
    obj[:name] = line[0]
    obj[:time_zone] = line[1]
    obj[:day_of_week] = line[2]
    obj[:available_at] = line[3]
    obj[:available_until] = line[4]
    coaches_data << obj
  end
  coaches_data
end


def start(coaches_data)

  ActiveRecord::Base.transaction do

    coaches_data.each do |item|

      puts "Start Process. Getting coach: #{item}"

      coach = Coach.find_by_name(item[:name])
      coach = self.create_coach(item) unless coach
      day_of_week = Constant::DAYS_OF_WEEK.index(item[:day_of_week])

      available_at = item[:available_at].strip
      available_until = item[:available_until].strip

      if availability = coach.availabilities.create!(day_of_week: day_of_week, available_at: available_at, available_until: available_until)
      	puts "Availabilities were created!"
      end

      times_slots = self.generate_time_slots(available_at, available_until)
      times_slots.each do |ts|
      	TimeSlot.create!(availability: availability, start_time: ts )
      	puts "TimeSlot were created!"
      end
    end

    User.create!(name: "Test User", time_zone: "(GMT-07:00) America/Los_Angeles")

  end

end

data = load_data()
start(data)
