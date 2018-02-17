import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDom from 'react-dom';
import {withRouter} from 'react-router-dom';
import {isMobile} from 'react-device-detect';
import FacebookLogin from 'react-facebook-login';
import { fb_status_change, fb_user_state, loginTriggered } from '../../actions';

class FB_Login extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        btn_pressed: false,
        isOnMobile: false
      }
      this.responseFacebook = this.responseFacebook.bind(this);
      this.handlePress = this.handlePress.bind(this);
      this.handleFail = this.handleFail.bind(this);
      this.handleMobile = this.handleMobile.bind(this);
    }
    componentDidMount() {
      const fb_button = document.getElementsByClassName('fb-login-button');
      if(this.props.login_pressed){
        fb_button[0].style.visibility = "hidden";
      } else{
        fb_button[0].style.visibility = "visible";
      }
    }

    handlePress(){
      console.log('button pressed!');
      this.props.loginTriggered();
      console.log()
      this.setState({btn_pressed:true});
    }
    handleFail(){
      console.log('login failed!');
    }
    handleMobile(){
      console.log('is on mobile');
      this.setState({isOnMobile:true});
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
          this.props.fb_user_state(userObject, () => {
            this.props.history.push("/");
          });
    }

    checkMobile(){

    }

    render() {
      console.log("is this mobile: ",isMobile);
      return (
        <div className="login-page-wrap">
        <FacebookLogin
          appId={process.env.FB_APP_ID}
          autoLoad={true}
          fields="id,link,name,first_name,last_name,email,picture.width(800).height(800),cover.width(1200)"
          scope="email,public_profile,user_friends"
          callback={this.responseFacebook}
          cookie="True"
          onClick={this.handlePress}
          textButton={this.state.btn_pressed ? ' Logging In': " Login with Facebook"}
          cssClass="fb-login-button"
          icon="fab fa-facebook"
          redirectUri={process.env.FB_REDIRECT_URI}
          isDisabled={isMobile ? true: false}
        />
        </div>
      )
    }
  }

  function mapStateToProps(state) {
    return { loggedIn: state.fb_state.loggedIn};
  }

  export default withRouter(connect(mapStateToProps, { fb_user_state , loginTriggered})(FB_Login)); // MAP state to props stuff
