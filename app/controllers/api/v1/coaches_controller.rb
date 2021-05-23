class Api::V1::CoachesController < ApplicationController

  require 'constant'

  
  def index
    coaches = Coach.order(created_at: :desc)
    render json: {coaches: coaches, user: User.last}, status: 200
  end

  def show
    coach = Coach.includes(:availabilities).find(params[:id])
    user = User.find(params[:user_id])
    days_of_week = Constant::DAYS_OF_WEEK

    time_slots = TimeSlot.get_availabilities(coach)

    render json: {coach: coach, user: user, time_slots: time_slots, days_of_week: days_of_week}, status: 200
  end


 

end
