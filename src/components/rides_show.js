import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import {isMobile} from 'react-device-detect';
import { fetchRide, deleteRide, joinRide, leaveRide} from '../actions';
import RidesUpdate from './ride_update'
import { capFirst } from '../utils/string_manipulation';

class RidesShow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editOn : false,
      rideFetched: false
    };
    this.resetEditFlag = this.resetEditFlag.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.updateRideFlag = this.updateRideFlag.bind(this);
    this.checkIfPassengerAlready = this.checkIfPassengerAlready.bind(this);
    this.onLeaveClick = this.onLeaveClick.bind(this);
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    this.grabRide = this.grabRide.bind(this);
    this.renderPassengers = this.renderPassengers.bind(this);

  }

  componentDidMount() {
    this.grabRide();
  }

  grabRide() {
    this.setState({rideFetched: false});
    const id  = this.props.match.params.id;
    this.props.fetchRide(id, ()=> {
        this.updateRideFlag();
    });
  }

  forceUpdateHandler(){
    this.forceUpdate();
  };

  updateRideFlag() {
    this.setState({rideFetched: true});
  }

  onDeleteClick() {
    const id  = this.props.match.params.id;
    this.props.deleteRide(id, () =>{
      this.props.history.push('/');
    });
  }
  onJoinClick() {

    const joinRequest = {
      uid : this.props.userInfo.uid,
      rideID: this.props.match.params.id,
      name: this.props.userInfo.full_name
    }
    this.props.joinRide(joinRequest, () => {
        this.grabRide();
        console.log(this.props.ride.passengers);
    });
  }
  onLeaveClick() {
    const leaveRequest = {
      uid : this.props.userInfo.uid,
      rideID: this.props.match.params.id,
      name: this.props.userInfo.full_name
    }
    this.props.leaveRide(leaveRequest, () => {
        this.grabRide();
        console.log(this.props.ride.passengers);
    });
  }

  onEditClick() {
    this.setState({editOn:true});
  }
  onfblinkClick() {
    const link  = this.props.ride.link;
    window.location = link;
  }

  resetEditFlag(){
    const id  = this.props.match.params.id;
    this.setState({editOn:false, rideFetched:false });
    this.props.fetchRide(id).then(()=>{
      this.updateRideFlag();
    });
    this.forceUpdate();
  }

  renderDelete() {
    const uid  = this.props.ride.uid;
    if (this.props.userInfo.uid == uid || (this.props.userInfo.uid == '1400572109999748' && process.env.ADMIN_EDIT == 1)) {
      return (
        <button className="my-delete-button btn btn-danger pull-xs-left" onClick={this.onDeleteClick.bind(this)}>
          Delete Ride
        </button>
      );
    }
    return (<div></div>);
  }

  renderEdit() {
    const uid  = this.props.ride.uid;
    if (this.props.userInfo.uid == uid || (this.props.userInfo.uid == '1400572109999748' && process.env.ADMIN_EDIT == 1)) {
      return (
        <button className="my-edit-button btn btn-warning pull-xs-left" onClick={this.onEditClick.bind(this)}>
          Edit Ride
        </button>
      );
    }
    return (<div></div>);
  }

  checkIfPassengerAlready() {

    let isPassenger = false;
    if(this.props.ride.passengers){
       _.map(this.props.ride.passengers, (passenger) => {
        if(this.props.userInfo.uid == passenger.uid) {
          isPassenger = true;
        }
      });
    }
    console.log('Is already passenger', isPassenger);
    return isPassenger;
  }

  renderJoin() {
    let isAlreadyPassenger = this.checkIfPassengerAlready();
    const uid  = this.props.ride.uid;
    if(isAlreadyPassenger) {
      return (
        <button className="my-edit-button btn btn-danger pull-xs-right" onClick={this.onLeaveClick.bind(this)}>
          Leave Ride
        </button>
      );
    }
    //If this is not your ride or this is admin
    if (this.props.userInfo.uid != uid || (this.props.userInfo.uid == '1400572109999748' && process.env.ADMIN_EDIT == 1)) {
      return (
        <button className="my-edit-button btn btn-success pull-xs-right" onClick={this.onJoinClick.bind(this)}>
          Join Ride
        </button>
      );
    }
    return (<div></div>);
  }

  renderPassengers() {
    let passengers = this.props.ride.passengers;
    let passengerList = '';
    if(passengers.length > 0) {
      return (
        <ol>
          {_.map(passengers, (passenger) => {
          console.log(passenger);
          return (<li key={passenger.uid}><p>{passenger.name}</p></li>);
          })}
       </ol>
      );
      return (<p>{passengerList}</p>);
    } else{
      return (<p>No Passengers</p>)
    }
  }

  renderFBLink() {
    const uid  = this.props.ride.uid;
    if (this.props.userInfo.uid !== uid) {
      return (
        <button className="my-fblink-button btn btn-primary pull-xs-left" onClick={this.onfblinkClick.bind(this)}><span><i className="fab fa-facebook"/></span> Facebook Profile</button>
      );
    }
    return (<div></div>);
  }


  renderHeader() {
    if (!isMobile) {
      return (
        <div>
          <div className="col-xs-12 col-lg-3 col-sm-12 text-center">
            <img className="ride-profile-picture" src={this.props.ride.profile_picture} />
          </div>
          <div className="col-xs-12 col-lg-9 col-sm-12 locations-wrap">
            <span className="locations">{capFirst(this.props.ride.origin)} <span className="i-span-arrow"><i className="fas fa-long-arrow-alt-right"></i></span> {capFirst(this.props.ride.destination)}</span>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="col-xs-12 locations-wrap">
          <span className="locations">{capFirst(this.props.ride.origin)} <span className="i-span-arrow"><i className="fas fa-long-arrow-alt-right"></i></span> {capFirst(this.props.ride.destination)}</span>
        </div>
      </div>
    );
  }

  render() {
    const { ride } = this.props;
    if (!ride) {
      return (<div><h5>Loading...</h5></div>);
    }
    // Wait for successfull ride fetch
    if (!this.state.rideFetched) {
      return (<div><h5>Loading...</h5></div>);
    }

    const profilePicUrl = `http://graph.facebook.com/${this.props.ride.uid}/picture?type=large`;

    const readableDate = moment.utc(ride.date).format('dddd, MMMM Do');
    this.renderHeader();
    if(this.state.editOn){
      return (
        <RidesUpdate action={this.resetEditFlag} initialValues={ride} rideID={this.props.match.params.id} oldRide={ride} adminOn={this.state.adminOn} />
      );
    } else {
      return (
        <div className="ride-show-wrap">
            <div className="text-xs-right">
              <Link to="/" className="btn btn-primary">Home</Link>
            </div>
            <div className="container-fluid">
              <div className="row ride-header" id="header-bg">
                {this.renderHeader()}
              </div>
              <div className="row ride-show-table">
                <div className="col-lg-8 col-sm-12 col-xs-12">
                  <table className="table">
                    <tbody>
                      <tr className="table-group-item">
                        <td><h4><span className="i-span"><i className="fas fa-car"></i></span> Driver</h4></td>
                        <td><p>{capFirst(ride.name)}</p></td>
                      </tr>
                      <tr className="table-group-item">
                        <td><h4><span className="i-span"><i className="fas fa-calendar-alt"></i></span> Departure Date</h4></td>
                        <td><p>{readableDate}</p></td>
                      </tr>
                      <tr className="table-group-item">
                        <td><h4><span className="i-span"><i className="fas fa-dollar-sign"></i></span>  Price</h4></td>
                        <td><p>${ride.price}</p></td>
                      </tr>
                      <tr className="table-group-item">
                        <td><h4><span className="i-span"><i className="fas fa-users"></i></span> Capacity</h4></td>
                        <td><p><b>{ride.capacity}</b> seats remaining</p></td>
                      </tr>
                      <tr className="table-group-item passenger-list">
                        <td><h4><span className="i-span"><i className="fas fa-users"></i></span> Passengers</h4></td>
                        <td>{this.renderPassengers()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-lg-4 col-sm-12 col-xs-12">
                <table className="table">
                  <tbody>
                    <tr className="table-group-item description-row">
                      <td>
                        <h4><span className="i-span-desc"><i className="fas fa-info-circle"></i></span>Description:</h4>
                      </td>
                    </tr>
                    <tr className="table-group-item">
                      <td>
                        <p> {ride.description}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                </div>
              </div>
            </div>
          {this.renderDelete()}
          {this.renderEdit()}
          {this.renderFBLink()}
          {this.renderJoin()}
        </div>
      );
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
     ride: state.rides[ownProps.match.params.id],
     userInfo: state.fb_state
  };
}

export default connect(mapStateToProps, {fetchRide, deleteRide, joinRide, leaveRide})(RidesShow);
