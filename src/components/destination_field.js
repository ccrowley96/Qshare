import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

class DestinationField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      label: 'Destination',
      badInput: false
    }
    this.onAddressChange = this.onAddressChange.bind(this);
    this.populateAddress = this.populateAddress.bind(this);
    this.dangerFlag = this.dangerFlag.bind(this);
    this.populateAddress = this.populateAddress.bind(this);
  }

  onAddressChange(address){
    const { input } = this.props;
    const { onChange } = input;
    if(address.length == 0){
      this.setState({badInput:true});
    }
    this.setState({ address });
    geocodeByAddress(this.state.address)
      .then(results => {
        if(results.length > 1){throw('too many results')}
        getLatLng(results[0]);
        console.log(results[0]);
        onChange(address);
      })
      .then(latLng => {
        this.setState({badInput:false});
      })
      .catch((err)=>{
        this.setState({badInput:true});
      });
  }

  dangerFlag(){
    console.log(`bad input: ${this.state.badInput}`)
    const input_wrapper = document.getElementsByClassName("places-wrapper-destination");
    const text_help = document.getElementsByClassName("places-text-help-destination");
    if(this.state.badInput || this.state.address.length == 0){
      if(!input_wrapper[0].classList.contains("has-danger")){
        input_wrapper[0].classList.add("has-danger");
        text_help[0].style.display = "block";
      }
    } else{
      if(input_wrapper[0].classList.contains("has-danger")){
        input_wrapper[0].classList.remove("has-danger");
        text_help[0].style.display = "none";
      }
    }
  }

  componentDidUpdate(prevProps, prevState){
    this.dangerFlag();
  }

  onError(status, clearSuggestions){
    console.log('Google Maps API returned error with status: ', status);
    clearSuggestions();
  }

  populateAddress(){
    let tempThis = this;
    console.log('initial blur address: ', this.state.address);
    geocodeByAddress(this.state.address)
      .then(results => {
        console.log('populate blur result: ', results);
        if(results.length > 1){throw('too many results')}
        let fullAddress = results[0].formatted_address;
        this.setState({address:fullAddress});
        getLatLng(results[0]);
      })
      .then(latLng => {
        this.setState({badInput:false});
      })
      .catch((err)=>{
        console.log(err);
        this.setState({badInput:true});
      });
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onAddressChange,
      onBlur: () => {
        this.populateAddress();
      },
      type: 'search',
      placeholder: 'Where are you leaving from?'
    }

    const cssClasses = {
      input: 'form-control',
      autocompleteContainer: 'places-container-destination'
    }

    const options = {
      location: new google.maps.LatLng(-44.224997, -76.495099),
      radius: 100000,
      types: ['address']
    }

    const handleEnter = (address) => {
      const { input } = this.props;
      const { onChange } = input;
      let fullAddress;
      geocodeByAddress(address)
        .then(results => {
          if(results.length > 1){throw('too many results')}
          fullAddress = results[0];
          getLatLng(results[0]);
          onChange(fullAddress);
        })
        .then(latLng => {
          this.setState({badInput:false});
        })
        .catch((err)=>{
          this.setState({badInput:true});
        });
        this.setState({ fullAddress });
    }

    const handleSelect = (address) => {
      const { input } = this.props;
      const { onChange } = input;
      geocodeByAddress(address)
        .then(results => {
          if(results.length > 1){throw('too many results')}
          getLatLng(results[0]);
          onChange(address);
        })
        .then(latLng => {
          this.setState({badInput:false});
        })
        .catch((err)=>{
          this.setState({badInput:true});
        });
        this.setState({ address });
    }

    const renderSuggestion = ({ formattedSuggestion }) => (
    <div>
      <strong>{ formattedSuggestion.mainText }</strong>{' '}
      <small>{ formattedSuggestion.secondaryText }</small>
    </div>
  )

    return (
      <div className='places-wrapper-destination form-group'>
        <label>{this.state.label}</label>
          <PlacesAutocomplete
            inputProps={inputProps}
            onError={this.onError}
            classNames={cssClasses}
            highlightFirstSuggestion={true}
            onEnterKeyDown={this.populateAddress}
            onSelect={handleSelect}
            onEnter={handleEnter}
            renderSuggestion={renderSuggestion}
          />
          <div className="text-help places-text-help-destination">Enter Valid Destination</div>
      </div>
    )
  }
}

export default DestinationField
