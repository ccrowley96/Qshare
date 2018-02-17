import React, {Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom'; //Substitute for <a> tag
import _ from 'lodash';
import moment from 'moment';
import { fetchRides } from '../actions';
import FB_Login from './FacebookLogin/FacebookLogin';
import RideTable from './ride_table';

class RidesIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myRidesFetched: false
    };
    this.updateRideFlag = this.updateRideFlag.bind(this);
    this.renderRidesTableWhenReady = this.renderRidesTableWhenReady.bind(this);
  }

  componentDidMount() {
    this.props.fetchRides()
      .then(() => {
        this.updateRideFlag();
      });
  }

  //Ride flag Helper
  updateRideFlag() {
    this.setState({myRidesFetched: true});
  }

  renderRidesTableWhenReady() {
    if (this.state.myRidesFetched) {
      return (
        <RideTable rides={this.props.rides}/>
      );
    }
    return (<div> Loading all rides... </div>);
  }

  //Render Rideindex page --> table, title, button
  render() {
    return (
      <div className="index-wrap">
      <img src="src/img/QShare_Logo_Black.svg" className="QShareLogo"/>
      <div className="index-buttons-wrap row">
          <div className="btn-toolbar user-buttons">
              <Link className="btn btn-info" to="/profile">
                Profile
              </Link>
              <Link className="btn btn-success" to="/post-ride">
                Post a Ride
              </Link>
          </div>
      </div>
        {this.renderRidesTableWhenReady()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { rides: state.rides };
}

export default connect(mapStateToProps, { fetchRides })(RidesIndex);
