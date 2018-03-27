import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom'; //Substitute for <a> tag
import RedirectHome from '../utils/redirecting_home';

export default class RideNotFound extends Component {
  constructor(props){
    super(props);
  }

  render(){
    let centerStyle = {
      position:"relative",
      margin:"auto",
      left:"0px",
      right:"0px",
      width:"50vw"
    }
    return (
      <div style={centerStyle}>
        <img src="src/img/ride_not_found.svg"/>
        <RedirectHome message="Sorry, the ride you're looking for can't be found or has been deleted."/>
      </div>
    );
  }
}
