import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import FB_Login from './FacebookLogin/FacebookLogin';

export default class Login extends Component {
  render() {
    return (
      <div className="login-page-wrap">
        <div className="jumbotron">
          <div className="jumbo-content">
            <h3>Login to use Qshare!</h3>
            <p><i>Safe. Reliable. Eco-Friendly.</i></p>
            <p><i>Find your ride!</i></p>
            <Route component={FB_Login} />
          </div>
        </div>
      </div>
    );
  }
}
