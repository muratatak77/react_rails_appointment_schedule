import React from "react";
import { Link } from "react-router-dom";
import 'moment-timezone';
import moment from 'moment'

class Coach extends React.Component {
 
 constructor(props) {
    super(props);
    this.state = { 
      coach: {}, user: {}, time_slots: [], days_of_week: [], user_time_zone: "", coach_time_zone: ""
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id
    const user_id = this.props.match.params.user_id
    const url = `/api/v1/coaches/${id}?user_id=${user_id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ 
        coach: response.coach, 
        user: response.user, 
        time_slots: response.time_slots, 
        days_of_week: response.days_of_week, 
        user_time_zone: response.user_time_zone, 
        coach_time_zone: response.coach_time_zone }))
      .catch(() => this.props.history.push("/coaches"));

  }  

  onClick(event) {
    this.createAppointment(event)
  }

  createAppointment(time_slot) {

    const url = "/api/v1/appointments/";
    const { coach, user } = this.state;

    if (time_slot == null)
      return;

    const body = {
      coach_id: coach.id,
      user_id: user.id,
      time_slot_id: time_slot.ts_id
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(res => this.setState({ time_slots: res.time_slots }))
      .then(response => alert("You scheduled an appointment succeffuly."))
      .catch(error => alert(error.message));
  }


  convert_tz(tz){
    if (tz == "Central Time (US & Canada)"){
      return "America/Chicago"
    }
    return tz
  }
  
  get_user_time_zone(){
    const {user } = this.state;
    let userTz = user.time_zone.replace(/\(GMT.*?\)\s/, '')
    userTz = this.convert_tz(userTz)
    return userTz
  }


  get_coach_time_zone(){
    const {coach } = this.state;
    let coachTz = coach.time_zone.replace(/\(GMT.*?\)\s/, '')
    coachTz = this.convert_tz(coachTz)
    return coachTz
  }

  get_hour_minute_midday(str_date){
    let pm_index = str_date.indexOf("PM");
    let new_date = ""
    if (pm_index != -1){
      new_date = str_date.substring(pm_index,-1).trim();
    }

    let am_index = str_date.indexOf("AM");
    if (am_index != -1){
      new_date = str_date.substring(am_index,-1).trim();

    }
    let colon_index = new_date.indexOf(":");
    let hour = ""
    let minute = ""

    if (colon_index != -1){
      hour = parseInt(new_date.substring(0,colon_index).trim());
      minute = parseInt(new_date.substring(colon_index+1,new_date.length).trim());
    }
    return [hour, minute, str_date.indexOf("PM") != -1 ? "PM" : "AM"]
  }


  convertStringToDate(slot){

    if (slot.ts_start_time){

      const { coach, user, user_time_zone, coach_time_zone } = this.state;
      let hour_minute = this.get_hour_minute_midday(slot.ts_start_time)
      let midday = hour_minute[2]
			
			// "(GMT-06:00) Central Time (US & Canada)"
			let firstP = coach.time_zone.indexOf("(")
			let secondP = coach.time_zone.indexOf(")")
			let gmt = coach.time_zone.substring(firstP+1,secondP).trim();

      let strDate = 'Mon 03-Jul-2017, ' + hour_minute[0]+":"+hour_minute[1] + " " + midday + " " + gmt
      let coach_convert_date = moment(strDate).tz(coach_time_zone)
      let user_convert_date = moment(coach_convert_date).tz(user_time_zone)
      let new_hour_format = moment(user_convert_date).format("hh:mm A");
      return new_hour_format
    }
  }

  render() {

    const { coach,user,time_slots, days_of_week } = this.state;
    let daysOfWeekList = ""
    if (days_of_week.length > 0){
      daysOfWeekList = days_of_week
      .map((day, index) => (
        <div key={index} className="div-table-col">{day}</div>
        )
      )
    }

    let timeSlotsAll = ""

    timeSlotsAll = days_of_week
      .map((day, index) => {
            return <div key={index} className="div-table-col p-1">
                {time_slots.map((slot, slot_index) => {
                    if (slot.avl_day_of_week == index){
                        return <div key={slot.ts_id} className="p-1">
                          {slot.ts_is_available ? <Link to="#" onClick={() => this.onClick(slot)} className="badge badge-pill badge-info">{this.convertStringToDate(slot)}</Link>:<div className="badge badge-pill badge-secondary">{this.convertStringToDate(slot)}</div>}
                        </div>
                    }else{
                        {}
                    }
                })
              }
            </div>
        }
      )

    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <div className="overlay bg-dark position-absolute" />
            <h1 className="display-4 position-relative text-white">
              {coach.name}
            </h1>
          </div>
          <div className="container py-5">
            <div className="row">
              <div className="col-sm-12">
                <ul className="list-group">
                  <h5 className="mb-2">Time Slots</h5>
                      <div className="table-responsive">
                        <div className="div-table">
                            <div className="div-table-row">
                              {daysOfWeekList}
                            </div>
                            <div className="div-table-row">
                               {timeSlotsAll}
                            </div>
                        </div>
                      </div>

                </ul>
              </div>
            </div>
            <Link to="/coaches" className="btn btn-link">
              Back to coachs
            </Link>
          </div>
      </div>
    );
  }
}

export default Coach;