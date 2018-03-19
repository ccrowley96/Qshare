import React from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
import "moment-timezone";
import DatePicker from 'react-datepicker';
import '../../style/react-datepicker.css';

moment.tz.setDefault("America/New_York");

export default class renderDatePicker extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      onChange: PropTypes.func,
      value: PropTypes.string
    }).isRequired,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string
    }).isRequired,
    inputValueFormat: PropTypes.string
  };

  static defaultProps = {
    inputValueFormat: null
  };

  state = {
    selectedDate: null
  };

  componentWillMount() {
    if (this.props.input.value) {
      this.setState({
        selectedDate: moment(this.props.input.value, this.props.inputValueFormat)
      });
    }
  }

  handleChange = (date) => {
    var d = moment(date);
    this.setState({
      selectedDate: d
    });

    this.props.input.onChange(d);
  }

  render() {

    const {
      meta: { touched, error },
      ...rest
    } = this.props;

    const className = `date-picker form-group ${touched && error
      ? 'has-danger'
      : ''}`;

    return (
      <div className={className}>
      <label>{this.props.label}</label>
        <DatePicker
          className = "form-control"
          {...rest}
          showTimeSelect
          timeFormat="h:mm A"
          timeIntervals={30}
          dateFormat="LLL"
          timeCaption="time"
          selected={this.state.selectedDate}
          onChange={this.handleChange}
        />
        <div className="text-help">
            {
              touched ? error : ''
            }
        </div>
      </div>
    );
  }
}
