class Api::V1::TimeSlotsController < ApplicationController

  def index
    ts = TimeSlot.all.order(created_at: :desc)
    render json: ts, status: 200
  end

end