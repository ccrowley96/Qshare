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
      <div className="row">
      <nav className="navbar navbar-light navbar-fixed-top">
        <div className="col-xs-4 col-sm-2 col-lg-2">
          <img className="img-responsive" src="src/img/QShare_Logo_Black.svg"/>
        </div>
        <div className="col-xs-4 col-sm-5 col-lg-1" style={centerStyle}>
          <Link className="btn btn-md" to="/contact">Contact Us</Link>
        </div>
        <div className="col-xs-4 col-sm-5 col-lg-1" style={centerStyle}>
          <a className="btn btn-md" href="https://qshare.typeform.com/to/Fzb9e5">Feedback</a>
        </div>
      </nav>
      </div>
      <br></br>
      <br></br>
        <div className="jumbotron" style={centerStyle}>
          <br></br>
          <br></br>
          <h1>A New Way for Students to Travel</h1>
          <p>From getting yourself home for the weekend, to catching a concert in Toronto. Qshare will get you there for the lowest fare.</p>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <img className="img-fluid" src="src/img/HeroImg.png"/>
          <br></br>
          <br></br>
          <p>Find where you will go this weekend</p>
          <Link className="continue-btn btn button_sliding_bg_green" to="/index">Continue<span>  <i className="fas fa-car"/></span></Link>
          <br></br>
          <br></br>

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
      </div>
    );
  }
}
