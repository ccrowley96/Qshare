import React, {Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom'; //Substitute for <a> tag
import _ from 'lodash';
import moment from 'moment';
import { fetchRidesBy_UID } from '../actions';
import { capFirst } from '../utils/string_manipulation';

const SORT_BY_DATE = 'sort_by_date';
const SORT_BY_ORIGIN = 'sort_by_origin';
const SORT_BY_DESTINATION = 'sort_by_destination';

class MyRideTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedRides: this.props.userRides
    };
    this.sortRides = this.sortRides.bind(this);
    this.handleOriginClick = this.handleOriginClick.bind(this);
    this.handleDestinationClick = this.handleDestinationClick.bind(this);
    this.handleDateClick = this.handleDateClick.bind(this);
  }

  componentDidMount() {
    this.sortRides(SORT_BY_DATE);
    this.handleHeaderHighlight();
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
    const rides = this.props.userRides;
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
    return rides.map((ride) => {
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
                  {capFirst(ride.name)}
                </Link>
              </td>
              <td>
                {capFirst(ride.origin)}
              </td>
              <td>
                {capFirst(ride.destination)}
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
    return (
      <div className="my-rides-container">
        <div className="row">
          <h3> My Rides </h3>
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
      </div>
    );
  }
}

export default MyRideTable; // MAP state to props stuff
