import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Profile extends Component {
  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link to="/" className="btn btn-primary">Home</Link>
        </div>
        <h3>Profile</h3>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { rides: state.rides};
}

export default connect(mapStateToProps)(Profile);
