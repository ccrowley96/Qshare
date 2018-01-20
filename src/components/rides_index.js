import React, {Component } from 'react';
import { connect } from 'react-redux';
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
            {ride.name}
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
