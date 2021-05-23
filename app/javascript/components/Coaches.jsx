import React from "react";
import { Link } from "react-router-dom";

class Coaches extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
     coaches: [], user: {}
    };
  }

  componentDidMount() {
    const url = "/api/v1/coaches";
    console.log("RUN  coachesurl : ", url )

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ coaches: response.coaches, user: response.user }))
      .catch(() => this.props.history.push("/"));
  }

  render() {
    const { coaches,user } = this.state;
    console.log("coaches: ", coaches )
    console.log("user: ", user )

    const allCoaches = coaches.map((coach, index) => (
      <li  key={index}  className="list-group-item">
          <h5 className="card-title">{coach.name}</h5>
          <Link to={`/coach/${coach.id}/${user.id}`} className="btn custom-button">
            View Availability Times
          </Link>
      </li>
    ));
    console.log("allCoaches : ", allCoaches)
 
     return (
      <>
        <section className="text-center">
            <h4 className="display-4">Coaches</h4>
        </section>

        <div className="py-5">
          <main className="container">
            <div className="row p-3">
              <ul className="list-group">
               {allCoaches}
              </ul>
            </div>
            <Link to="/" className="btn btn-link">
              Home
            </Link>
          </main>
        </div>
      </>
    );


  }
}
export default Coaches;