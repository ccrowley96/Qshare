import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDom from 'react-dom';
import FacebookLogin from 'react-facebook-login';
import { fb_status_change, fb_user_state } from '../../actions';

class FB_Login extends React.Component {

  constructor(props) {
    super(props);
    this.statusChangeCallback = this.statusChangeCallback.bind(this);
    this.facebookLogin = this.facebookLogin.bind(this);
  }

  componentDidMount() {
        // Load the SDK asynchronously
        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "https://connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        window.fbAsyncInit = function() {
            FB.init({
              appId: '1860846777499353',
              cookie: true,  // enable cookies to allow the server to access the session
              xfbml: true,  // parse social plugins on this page
              version: 'v2.8' // use graph api version 2.8
            });
        };
    }

    facebookLogin = () => {
        window.FB.login(
           function(response) {
              this.statusChangeCallback(response);
           }.bind(this),
           {
             scope: 'email, public_profile',
             return_scopes: true
           });
    }

  statusChangeCallback(response) {
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      //this.props.fb_status_change(true);
      let userObject = {};
      // Logged into your app and Facebook.
      FB.api('/me?fields=id,link,name,first_name,last_name,email,picture.width(800).height(800),cover.width(1200)', function(response) {
        userObject = {
          loggedIn: true,
          full_name: response.name,
          first_name: response.first_name,
          last_name: response.last_name,
          email: response.email,
          uid: response.id,
          cover: response.cover,
          profile_pic: response.picture,
          link:response.link
        };
        this.props.fb_user_state(userObject);
        this.props.callback();
      }.bind(this));
      //Console log login message
      FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
      });
    } else {
      // The person is not logged into your app or we are unable to tell.
      this.props.fb_user_state({loggedIn: false});
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <div className="login-button-wrap">
        <button className="btn btn-primary login-button" onClick={this.facebookLogin.bind(this)}>
          <div><span><i className="fab fa-facebook"/></span> Login with Facebook</div>
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { loggedIn: state.fb_state.loggedIn};
}

export default connect(mapStateToProps, { fb_user_state })(FB_Login); // MAP state to props stuff
