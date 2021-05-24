class Api::V1::CoachesController < ApplicationController
  require 'constant'
  require 'date_util'

  def index
    coaches = Coach.order(created_at: :desc)
    render json: {coaches: coaches, user: User.last}, status: 200
  end

  def show
    coach = Coach.includes(:availabilities).find(params[:id])
    user = User.find(params[:user_id])
    days_of_week = Constant::DAYS_OF_WEEK

    time_slots = TimeSlot.get_availabilities(coach)

    user_time_zone = DateUtil.time_zone_parse(user.time_zone)
    coach_time_zone = DateUtil.time_zone_parse(coach.time_zone)
    data = {
    	coach: coach, 
      user: user, 
      time_slots: time_slots, 
      days_of_week: days_of_week, 
      user_time_zone: user_time_zone,
      coach_time_zone: coach_time_zone
    }
    render json: data, status: 200
  end


 

end
