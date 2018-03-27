import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom'; //Substitute for <a> tag
import { connect } from 'react-redux';
import { createRide } from '../actions';
import  DatePicker from 'react-datepicker';
import moment from 'moment';
import renderDatePicker from './date_input.js';
import OriginField from './origin_field';
import DestinationField from './destination_field';
import {isMobile} from 'react-device-detect';

let RidesNewThis;

class RidesNew extends Component {

  constructor(props) {
    super(props);
    this.attachUID = this.attachUID.bind(this);
    this.attachName = this.attachName.bind(this);
    this.state ={
      originOK:false,
      destinationOK:false
    }
    RidesNewThis = this;
    this.checkOriginValidity = this.checkOriginValidity.bind(this);
    this.checkDestinationValidity = this.checkDestinationValidity.bind(this);
  }

  renderInputField(field) {
    //field.meta.error automatically added to field object in validate
    // Must take field as arg to wire field to event handlers
    let customClass = '';
    if (field.customClass) {
       customClass = field.customClass;
    }
    const className = `form-group
    ${field.meta.touched && field.meta.error ? 'has-danger' : ''} ${customClass}`;

    return (
      <div className = {className}>
        <label>{field.label}</label>
        <input
          placeholder={field.placeholder}
          className = "form-control input-field"
          type = {field.type}
          step = {field.step ? field.step : ""}
          {...field.input}
        />
        <div className="text-help">
          {
            field.meta.touched
            ? field.meta.error
            : ''
          }
          <span id='hidden-height-buffer'>XXX</span>
        </div>
      </div>
    );
  }

  renderTextAreaField(field) {
    //field.meta.error automatically added to field object in validate
    // Must take field as arg to wire field to event handlers
    let customClass = '';
    if (field.customClass) {
       customClass = field.customClass;
    }
    const className = `form-group
    ${field.meta.touched && field.meta.error ? 'has-danger' : ''} ${customClass}`;

    return (
      <div className = {className}>
        <label>{field.label}</label>
        <textarea
          placeholder={field.placeholder}
          className = "form-control"
          type = {field.type}
          {...field.input}
        />
        <div className="text-help">
          {
            field.meta.touched
            ? field.meta.error
            : ''
          }
          <span id='hidden-height-buffer'>XXX</span>
        </div>
      </div>
    );
  }

  attachUID(field) {
    return (
      <div className="form-group">
          <label>{field.label}</label>
          <input
            {...field.input}
            placeholder={field.placeholder}
            className = "form-control uid-field"
            tabIndex = "-1"
            readOnly = "true"
            value={this.props.userInfo.uid}
            type = {field.type}
          />
          <div>
          <span id='hidden-height-buffer'>XXX</span>
          </div>
      </div>
    );
  }

  attachName(field) {
    return (
      <div className="form-group">
          <label>{field.label}</label>
          <input
            {...field.input}
            placeholder={field.placeholder}
            className = "form-control uid-field"
            tabIndex = "-1"
            readOnly = "true"
            value={this.props.userInfo.full_name}
            type = {field.type}
          />
          <div>
          <span id='hidden-height-buffer'>XXX</span>
          </div>
      </div>
    );
  }


  onSubmit(values) {
    const uid = this.props.userInfo.uid;
    const link = this.props.userInfo.link;
    const name = this.props.userInfo.full_name;
    const profile_picture = this.props.userInfo.profile_pic.data.url;
    const email = this.props.userInfo.email;
    this.props.createRide(values, name, uid, link, profile_picture, email, () => {
      // Programmatic Redirect
      this.props.history.push('/index');
    });
  }

  checkOriginValidity = (originOK) => {
        this.setState({originOK});
  }
  checkDestinationValidity = (destinationOK) => {
        this.setState({destinationOK});
  }

