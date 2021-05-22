class Api::V1::CoachesController < ApplicationController

  def index
    coaches = Coach.all.order(created_at: :desc)
    render json: coaches
  end

  def show
    if coach
      render json: coach
    else
      render json: coach.errors
    end
  end

end
