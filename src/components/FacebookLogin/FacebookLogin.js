import React, { Component } from 'react';
import ReactDom from 'react-dom';
import FacebookLogin from 'react-facebook-login';

class FBLogin extends React.Component {
  responseFacebook(response) {
    console.log(response);
  }

  render() {
    return (
      <FacebookLogin
        appId="152331278836309"
        autoLoad={true}
        fields="name,email,picture"
        scope="public_profile,user_friends"
        callback={this.responseFacebook}
        icon="fa-facebook"
      />
    );
  }
}

export default FBLogin;
