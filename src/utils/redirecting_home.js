import React, {Component } from 'react';
import { withRouter } from 'react-router-dom'

const RedirectHome = React.createClass({

  getInitialState: function() {
    return {
      counter: 5,
    };
  },
  tick: function() {
    if(this.state.counter <= 0){
      this.props.history.push("/index");
    } else {
      this.setState({counter: this.state.counter - 1});
    }
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    return (
      <div className="table_tips smooth-transition" style={{ textAlign: "center", marginTop:"10px" }}>
        <p>{this.props.message ? this.props.message : ''}</p>
        <p><i>Redirecting in: {[this.state.counter]}</i></p>
      </div>
    );
  }
});

export default withRouter(RedirectHome);
