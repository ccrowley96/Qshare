import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRide, deleteRide } from '../actions';

class RidesShow extends Component {

  componentDidMount() {
    const id  = this.props.match.params.id;
    this.props.fetchRide(id);
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
      return (<div>Loading...</div>);
    }
    return (
      <div>
          <div className="text-xs-right">
            <Link to="/" className="btn btn-primary">Home</Link>
          </div>
        <h3>{ride.name}</h3>
        <h5>Price: {ride.price}</h5>
        <h5>Capacity: {ride.capacity}</h5>
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
