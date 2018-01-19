import React, { Component } from 'react';
import RequestForm from './Request/Request';
import FBLogin from './FacebookLogin/FacebookLogin';
export default class App extends Component {
  render() {
    return (
      <div>
        <div>Queen&#39;s Rideshare!</div>
        <FBLogin/>
      </div>
    );
  }
}
