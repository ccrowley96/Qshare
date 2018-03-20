import React, {Component } from 'react';

export const Tips = React.createClass({

  getInitialState: function() {
    return {
      counter: 0,
      text: ["Tip: click on any row in the ride table to view that ride!","Tip: name, origin, and destination entries can be searched!","Tip: click column heading to sort alphabetically, by time, or numerically!", "Tip: click column heading a second time to toggle inverted sort!", "Tip: hold shift when sorting to multi-sort!"]
    };
  },
  tick: function() {
    if(this.state.counter >= this.state.text.length - 1){
      this.setState({counter: 0});
    } else {
      this.setState({counter: this.state.counter + 1});
    }
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 10000);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    const mq = window.matchMedia("(max-width: 560px)");
    if(mq.matches){
      return(<div></div>);
    }
    return (
      <div className="table_tips smooth-transition" style={{ textAlign: "center", marginTop:"10px" }}>
        <p><i>{this.state.text[this.state.counter]}</i></p>
      </div>
    );
  }
});
