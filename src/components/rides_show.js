import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
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
    this.renderKick = this.renderKick.bind(this);
    this.onKickClick = this.onKickClick.bind(this);
    this.kickSubmit = this.kickSubmit.bind(this);
    this.leaveSubmit = this.leaveSubmit.bind(this);
    this.deleteSubmit = this.deleteSubmit.bind(this);

  }

  componentDidMount() {
    this.grabRide();
  }

  grabRide(callback) {
    this.setState({rideFetched: false});
    const id  = this.props.match.params.id;
    this.props.fetchRide(id, ()=> {
        this.updateRideFlag();
        if(callback){
          callback();
        }
    });
  }

  kickSubmit = (passengerID, passengerName) => {
      return function(){
      confirmAlert({
        title: 'Confirm kick',                        // Title dialog
        message: `Remove ${passengerName} from ride?`,               // Message dialog
        // childrenElement: () => <div>Custom UI</div>,       // Custom UI or Component
        confirmLabel: 'Confirm',                           // Text button confirm
        cancelLabel: 'Cancel',                             // Text button cancel
        onConfirm: () => {this.onKickClick(passengerID)},    // Action after Confirm
        onCancel: () => {},      // Action after Cancel
      })
    }.bind(this);
  };

  leaveSubmit = () => {
      return function(){
      confirmAlert({
        title: 'Confirm leave',                        // Title dialog
        message: `Are you sure you want to leave this ride?`,               // Message dialog
        // childrenElement: () => <div>Custom UI</div>,       // Custom UI or Component
        confirmLabel: 'Confirm',                           // Text button confirm
        cancelLabel: 'Cancel',                             // Text button cancel
        onConfirm: () => {this.onLeaveClick()},    // Action after Confirm
        onCancel: () => {},      // Action after Cancel
      })
    }.bind(this);
  };

  deleteSubmit = (passengerID, passengerName) => {
      return function(){
      confirmAlert({
        title: 'Confirm Delete',                        // Title dialog
        message: `Are you sure you want to delete this ride?`,               // Message dialog
        // childrenElement: () => <div>Custom UI</div>,       // Custom UI or Component
        confirmLabel: 'Confirm',                           // Text button confirm
        cancelLabel: 'Cancel',                             // Text button cancel
        onConfirm: () => {this.onDeleteClick()},    // Action after Confirm
        onCancel: () => {},      // Action after Cancel
      })
    }.bind(this);
  };

  forceUpdateHandler(){
    this.forceUpdate();
  };

  updateRideFlag() {
    this.setState({rideFetched: true});
  }

  onDeleteClick() {
    const id  = this.props.match.params.id;
    this.props.deleteRide(id, () =>{
      this.props.history.push('/index');
    });
  }
  onJoinClick() {
    this.refs.joinbtn.setAttribute("disabled", "disabled");
    const joinRequest = {
      uid : this.props.userInfo.uid,
      rideID: this.props.match.params.id,
      name: this.props.userInfo.full_name,
      link: this.props.userInfo.link
    }
    this.props.joinRide(joinRequest, () => {
        this.grabRide(()=>{this.refs.joinbtn.removeAttribute("disabled");});
    });
  }
  onLeaveClick() {
    this.refs.leavebtn.setAttribute("disabled", "disabled");
    const leaveRequest = {
      uid : this.props.userInfo.uid,
      rideID: this.props.match.params.id,
      name: this.props.userInfo.full_name
    }
    this.props.leaveRide(leaveRequest, () => {
        this.grabRide(()=>{this.refs.leavebtn.removeAttribute("disabled");});
    });
  }

  onKickClick(passengerID){
      this.refs.kickbtn.setAttribute("disabled", "disabled");
      const leaveRequest = {
        uid : passengerID,
        rideID: this.props.match.params.id
      }
      this.props.leaveRide(leaveRequest, () => {
          this.grabRide(()=>{this.refs.kickbtn.removeAttribute("disabled");});
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
    this.setState({editOn:false});
    this.grabRide();
  }

  renderDelete() {
    const uid  = this.props.ride.uid;
    if (this.props.userInfo.uid == uid || (this.props.userInfo.uid == '1400572109999748' && process.env.ADMIN_EDIT == 1)) {
      return (
        <div className="col-lg-3 col-sm-6 btn-xs-12">
          <button className="show-ride-button my-delete-button btn btn-danger" onClick={this.deleteSubmit()}>
            Delete Ride
          </button>
        </div>
      );
    }
    return (<div></div>);
  }

  renderEdit() {
    const uid  = this.props.ride.uid;
    if (this.props.userInfo.uid == uid || (this.props.userInfo.uid == '1400572109999748' && process.env.ADMIN_EDIT == 1)) {
      return (
        <div className="col-lg-3 col-sm-6 btn-xs-12">
          <button className="show-ride-button my-edit-button btn btn-warning" onClick={this.onEditClick.bind(this)}>
            Edit Ride
          </button>
        </div>
      );
    }
    return (<div></div>);
  }

  renderKick(passengerID,passengerName){
    const uid  = this.props.ride.uid;
    if(this.props.userInfo.uid == uid && !isMobile){
      return (
        <span ref="kickbtn" className="i-span-kick" onClick={this.kickSubmit(passengerID, passengerName)}><i className="fas fa-minus-circle"></i></span>
      );
    }
    return(<div></div>);
  }
  //this.onKickClick(passengerID)

  checkIfPassengerAlready() {
    let isPassenger = false;
    if(this.props.ride.passengers){
       _.map(this.props.ride.passengers, (passenger) => {
        if(this.props.userInfo.uid == passenger.uid) {
          isPassenger = true;
        }
      });
    }
    return isPassenger;
  }

  renderJoin() {
    let isAlreadyPassenger = this.checkIfPassengerAlready();
    const uid  = this.props.ride.uid;
    if(isAlreadyPassenger) {
      return (
        <div className="col-lg-3 col-sm-6 btn-xs-12">
          <button ref="leavebtn" className="show-ride-button my-leave-button btn btn-danger" onClick={this.leaveSubmit()}>
            Leave Ride
          </button>
        </div>
      );
    }
    //If this is not your ride or this is admin
    if ((this.props.userInfo.uid != uid || (this.props.userInfo.uid == '1400572109999748' && process.env.ADMIN_EDIT == 1)) && this.props.ride.capacity > 0) {
      return (
        <div className="col-lg-3 col-sm-6 btn-xs-12">
          <button ref="joinbtn" className="show-ride-button my-join-button btn btn-success" onClick={this.onJoinClick.bind(this)}>
            Join Ride
          </button>
        </div>
      );
    }
    return (<div></div>);
  }

  renderPassengers() {
    let passengers = this.props.ride.passengers;
    let passengerList = '';
    if(passengers.length > 0) {
      return (
        <ol className="passenger-list-ol">
          {_.map(passengers, (passenger) => {
            return (
              <li key={passenger.uid}>
              <span>
              <p onClick={()=>{window.location = passenger.fblink;}}>{passenger.name}</p>
              {this.renderKick(passenger.uid, passenger.name)}
              </span>
              </li>
            );
          })}
       </ol>
      );
    } else{
      return (<p>No Passengers</p>)
    }
  }

  renderFBLink() {
    const uid  = this.props.ride.uid;
    if (this.props.userInfo.uid !== uid) {
      return (
        <div className="col-lg-3 col-sm-6 btn-xs-12">
          <button className="show-ride-button my-fblink-button btn btn-primary" onClick={this.onfblinkClick.bind(this)}><span><i className="fab fa-facebook"/></span> Facebook Profile</button>
        </div>
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
    if(this.props.rideNotFound){
      this.props.history.push('/index');
    }
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
              <Link to="/index" className="btn btn-primary">Home</Link>
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
          <div className="ride-button-wrap container-fluid">
            <div className="row">
              {this.renderDelete()}
              {this.renderEdit()}
              {this.renderFBLink()}
              {this.renderJoin()}
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
     ride: state.rides[ownProps.match.params.id],
     userInfo: state.fb_state,
     rideNotFound: state.rides.RIDE_NOT_FOUND
  };
}

export default connect(mapStateToProps, {fetchRide, deleteRide, joinRide, leaveRide})(RidesShow);
