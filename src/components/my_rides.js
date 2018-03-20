import React, {Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom'; //Substitute for <a> tag
import { withRouter } from 'react-router-dom'
import _ from 'lodash';
import moment from 'moment';
import { fetchRidesBy_UID } from '../actions';
import { capFirst } from '../utils/string_manipulation';

const SORT_BY_DATE = 'sort_by_date';

class MyRideTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortedRides: this.props.userRides
    };
    this.sortRides = this.sortRides.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
  }

  componentDidMount() {
    this.sortRides(SORT_BY_DATE);
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
  // Sort Rides by switch case param
  sortRides(sortBy) {
    const rides = this.props.userRides;
    let sortedRides = [];
    // Sort by param passed to function
    switch (sortBy) {
      case SORT_BY_DATE:
        sortedRides = rides.sort(this.compareByDate);
        break;
      default:
        sortedRides = rides.sort(this.compareByDate);
    }
    //Update state to reflect sorted rides and re-render
    this.setState({sortedRides});
  }

  handleRowClick(rideID) {
     this.props.history.push(`/rides/${rideID}`);
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
          <tr className="table-group-item ride-row" key={ride._id} onClick={()=> this.handleRowClick(ride._id)}>
              <td>
                <p>{capFirst(ride.origin)}</p>
              </td>
              <td>
                <p>{capFirst(ride.destination)}</p>
              </td>
              <td>
                <p>{readableDate}</p>
              </td>
          </tr>
      );
    });
  }
  //Render Rideindex page --> table, title, button
  render() {
    if(!this.props.userRides || this.props.userRides.length == 0){
      return(
        <div className="col-md-12 col-lg-6 profile-ride-table">
        <h4>No Rides Posted!</h4>
        </div>
      );
    }
    return (
      <div className="col-md-12 col-lg-6 profile-ride-table">
          <h4> Rides Posted  <span className="i-span"><i className="fas fa-car"></i></span></h4>
          <div className="ride-table-container">
            <table className="table ride-table">
              <tbody>
                <tr>
                  <th className="table-col-title orig-head"><h4>Origin</h4></th>
                  <th className="table-col-title dest-head"><h4>Destination</h4></th>
                  <th className="table-col-title date-head"><h4><span><i className="fa fa-sort-up"></i></span> Date</h4></th>
                </tr>
                  {this.renderRides()}
              </tbody>
            </table>
          </div>
      </div>
    );
  }
}

export default withRouter(MyRideTable); // MAP state to props stuff
