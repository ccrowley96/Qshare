import React, {Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom'; //Substitute for <a> tag
import { withRouter } from 'react-router-dom'
import _ from 'lodash';
import moment from 'moment';
import { fetchRides } from '../actions';
import { capFirst } from '../utils/string_manipulation';

const SORT_BY_DATE = 'sort_by_date';
const SORT_BY_PRICE = 'sort_by_price';
const SORT_BY_CAPACITY = 'sort_by_capacity';
const SORT_BY_ORIGIN = 'sort_by_origin';
const SORT_BY_DESTINATION = 'sort_by_destination';

class RideTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortedRides: this.props.rides.rides
    };

    this.sortRides = this.sortRides.bind(this);
    this.handleOriginClick = this.handleOriginClick.bind(this);
    this.handleDestinationClick = this.handleDestinationClick.bind(this);
    this.handlePriceClick = this.handlePriceClick.bind(this);
    this.handleCapacityClick = this.handleCapacityClick.bind(this);
    this.handleDateClick = this.handleDateClick.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
  }

  componentDidMount() {
    this.handleHeaderHighlight();
    this.sortRides(SORT_BY_DATE);
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
  // Price comparison helper for sortedRides
  compareByPrice(a, b) {
    return a.price > b.price;
  }
  // Capacity comparison helper for sortedRides
  compareByCapacity(a, b) {
    return a.capacity < b.capacity;
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
      case SORT_BY_PRICE:
        sortedRides = rides.sort(this.compareByPrice);
        break;
      case SORT_BY_CAPACITY:
        sortedRides = rides.sort(this.compareByCapacity);
        break;
      default:
        sortedRides = rides.sort(this.compareByDate);
    }
    //Update state to reflect sorted rides and re-render
    this.setState({
      sortedRides
    });
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
  handlePriceClick() {
    this.sortRides(SORT_BY_PRICE);
  }
  handleCapacityClick() {
    this.sortRides(SORT_BY_CAPACITY);
  }
  handleRowClick(rideID) {
     this.props.history.push(`/rides/${rideID}`);
  }

  renderRidesV2() {
    const mq = window.matchMedia("(min-width: 700px)");
    const rides = this.state.sortedRides;
    let readableDate;
    if(rides){
      return rides.map((ride) => {
        // Change date format on smaller screen sizes
        if (mq.matches) {
          readableDate =  moment.utc(ride.date).format('ddd, MMM Do');
        } else {
          readableDate =  moment.utc(ride.date).format('MM/DD/YY');
        }
        //return JSX for each table element
        return (
            <tr className="table-group-item ride-row" key={ride._id} onClick={()=> this.handleRowClick(ride._id)}>
                <td>
                    <p>{capFirst(ride.name)}</p>
                </td>
                <td>
                  <p>{capFirst(ride.origin)}</p>
                </td>
                <td>
                  <p>{capFirst(ride.destination)}</p>
                </td>
                <td>
                  <p>{readableDate}</p>
                </td>
                <td>
                  <p>{ride.capacity}</p>
                </td>
                <td>
                  <p>${ride.price}</p>
                </td>
            </tr>
        );
      });
    } else {
      return (<tr><td> Rides not found! </td></tr>);
    }
  }
  //Render Rideindex page --> table, title, button
  render() {
    return (
      <div className="rides-container">
        <div className="row">
          <h2> Active Rides </h2>
          <div className="ride-table-container">
            <table className="table ride-table">
              <tbody>
                <tr>
                  <th className="table-col-title"><h4>Name</h4></th>
                  <th className="table-col-title ride_index_heading orig-head" onClick={this.handleOriginClick}><h4><span><i className="fa fa-sort-alpha-up i-sort"></i></span> Origin</h4></th>
                  <th className="table-col-title ride_index_heading dest-head" onClick={this.handleDestinationClick}><h4><span><i className="fa fa-sort-alpha-up i-sort"></i></span> Destination</h4></th>
                  <th className="table-col-title ride_index_heading date-head active" onClick={this.handleDateClick}><h4><span><i className="fa fa-clock i-sort"></i></span> Date</h4></th>
                  <th className="table-col-title ride_index_heading cap-head" onClick={this.handleCapacityClick}><h4><span className="i-span"><i className="fas fa-users i-sort"></i></span> Seats</h4></th>
                  <th className="table-col-title ride_index_heading price-head" onClick={this.handlePriceClick}><h4><span><i className="fa fa-dollar-sign i-sort"></i></span> Price</h4></th>
                </tr>
                  {this.renderRidesV2()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}




export default withRouter(RideTable); // MAP state to props stuff
