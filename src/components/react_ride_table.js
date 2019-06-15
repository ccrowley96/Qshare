import React, {Component } from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom'; //Substitute for <a> tag
import { withRouter } from 'react-router-dom';
import { capFirst } from '../utils/string_manipulation';
import { Tips } from "../utils/utils";
import moment from 'moment';
import '../../style/react-table.css';

class ReactRideTable extends Component {
  constructor(props) {
    super(props);
    let rides = this.props.rides.rides;
    this.state = {
      rides
    }
  }

  formatDate(date){
    const mq = window.matchMedia("(min-width: 700px)");
    let readableDate;
    if (mq.matches) {
      readableDate =  moment(date).format('ddd, MMM Do');
    } else {
      readableDate =  moment(date).format('MM/DD/YY');
    }
    return readableDate;
  }

  makePlaceholderFilter(placeholder) {
    return ({filter, onFilterChange}) => (
      <input
        type='text'
        placeholder={placeholder}
        style={{
          width: '100%'
        }}
        value={filter ? filter.value : ''}
        onChange={(event) => onFilterChange(event.target.value)}
      />
    )
}

  render() {
    const columns = [{
      Header: 'Name',
      accessor: 'name', // String-based value accessors!
      Cell: row => ( <div>{capFirst(row.value)}</div>),
      Filter: ({filter, onChange}) => (
                <input
                       type='text'
                       className="ride-table-filter-text"
                       placeholder="Filter Name"
                       value={filter ? filter.value : ''}
                       onChange={event => onChange(event.target.value)}
                />
              )
    },
    {
      Header: 'Origin',
      accessor: 'origin',
      Cell: row => ( <div>{capFirst(row.value)}</div>),
      Filter: ({filter, onChange}) => (
                <input
                       type='text'
                       className="ride-table-filter-text"
                       placeholder="Filter Origin"
                       value={filter ? filter.value : ''}
                       onChange={event => onChange(event.target.value)}
                />
              )
    },
    {
      Header: 'Destination',
      accessor: 'destination',
      Cell: row => ( <div>{capFirst(row.value)}</div>),
      Filter: ({filter, onChange}) => (
                <input
                       type='text'
                       className="ride-table-filter-text"
                       placeholder="Filter Dest."
                       value={filter ? filter.value : ''}
                       onChange={event => onChange(event.target.value)}
                />
              )
    },
    {
      id: 'date', // Required because our accessor is not a string
      Header: 'Date',
      filterable: false,
      accessor: d => d.date, // Custom value accessors!
      Cell: row => (
        <div>
        {this.formatDate(row.value)}
        </div>
      )
    },
    {
      id: 'seats', // Required because our accessor is not a string
      Header: 'Seats',
      filterable: false,
      accessor: d => d.capacity, // Custom value accessors!
      width: 100,
      Cell: row => (
        <div style={{textAlign:"center"}}>{row.value}</div>
      )
    },
    {
      id: 'price', // Required because our accessor is not a string
      Header: 'Price',
      filterable: false,
      accessor: d => d.price, // Custom value accessors!
      width: 150,
      Cell: row => (
        <div style={{textAlign:"center"}}>${row.value}</div>
      )
    }]
    return (
      <div>
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
          filterable={true}
          defaultPageSize={6}
          pageSizeOptions={[5,6,7,8,9,10, 15]}
          className="-striped -highlight"
          getTrProps={(state, rowInfo, column, instance) => ({
            onClick: e => {
              this.props.history.push(`/rides/${rowInfo.original._id}`);
            }
          })}
          defaultFilterMethod = {(filter, row, column) => {
            const id = filter.pivotId || filter.id
            return row[id] !== undefined ? String(row[id]).toLowerCase().includes(filter.value.toLowerCase()) : true
          }}
        />
        <Tips />
      </div>
    );
  }

}

export default withRouter(ReactRideTable);
