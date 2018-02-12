import React, {Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom'; //Substitute for <a> tag
import _ from 'lodash';
import moment from 'moment';
import FB_Login from './FacebookLogin/FacebookLogin';
import RideTable from './ride_table';

export default class RidesIndex extends Component {
  constructor(props) {
    super(props);
  }

  //Render Rideindex page --> table, title, button
  render() {
    return (
      <div>
      <Route component={FB_Login} />
        <div className="row">
          <div className="btn-toolbar user-buttons">
              <Link className="btn btn-info" to="/profile">
                Profile
              </Link>
              <Link className="btn btn-success" to="/post-ride">
                Post a Ride
              </Link>
          </div>
        </div>
        <RideTable />
      </div>
    );
  }
}
