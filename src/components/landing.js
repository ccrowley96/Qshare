import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom'; //Substitute for <a> tag

export default class Login extends Component {
  constructor(props){
    super(props);
  }

  render(){
    let centerStyle = {
      textAlign:"center"
    }
    return (
      <div className="landing-page">
        <div className="jumbotron" style={centerStyle}>
          <img src="src/img/QShare_Logo_Black.svg" className="LandingLogo"/>
        </div>

        <div className="row tag-lines">
          <div className="col-xs-12 col-sm-4">
              <h5>Safer</h5>
              <p>Both drivers and riders receive ratings, which helps everyone travel with a greater peace of mind.</p>
          </div>
          <div className="col-xs-12 col-sm-4">
              <h5>More Reliable</h5>
              <p>Filter rides by date and location. Riders don&#39;t have to sift through ride offers, and drivers can ensure that their posts don&#39;t get lost in cyberspace.</p>
          </div>
          <div className="col-xs-12 col-sm-4">
              <h5>Eco-Friendly</h5>
              <p>Carpooling means saving money, making new karaoke friends, and driving toward a cleaner planet.</p>
          </div>
        </div>
        <div className="root-buttons">
          <div className="col-xs-12 col-md-4 " style={centerStyle}>
            <Link className="continue-btn btn button_sliding_bg_blue" to="/contact">Contact Us<span>  <i className="fas fa-question-circle"/></span></Link>
          </div>
          <div className="col-xs-12 col-md-4" style={centerStyle}>
            <Link className="continue-btn btn button_sliding_bg_green" to="/index">Continue<span>  <i className="fas fa-car"/></span></Link>
          </div>
          <div className="col-xs-12 col-md-4" style={centerStyle}>
            <a className="continue-btn btn button_sliding_bg_orange" href="https://qshare.typeform.com/to/Fzb9e5">Feedback<span>  <i className="fas fa-comments"/></span></a>
          </div>
        </div>
      </div>
    );
  }
}
