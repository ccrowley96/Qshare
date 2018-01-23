import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRide, deleteRide } from '../actions';
import moment from 'moment';

class RidesShow extends Component {

  componentDidMount() {
    const id  = this.props.match.params.id;
    this.props.fetchRide(id);
  }

  formatFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  onDeleteClick() {
    const id  = this.props.match.params.id;
    this.props.deleteRide(id, () =>{
      this.props.history.push('/');
    });
  }

  render() {
    const { ride } = this.props;
    if (!ride) {
      return (<div><h5>Loading...</h5></div>);
    }
    const readableDate = moment(ride.date).format('dddd, MMMM Do');
    return (
      <div>
          <div className="text-xs-right">
            <Link to="/" className="btn btn-primary">Home</Link>
          </div>
        <h3>{this.formatFirstLetter(ride.name)}</h3>
        <h5><b>Price:</b> ${ride.price}</h5>
        <h5><b>Capacity:</b> {ride.capacity} seats</h5>
        <h5><b>Origin:</b> {this.formatFirstLetter(ride.origin)}</h5>
        <h5><b>Destination:</b> {this.formatFirstLetter(ride.destination)}</h5>
        <h5><b>Date:</b> {readableDate}</h5>
        <h5><b>Description:</b></h5><p> {ride.description}</p>
          <button
            className="btn btn-danger pull-xs-left"
            onClick={this.onDeleteClick.bind(this)}
          >
            Delete Post
          </button>
      </div>
    );

  }
}

function mapStateToProps({rides}, ownProps) {
  return { ride: rides[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchRide, deleteRide})(RidesShow);
