import React from 'react'
import { Link } from 'react-router-dom'

export default () => (
	<div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">Coach Schedules</h1>
        <p className="lead">
         You can see coach detail click by View Coaches and then you can schedule an appointment.
        </p>

        <hr className="my-4" />
        <Link
          to="/coaches"
          className="btn btn-lg custom-button"
          role="button"
        >
        View Coaches
        </Link>
        
        <hr className="my-4" />
        <Link
          to="/appointments"
          className="btn btn-lg custom-button"
          role="button"
        >
        My Appointments
        </Link>

      </div>
    </div>
  </div>
)