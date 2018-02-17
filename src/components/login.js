import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import FB_Login from './FacebookLogin/FacebookLogin';

export default class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
        redirectToReferrer: false
    };
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleRedirect(){
    this.setState({ redirectToReferrer: true });
  }

  render() {

    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }

    return (
      <div className="login-page-wrap">
        <div className="jumbotron">
          <div className="jumbo-content">
            <h3>Login to use Qshare!</h3>
            <p><i>Safe. Reliable. Eco-Friendly.</i></p>
            <p><i>Find your ride!</i></p>
            <Route render={(props) => ( <FB_Login {...props} callback={this.handleRedirect} /> )} />
          </div>
        </div>
      </div>
    );
  }
}
