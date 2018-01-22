import React, {Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; //Substitute for <a> tag
import _ from 'lodash';
import moment from 'moment';
import { fetchRides } from '../actions';

class RidesIndex extends Component {
  componentDidMount() {
    this.props.fetchRides();
  }

  formatFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  renderRides() {
    const { rides } = this.props.rides;
    let readableDate;
    return _.map(rides, (ride) => {
      readableDate =  moment(ride.date).format('ddd, MMM Do');
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
              <td>
                {ride.price}
              </td>
          </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/post-ride">
            Post a Ride
          </Link>
        </div>
      <h3> Rides </h3>
        <table className="table">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Date</th>
              <th>Price</th>
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
