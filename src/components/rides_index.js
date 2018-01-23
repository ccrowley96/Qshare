import React, {Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; //Substitute for <a> tag
import _ from 'lodash';
import moment from 'moment';
import { fetchRides } from '../actions';

const SORT_BY_DATE = 'sort_by_date';
const SORT_BY_ORIGIN = 'sort_by_origin';
const SORT_BY_DESTINATION = 'sort_by_destination';

class RidesIndex extends Component {
  constructor(props) {
    super(props);
    this.props.fetchRides()
      .then(() => {
        this.sortRides(SORT_BY_DATE);
        this.updateRideFlag();
        this.handleHeaderHighlight();
      });

      this.state = {
        sortedRides: [],
        ridesFetched: false
      };

      this.sortRides = this.sortRides.bind(this);
      this.updateRideFlag = this.updateRideFlag.bind(this);
      this.handleOriginClick = this.handleOriginClick.bind(this);
      this.handleDestinationClick = this.handleDestinationClick.bind(this);
      this.handleDateClick = this.handleDateClick.bind(this);
  }

  handleHeaderHighlight() {
    const table_headers = document.getElementsByClassName("ride_index_heading");

  // Loop through the buttons and add the active class to the current/clicked button
  for (let i = 0; i < table_headers.length; i++) {
    table_headers[i].addEventListener("click", function() {
      const current = document.body.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";

    });
  }
}
  //Ride flag Helper
  updateRideFlag() {
    this.setState({ridesFetched: true});
  }
  // Date comparison helper for sortRides
  compareByDate(a, b) {
    const a_time = new Date(a.date).getTime();
    const b_time = new Date(b.date).getTime();
    if (a_time < b_time) {
      return -1;
    }
    if (a_time > b_time) {
      return 1;
    }
    return 0;
  }
  // Origin comparison helper for sortRides
  compareByOrigin(a, b) {
    return a.origin.localeCompare(b.origin);
  }
  // Destination comparison helper for sortRides
  compareByDestination(a, b) {
    return a.destination.localeCompare(b.destination);
  }
  // Sort Rides by switch case param
  sortRides(sortBy) {
    const {rides} = this.props.rides;
    let sortedRides = [];
    // Sort by param passed to function
    switch (sortBy) {
      case SORT_BY_DATE:
        sortedRides = rides.sort(this.compareByDate);
        break;
      case SORT_BY_ORIGIN:
        sortedRides = rides.sort(this.compareByOrigin);
        break;
      case SORT_BY_DESTINATION:
        sortedRides = rides.sort(this.compareByDestination);
        break;

      default:
        sortedRides = rides.sort(this.compareByDate);
    }
    //Update state to reflect sorted rides and re-render
    this.setState({sortedRides});
  }

  //Helper to CAPS first letter of text
  formatFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  //Click handlers
  handleOriginClick() {
    this.sortRides(SORT_BY_ORIGIN);
  }
  handleDestinationClick() {
    this.sortRides(SORT_BY_DESTINATION);
  }
  handleDateClick() {
    this.sortRides(SORT_BY_DATE);
  }
  //Individual ride row JSX generator
  renderRides() {
    const mq = window.matchMedia("(min-width: 700px)");
    const rides = this.state.sortedRides;
    let readableDate;

    return _.map(rides, (ride) => {
      // Change date format on smaller screen sizes
      if (mq.matches) {
        readableDate =  moment(ride.date).format('ddd, MMM Do');
      } else {
        readableDate =  moment(ride.date).format('MM/DD/YY');
      }
      //return JSX for each table element
      return (
          <tr className="table-group-item" key={ride._id}>
              <td>
                <Link to={`/rides/${ride._id}`}>
                  {this.formatFirstLetter(ride.name)}
                </Link>
              </td>
              <td>
                {this.formatFirstLetter(ride.origin)}
              </td>
              <td>
                {this.formatFirstLetter(ride.destination)}
              </td>
              <td>
                {readableDate}
              </td>
          </tr>
      );
    });
  }
  //Render Rideindex page --> table, title, button
  render() {
    // Wait for successfull ride fetch
    if (!this.props.rides.rides) {
      return (<div><h5>Loading...</h5></div>);
    }
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-success" to="/post-ride">
            Post a Ride
          </Link>
        </div>
      <h3> Rides </h3>
        <table className="table">
          <tbody>
            <tr>
              <th>Name</th>
              <th className="ride_index_heading orig-head" onClick={this.handleOriginClick}>Origin</th>
              <th className="ride_index_heading dest-head" onClick={this.handleDestinationClick}>Destination</th>
              <th className="ride_index_heading date-head active"onClick={this.handleDateClick}>Date</th>
            </tr>
              {this.renderRides()}
          </tbody>
        </table>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return { rides: state.rides };
}

export default connect(mapStateToProps, { fetchRides })(RidesIndex); // MAP state to props stuff
