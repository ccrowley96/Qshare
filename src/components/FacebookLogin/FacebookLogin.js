import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDom from 'react-dom';
import {withRouter} from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import { fb_status_change, fb_user_state } from '../../actions';

class FB_Login extends React.Component {
    constructor(props){
      super(props);
      console.log(this.props);
      this.responseFacebook = this.responseFacebook.bind(this);
    }
    responseFacebook(response) {
      console.log(response);
      let userObject = {
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
        this.props.history.push("/");
    }

    render() {
      return (
        <div className="login-page-wrap">
        <FacebookLogin
          appId={process.env.FB_APP_ID}
          autoLoad={false}
          fields="id,link,name,first_name,last_name,email,picture.width(800).height(800),cover.width(1200)"
          scope="email,public_profile,user_friends"
          callback={this.responseFacebook}
          cookie="true"
          textButton=" Login with Facebook"
          cssClass="fb-login-button"
          icon="fab fa-facebook"
          render={renderProps => (
            <button onClick={renderProps.onClick}>This is my custom FB button</button>
          )}
        />
        </div>
      )
    }
  }

  function mapStateToProps(state) {
    return { loggedIn: state.fb_state.loggedIn};
  }

  export default withRouter(connect(mapStateToProps, { fb_user_state })(FB_Login)); // MAP state to props stuff
