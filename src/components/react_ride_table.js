import React, {Component } from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom'; //Substitute for <a> tag
import { withRouter } from 'react-router-dom';
import { capFirst } from '../utils/string_manipulation';
import moment from 'moment';
import 'react-table/react-table.css';

class ReactRideTable extends Component {
  constructor(props) {
    super(props);
    let rides = this.props.rides.rides;
    this.state = {
      rides
    }
  }

  formatDate(date){
    console.log('formatting date', date);
    return moment(date).format('ddd, MMM Do');
  }

  render() {

    const columns = [{
      Header: 'Name',
      accessor: 'name', // String-based value accessors!
      Cell: row => ( capFirst(row.value))
    },
    {
      Header: 'Origin',
      accessor: 'origin',
      Cell: row => ( capFirst(row.value))
    },
    {
      Header: 'Destination',
      accessor: 'destination',
      Cell: row => ( capFirst(row.value))
    },
    {
      id: 'date', // Required because our accessor is not a string
      Header: 'Date',
      accessor: d => d.date, // Custom value accessors!
      Cell: row => (
        moment(row.value).format('ddd, MMM Do')
      )
    },
    {
      id: 'seats', // Required because our accessor is not a string
      Header: 'Seats',
      accessor: d => d.capacity // Custom value accessors!
    },
    {
      id: 'price', // Required because our accessor is not a string
      Header: 'Price',
      accessor: d => d.price // Custom value accessors!
    }]
    return (
      <ReactTable
        data={this.state.rides}
        noDataText="No Active Rides!"
        columns={columns}
        defaultSorted={[
            {
              id: "date",
              desc: false
            }
          ]}
          defaultPageSize={6}
          className="-striped -highlight"
      />
    );
  }

}

export default withRouter(ReactRideTable);
