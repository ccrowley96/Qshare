import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {isMobile} from 'react-device-detect';
import { fetchRide, deleteRide } from '../actions';
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
    const id  = this.props.match.params.id;

    this.props.fetchRide(id).then(()=>{
      this.updateRideFlag();
    });

    this.renderHeader = this.renderHeader.bind(this);
    this.updateRideFlag = this.updateRideFlag.bind(this);
  }

  updateRideFlag() {
    this.setState({rideFetched: true});
  }

  onDeleteClick() {
    const id  = this.props.match.params.id;
    this.props.deleteRide(id, () =>{
      this.props.history.push('/');
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
        <button className="my-edit-button btn btn-success pull-xs-left" onClick={this.onEditClick.bind(this)}>
          Edit Ride
        </button>
      );
    }
    return (<div></div>);
  }

  renderFBLink() {
    const uid  = this.props.ride.uid;
    if (this.props.userInfo.uid !== uid) {
      return (
        <button className="my-fblink-button btn btn-primary pull-xs-left" onClick={this.onfblinkClick.bind(this)}>
          Facebook Profile
        </button>
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
      return (
        <div>
        <h5>Loading...</h5>
        </div>
      );
    }
    const profilePicUrl = `http://graph.facebook.com/${this.props.ride.uid}/picture?type=large`;
    const readableDate = moment(ride.date).format('dddd, MMMM Do');
    //<img className="ride-profile-picture" src={ride.profile_picture} />
    //http://graph.facebook.com/[ID]/picture?type=large
    //http://graph.facebook.com/${ride.uid}/picture?type=large}
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

export default connect(mapStateToProps, {fetchRide, deleteRide})(RidesShow);
