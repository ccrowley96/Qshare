import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDom from 'react-dom';
import FacebookLogin from 'react-facebook-login';
import { fb_status_change } from '../../actions';

class FB_Login extends React.Component {

  constructor(props) {
    super(props);
    this.checkLoginState = this.checkLoginState.bind(this);
    this.state = {
      fb_button_text: "Login with facebook"
    };
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
              appId: '152331278836309',
              cookie: true,  // enable cookies to allow the server to access the session
              xfbml: true,  // parse social plugins on this page
              version: 'v2.8' // use graph api version 2.8
            });
        };
    }

    facebookLogin = () => {
      if (this.props.loggedIn) {
        this.setState({fb_button_text: "Login with facebook"});
        FB.logout(function(response) {
          this.statusChangeCallback(response);
        }.bind(this));
      }
      else {
        this.setState({fb_button_text: "Logout"});
        window.FB.login(
           function(response) {
              this.statusChangeCallback(response);
           }.bind(this), { scope: 'email,public_profile' }
        );
      }

    }

  // This is called with the results from from FB.getLoginStatus().
  statusChangeCallback(response) {
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      this.props.fb_status_change(true);
      // Logged into your app and Facebook.
      this.testAPI();
    } else {
      this.props.fb_status_change(false, ()=> {
        this.props.history.push("/");
      });
      // The person is not logged into your app or we are unable to tell.
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  checkLoginState() {
    window.FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    }.bind(this));
  }

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  testAPI() {
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
    });
  }

  render() {
    return (
      <div>
        <button className="btn btn-primary" onClick={this.facebookLogin.bind(this)}>
          {this.state.fb_button_text}
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { loggedIn: state.loggedIn };
}

export default connect(mapStateToProps, { fb_status_change })(FB_Login); // MAP state to props stuff
