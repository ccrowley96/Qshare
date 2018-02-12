import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
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

    this.updateRideFlag = this.updateRideFlag.bind(this);
  }

  componentDidMount() {

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
    if (this.props.userInfo.uid === uid) {
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
    if (this.props.userInfo.uid === uid) {
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
    const readableDate = moment(ride.date).format('dddd, MMMM Do');

    if(this.state.editOn){
      return (
        <RidesUpdate action={this.resetEditFlag} initialValues={ride} rideID={this.props.match.params.id} oldRide={ride} />
      );
    } else {
      return (
        <div>
            <div className="text-xs-right">
              <Link to="/" className="btn btn-primary">Home</Link>
            </div>
          <h3>{capFirst(ride.name)}</h3>
          <h5><b>User ID:</b> {ride.uid}</h5>
          <h5><b>Price:</b> ${ride.price}</h5>
          <h5><b>Capacity:</b> {ride.capacity} seats</h5>
          <h5><b>Origin:</b> {capFirst(ride.origin)}</h5>
          <h5><b>Destination:</b> {capFirst(ride.destination)}</h5>
          <h5><b>Date:</b> {readableDate}</h5>
          <h5><b>Description:</b></h5><p> {ride.description}</p>
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
