import React, {Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; //Substitute for <a> tag
import _ from 'lodash';
import { fetchRides } from '../actions';

class RidesIndex extends Component {
  componentDidMount() {
    this.props.fetchRides();
  }

  renderRides() {
    const { rides } = this.props.rides;
    return _.map(rides, (ride) => {
      return (
          <tr className="table-group-item" key={ride._id}>
              <td>
                <Link to={`/rides/${ride._id}`}>
                  {ride.name}
                </Link>
              </td>
              <td>
                {ride.price}
              </td>
              <td>
                {ride.capacity}
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
              <th>Price</th>
              <th>Capacity</th>
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
