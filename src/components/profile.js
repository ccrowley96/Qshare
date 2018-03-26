import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRidesBy_UID, fetchRidesByPassengerID } from '../actions';
import MyRideTable from './my_rides';
import JoinedRideTable from './joined_rides';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      myRidesFetched: false
    };
    this.renderUserRidesWhenReady = this.renderUserRidesWhenReady.bind(this);
    this.renderPassengerRidesWhenReady = this.renderPassengerRidesWhenReady.bind(this);
  }

  componentDidMount() {
    this.props.fetchRidesBy_UID(this.props.userInfo.uid)
      .then(()=>{
        this.setState({ myRidesFetched: true });
      });
    this.props.fetchRidesByPassengerID(this.props.userInfo.uid);
  }

  renderUser() {
    if (!this.props.userInfo.loggedIn) {
      return (
        <div className="profile-login-message">
          <h2> Log in to view profile </h2>
        </div>
      );
    }
    const { uid, loggedIn, name, first_name, last_name, email, about_me } = this.props.userInfo;
    const { userRides } = this.props;
    const picture_url = this.props.userInfo.profile_pic.data.url;

    return (
      <div className="profile-container">
        <div className="row profile-picture-row">
          <div className="container-fluid">
            <img className="profile-picture" src={picture_url} />
          </div>
        </div>
        <div className="row welcome-row">
          <div className="container-fluid text-center">
            <h3>Hey {first_name} :)</h3>
          </div>
        </div>
      </div>
    );
  }

  renderUserRidesWhenReady() {
    if (this.props.userRides) {
      return (
        <MyRideTable userRides={this.props.userRides}/>
      );
    }
    return (<div><h5>Loading Posted Rides...</h5></div>);
  }

  renderPassengerRidesWhenReady() {
    if (this.props.passengerRides) {
      return (
        <JoinedRideTable userRides={this.props.passengerRides}/>
      );
    }
    return (<div><h5>Loading Joined Rides...</h5></div>);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="btn-toolbar user-buttons">
              <Link className="btn btn-info" to="/index">
                Home
              </Link>
              <Link className="btn btn-success" to="/post-ride">
                Post a Ride
              </Link>
          </div>
        </div>
        {this.renderUser()}
        <div className="row my-rides-container">
          {this.renderUserRidesWhenReady()}
          {this.renderPassengerRidesWhenReady()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.fb_state,
    userRides: state.rides.userRides,
    passengerRides: state.rides.passengerRides
  };
}

export default connect(mapStateToProps, { fetchRidesBy_UID, fetchRidesByPassengerID })(Profile);
