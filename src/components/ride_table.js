import React, {Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom'; //Substitute for <a> tag
import { withRouter } from 'react-router-dom'
import _ from 'lodash';
import moment from 'moment';
import { fetchRides } from '../actions';
import { capFirst } from '../utils/string_manipulation';

const SORT_BY_DATE = 'sort_by_date';
const SORT_BY_DATE_INVERSE = 'sort_by_date_inverse';
const SORT_BY_PRICE = 'sort_by_price';
const SORT_BY_PRICE_INVERSE = 'sort_by_price_inverse';
const SORT_BY_CAPACITY = 'sort_by_capacity';
const SORT_BY_ORIGIN = 'sort_by_origin';
const SORT_BY_ORIGIN_INVERSE = 'sort_by_origin_inverse';
const SORT_BY_DESTINATION = 'sort_by_destination';
const SORT_BY_DESTINATION_INVERSE = 'sort_by_destination_inverse';
const SORT_BY_CAPACITY_INVERSE = 'sort_by_capacity_inverse';

class RideTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortedRides: this.props.rides.rides,
      priceToggle: 0,
      capacityToggle: 1,
      dateToggle: 0,
      originToggle: 0,
      destinationToggle: 0
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
  // Inverse Date comparison helper for sortRides
  compareByDateInverse(a, b) {
    const a_time = new Date(a.date).getTime();
    const b_time = new Date(b.date).getTime();
    if (a_time > b_time) {
      return -1;
    }
    if (a_time < b_time) {
      return 1;
    }
    return 0;
  }
  // Origin comparison helper for sortRides
  compareByOrigin(a, b) {
    return a.origin.localeCompare(b.origin);
  }
  // Inverse Origin comparison helper for sortRides
  compareByOriginInverse(a, b) {
    let temp = a.origin.localeCompare(b.origin);
    if(temp == 0) {
      return temp;
    }
    else{
      return temp * -1;
    }
  }
  // Inverse Destination comparison helper for sortRides
  compareByDestination(a, b) {
    return a.destination.localeCompare(b.destination);
  }
  // Destination comparison helper for sortRides
  compareByDestinationInverse(a, b) {
    let temp = a.destination.localeCompare(b.destination);
    if(temp == 0){
      return temp;
    } else {
      return temp * -1;
    }
  }
  // Price comparison helper for sortedRides
  compareByPrice(a, b) {
    if (a.price < b.price) {
      return -1;
    }
    if (a.price > b.price) {
      return 1;
    }
    return 0;
  }
  // Inverse Price comparison helper for sortedRides
  compareByPriceInverse(a, b) {
    if (a.price > b.price) {
      return -1;
    }
    if (a.price < b.price) {
      return 1;
    }
    return 0;
  }
  // Capacity comparison helper for sortedRides
  compareByCapacity(a, b) {
    if (a.capacity < b.capacity) {
      return -1;
    }
    if (a.capacity > b.capacity) {
      return 1;
    }
    return 0;
  }
  // Inverse Capacity comparison helper for sortedRides
  compareByCapacityInverse(a, b) {
    if (a.capacity > b.capacity) {
      return -1;
    }
    if (a.capacity < b.capacity) {
      return 1;
    }
    return 0;
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
      case SORT_BY_DATE_INVERSE:
        sortedRides = rides.sort(this.compareByDateInverse);
        break;
      case SORT_BY_ORIGIN:
        sortedRides = rides.sort(this.compareByOrigin);
        break;
      case SORT_BY_ORIGIN_INVERSE:
        sortedRides = rides.sort(this.compareByOriginInverse);
        break;
      case SORT_BY_DESTINATION:
        sortedRides = rides.sort(this.compareByDestination);
        break;
      case SORT_BY_DESTINATION_INVERSE:
        sortedRides = rides.sort(this.compareByDestinationInverse);
        break;
      case SORT_BY_PRICE:
        sortedRides = rides.sort(this.compareByPrice);
        break;
      case SORT_BY_PRICE_INVERSE:
        sortedRides = rides.sort(this.compareByPriceInverse);
        break;
      case SORT_BY_CAPACITY:
        sortedRides = rides.sort(this.compareByCapacity);
        break;
      case SORT_BY_CAPACITY_INVERSE:
        sortedRides = rides.sort(this.compareByCapacityInverse);
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
    if(this.state.originToggle == 1){
      this.sortRides(SORT_BY_ORIGIN_INVERSE);
      this.setState({originToggle:0});
    } else {
      this.sortRides(SORT_BY_ORIGIN);
      this.setState({originToggle:1});
    }
  }
  handleDestinationClick() {
    if(this.state.destinationToggle == 1){
      this.sortRides(SORT_BY_DESTINATION_INVERSE);
      this.setState({destinationToggle:0});
    } else {
      this.sortRides(SORT_BY_DESTINATION);
      this.setState({destinationToggle:1});
    }
  }
  handleDateClick() {
    if(this.state.dateToggle == 1){
      this.sortRides(SORT_BY_DATE_INVERSE);
      this.setState({dateToggle:0});
    } else {
      this.sortRides(SORT_BY_DATE);
      this.setState({dateToggle:1});
    }
  }
  handlePriceClick() {
    if(this.state.priceToggle == 1){
      this.sortRides(SORT_BY_PRICE_INVERSE)
      this.setState({priceToggle:0});
    } else {
      this.sortRides(SORT_BY_PRICE);
      this.setState({priceToggle:1});
    }
  }
  handleCapacityClick() {
    if(this.state.capacityToggle == 1){
      this.sortRides(SORT_BY_CAPACITY_INVERSE);
      this.setState({capacityToggle:0});
    } else {
      this.sortRides(SORT_BY_CAPACITY);
      this.setState({capacityToggle:1});
    }
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
              <thead>
                <tr>
                  <th className="table-col-title"><h4>Name</h4></th>
                  <th className="table-col-title ride_index_heading orig-head" onClick={this.handleOriginClick}><h4><span><i className="fa fa-location-arrow i-sort"></i></span> Origin</h4></th>
                  <th className="table-col-title ride_index_heading dest-head" onClick={this.handleDestinationClick}><h4><span><i className="fa fa-map-pin i-sort"></i></span> Dest.</h4></th>
                  <th className="table-col-title ride_index_heading date-head active" onClick={this.handleDateClick}><h4><span><i className="fa fa-clock i-sort"></i></span> Date</h4></th>
                  <th className="table-col-title ride_index_heading cap-head" onClick={this.handleCapacityClick}><h4><span className="i-span"><i className="fas fa-users i-sort"></i></span> Seats</h4></th>
                  <th className="table-col-title ride_index_heading price-head" onClick={this.handlePriceClick}><h4><span><i className="fa fa-dollar-sign i-sort"></i></span> Price</h4></th>
                </tr>
              </thead>
              <tbody>
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
