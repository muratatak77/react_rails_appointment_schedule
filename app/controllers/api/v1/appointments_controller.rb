class Api::V1::AppointmentsController < ApplicationController

  require 'constant'

  def create
    time_slot_id = params[:time_slot_id]
    user_id = params[:user_id]
    coach_id = params[:coach_id]

    unless time_slot_id or user_id or coach_id 
      render json: {res: "FAIL", message: "Should be slote, user and coach information !"}, status: :unprocessable_entity 
    end
    
    appoint = Appointment.new()
    appoint.time_slot_id  = time_slot_id
    appoint.user_id  = user_id
    appoint.coach_id  = coach_id

    if appoint.save!
      time_slot = TimeSlot.find(time_slot_id)
      time_slot.update!(is_available: false)
      coach = Coach.find(coach_id)
      time_slots = TimeSlot.get_availabilities(coach)

      render json: {time_slots: time_slots}, status: 200
    else
      render json: {res: "FAIL", message: appoint.errors}, status: :unprocessable_entity
    end
  end

end