  render() {
    if (!this.props.userInfo.loggedIn) {
      return (
        <div>
          <div className="text-xs-right">
            <Link className="btn btn-danger" to="/index">
              Cancel
            </Link>
          </div>
          <div className="form-login-message">
            <h2> Log in to post ride </h2>
          </div>
        </div>
      );
    }
    const { handleSubmit } = this.props;
    // Field handles redux action / reducer interaction & event handling
    let mobileDate = isMobile ? true : false;
    return (

      <div>
        <div className="text-xs-right">
          <Link className="btn btn-danger" to="/index">
            Cancel
          </Link>
        </div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-12 col-md-6">
                <Field
                    name="uid"
                    label="User ID"
                    type="text"
                    value={this.props.userInfo.uid}
                    component={this.attachUID}
                  />
              </div>
              <div className="col-xs-12 col-md-6">
                <Field
                    label="Name"
                    type="text"
                    name="name"
                    value={this.props.userInfo.full_name}
                    component={this.attachName}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-md-6">
                <Field
                    label="Price Per Seat (CAD) *"
                    type="number"
                    name="price"
                    step="5"
                    placeholder="How much $$$ are you charging?"
                    component={this.renderInputField}
                />
                <Field
                    label="Ride Capacity *"
                    type="number"
                    step="1"
                    name="capacity"
                    placeholder="How many seats are available?"
                    component={this.renderInputField}
                />
                <Field
                  label="Departure Date *"
                  name="date"
                  inputValueFormat="YYYY/MM/DD HH:mm A"
                  dateFormat="LLL"
                  dateFormatCalendar="MMMM"
                  placeholderText={moment().format('LLL')}
                  normalize={(value) => (value ? moment(value).format('YYYY/MM/DD HH:mm A') : null)}
                  minDate={moment()}
                  maxDate={moment().add(90, "days")}
                  component={renderDatePicker}
                  inline={mobileDate}
                />
                </div>
                <div className="col-xs-12 col-md-6">
                <Field
                 name="origin"
                 type="text"
                 label="Origin *"
                 placeholder="Where are you leaving from?"
                 checkValidity={this.checkOriginValidity}
                 component={OriginField}
                />
                <Field
                 name="destination"
                 type="text"
                 label="Destination *"
                 placeholder="Where are you heading?"
                 checkValidity={this.checkDestinationValidity}
                 component={DestinationField}
                />
                <Field
                    label="Description"
                    type="textarea"
                    name="description"
                    placeholder={`Enter ride details (optional) \n• Car description / Luggage space\n• Multiple drop-off points?\n• Aux or nah?
                    `}
                    customClass = "description"
                    component={this.renderTextAreaField}
                />
                </div>
              </div>
              <div className="row">
                <button type="submit" className="btn btn-success form-submit-button">Post Ride</button>
              </div>
            </div>
        </form>
      </div>
    );
  }
}

function validate(values) {
  //values contains all values entered into form
  const errors = {};

  //Validate inputs from 'values'
  if (values.price <= 0) {
    errors.price = "Enter positive price";
  }
  if (!values.price) {
    errors.price = "Enter price";
  }
  if(values.capacity <= 0){
    errors.capacity = "Enter positive capacity";
  }
  if (!values.capacity) {
    errors.capacity = "Enter ride capacity";
  }
  if (!values.origin || !RidesNewThis.state.originOK) {
    errors.origin = "Enter Origin";
  }
  if (!values.destination || !RidesNewThis.state.destinationOK) {
    errors.destination = "Enter Destination";
  }
  if (!values.date) {
    errors.date = "Enter Valid Date";
  }

  //If errors is empty, the form is fine to sumbit
  //If errors has *any* props, redux form assumes form is invalid
  return errors;
}

function mapStateToProps(state) {
  return { userInfo: state.fb_state };
}
//Allows redux form to communicate directly from this component to reducer state
//This adds additional props to component
export default reduxForm({
  validate, //validate: validate
  form: 'NewRidesForm'
})(
  connect(mapStateToProps, { createRide })(RidesNew)
);
