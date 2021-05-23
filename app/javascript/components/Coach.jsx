import React from "react";
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';

class Coach extends React.Component {

 constructor(props) {

    super(props);
    this.state = { 
      coach: {}, user: {}, time_slots: [], days_of_week: []
    };
  }

  componentDidMount() {
    // const {
    //   match: {
    //     params: { id }
    //   }
    // } = this.props;
    
    // const { params } = props.match;
    const id = this.props.match.params.id
    const user_id = this.props.match.params.user_id

    // console.log("id : ", id )
    // console.log("user_id : ", user_id )

    const url = `/api/v1/coaches/${id}?user_id=${user_id}`;
    // console.log("RUN  coach url : ", url )

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })

      .then(response => this.setState({  coach: response.coach, user: response.user, time_slots: response.time_slots, days_of_week: response.days_of_week }))
      .catch(() => this.props.history.push("/coaches"));
  }  


  onClick(event) {
    // this.setState({ [event.target.name]: event.target.value });
    console.log("event : ", event)
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

    console.log("Created BODY : ", body)

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          console.log("response : ", response)
          // this.setState({ time_slots: response });
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(res => this.setState({ time_slots: res.time_slots }))
      .then(response => alert("Succeffuly created!"))
      .catch(error => alert(error.message));
  }

  render() {
    const { coach,user,time_slots, days_of_week } = this.state;
    console.log("coach: ", coach )
    console.log("user: ", user )
    console.log("time_slots: ", time_slots )
    console.log("days_of_week: ", days_of_week )

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
                          {slot.ts_is_available ? <Link to="#" onClick={() => this.onClick(slot)} className="badge badge-pill badge-info">{slot.ts_start_time}</Link>:<div className="badge badge-pill badge-secondary">{slot.ts_start_time}</div>}
                        </div>
                    }else{
                        {/*return <div key={slot.ts_id} className="p-1"></div>*/}
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