import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Profile extends Component {


  renderUser() {
    if (!this.props.userInfo.loggedIn) {
      return (
        <div className="profile-login-message">
          <h2> Log in to view profile </h2>
        </div>
      );
    }
    const { uid, loggedIn, name, first_name, last_name, email, about_me } = this.props.userInfo;
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
            <h2>Hey {first_name}!</h2>
            <h5>Here's your unique rideshare ID: {uid},</h5>
            <h5>& account email: {email}</h5>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="btn-toolbar user-buttons">
              <Link className="btn btn-info" to="/">
                Home
              </Link>
              <Link className="btn btn-success" to="/post-ride">
                Post a Ride
              </Link>
          </div>
        </div>
        {this.renderUser()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { userInfo: state.fb_state};
}

export default connect(mapStateToProps)(Profile);
