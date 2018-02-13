import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import FB_Login from './FacebookLogin/FacebookLogin';

export default class Login extends Component {
  render() {
    return (
      <div className="login-page-wrap">
        <div className="jumbotron">
          <h3>Login to use Qshare!</h3>
          <h6><i>Safe. Reliable. Eco-Friendly.</i></h6>
          <Route component={FB_Login} />
        </div>
      </div>
    );
  }
}
