import React, {Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom'; //Substitute for <a> tag
import _ from 'lodash';
import moment from 'moment';
import { fetchRides } from '../actions';
import FB_Login from './FacebookLogin/FacebookLogin';
import RideTable from './ride_table';
import ReactRideTable from './react_ride_table';
import {isMobile} from 'react-device-detect';

class RidesIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myRidesFetched: false
    };
    this.updateRideFlag = this.updateRideFlag.bind(this);
    this.renderRidesTableWhenReady = this.renderRidesTableWhenReady.bind(this);
    this.refreshRides = this.refreshRides.bind(this);
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

  refreshRides() {
    let refreshBtn = document.querySelector('.refresh-btn');
    refreshBtn.style.display = "none";
    this.setState({myRidesFetched: false});
    this.props.fetchRides()
      .then(() => {
        this.updateRideFlag();
        this.renderRidesTableWhenReady();
        if (refreshBtn.style.display === "none") {
            refreshBtn.style.display = "block";
        } else {
            refreshBtn.style.display = "none";
        }
      });
  }

  renderRidesTableWhenReady() {
    if (this.state.myRidesFetched) {
      return (
        <ReactRideTable rides={this.props.rides} />
      );
    }
    return (<div><h5>Loading Rides...</h5></div>);
  }

  renderLogo(){
    if(!isMobile){
      return(
        <img src="src/img/QShare_Logo_Black.svg" className="QShareLogo"/>
      );
    }
    return(
      <div></div>
    )
  }

  //Render Rideindex page --> table, title, button
  render() {
    return (
      <div className="index-wrap">
      {this.renderLogo()}
      <div className="index-buttons-wrap row">
          <div className="btn-toolbar user-buttons">
              <Link className="btn btn-info" to="/profile">
                Profile
              </Link>
              <Link className="btn btn-success" to="/post-ride">
                Post a Ride
              </Link>
              <Link className="btn btn-warning" to="/contact">
                Contact Us
              </Link>
          </div>
      </div>
        {this.renderRidesTableWhenReady()}
        <button className="refresh-btn btn btn-success" onClick={this.refreshRides}>Refresh Rides <span>  <i className="fas fa-sync-alt"/></span></button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { rides: state.rides };
}

export default withRouter(connect(mapStateToProps, { fetchRides })(RidesIndex));
