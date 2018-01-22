import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom'; //Substitute for <a> tag
import { connect } from 'react-redux';
import { createRide } from '../actions';
import  DatePicker from 'react-datepicker';
import moment from 'moment';
import renderDatePicker from './date_input.js';

//import 'react-datepicker/dist/react-datepicker-cssmodules.min.css';

class RidesNew extends Component {

  renderField(field) {
    //field.meta.error automatically added to field object in validate
    // Must take field as arg to wire field to event handlers

    const className = ` form-group ${field.meta.touched && field.meta.error
      ? 'has-danger'
      : ''}`;

    return (
      <div className = {className}>
        <label>{field.label}</label>
        <input
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
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createRide(values, () => {
      // Programmatic Redirect
      this.props.history.push('/');
    });
  }

//   renderDatePicker(field) {
//     const className = ` form-group ${field.meta.touched && field.meta.error
//       ? 'has-danger'
//       : ''}`;
//     return (
//       <div className={className}>
//           <label>{field.label}</label>
//
//           <DatePicker
//             selected={this.state.startDate}
//             onChange={this.handleChange}
//             showTimeSelect
//             timeFormat="HH:mm"
//
//           />
//           <div className="text-help">
//             {
//               field.meta.touched
//               ? field.meta.error
//               : ''
//             }
//           </div>
//       </div>
//     );
// }

  render() {
    const { handleSubmit } = this.props;
    // Field handles redux action / reducer interaction & event handling
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-danger" to="/">
            Cancel
          </Link>
        </div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
              label="Enter Name"
              type="text"
              name="name"
              component={this.renderField}
          />
          <Field
              label="Ride Price"
              type="number"
              name="price"
              component={this.renderField}
          />
          <Field
              label="Ride Capacity"
              type="number"
              name="capacity"
              component={this.renderField}
          />
          <Field
              label="Origin"
              type="text"
              name="origin"
              component={this.renderField}
          />
          <Field
              label="Destination"
              type="text"
              name="destination"
              component={this.renderField}
          />
          <Field
            name="date"
            inputValueFormat="YYYY-MM-DD"
            dateFormat="L"
            dateFormatCalendar="dddd"
            fixedHeight
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            normalize={(value) => (value ? moment(value).format('YYYY-MM-DD') : null)}
            component={renderDatePicker}
          />
          <Field
              label="Description"
              type="text"
              name="description"
              component={this.renderField}
          />
        <button type="submit" className="btn btn-success">Post</button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  //values contains all values entered into form
  const errors = {};

  //Validate inputs from 'values'
  if (!values.name) {
    errors.name = "Enter name";
  }
  if (!values.price) {
    errors.price = "Enter price";
  }
  if (!values.capacity) {
    errors.capacity = "Enter ride capacity";
  }
  if (!values.origin) {
    errors.origin = "Enter Origin";
  }
  if (!values.destination) {
    errors.destination = "Enter Destination";
  }
  if (!values.date) {
    errors.date = "Enter Valid Date";
  }

  //If errors is empty, the form is fine to sumbit
  //If errors has *any* props, redux form assumes form is invalid
  return errors;
}
//Allows redux form to communicate directly from this component to reducer state
//This adds additional props to component
export default reduxForm({
  validate, //validate: validate
  form: 'NewRidesForm'
})(
  connect(null, { createRide})(RidesNew)
);
