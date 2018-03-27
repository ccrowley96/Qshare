import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

class DestinationField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: this.props.initialAddress ? this.props.initialAddress : '',
      label: 'Destination *',
      badInput: false,
      suggestionSelected: this.props.initialAddress ? true: false
    }
    this.onAddressChange = this.onAddressChange.bind(this);
    this.populateAddress = this.populateAddress.bind(this);
    this.dangerFlag = this.dangerFlag.bind(this);
    this.populateAddress = this.populateAddress.bind(this);
  }

  onAddressChange(address){
    this.setState({suggestionSelected:false});
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
    const input_wrapper = document.getElementsByClassName("places-wrapper-destination");
    const text_help = document.getElementsByClassName("places-text-help-destination");
    if(this.state.badInput || this.state.address.length == 0 || !this.state.suggestionSelected){
      this.props.checkValidity(false);
      if(!input_wrapper[0].classList.contains("has-danger")){
        input_wrapper[0].classList.add("has-danger");
        text_help[0].style.visibility = "visible";
      }
    } else{
      this.props.checkValidity(true);
      if(input_wrapper[0].classList.contains("has-danger")){
        input_wrapper[0].classList.remove("has-danger");
        text_help[0].style.visibility = "hidden";
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
    geocodeByAddress(this.state.address)
      .then(results => {
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
        //this.populateAddress();
      },
      type: 'search',
      placeholder: 'Where are you heading?'
    }

    const cssClasses = {
      input: 'form-control',
      autocompleteContainer: 'places-container-destination'
    }

    const renderFooter = () => (
      <div className="dropdown-footer" style={{backgroundColor:"white"}}>
        <div>
          <img id="powered-by-google" src='/src/img/google-logo.png' />
        </div>
      </div>
    )

    const options = {
      location: new google.maps.LatLng(44.2304708,-76.4948024),
      radius: 10000,
      types: ['address']
    }

    const handleEnter = (address) => {
      const { input } = this.props;
      const { onChange } = input;
      onChange(address);
      // geocodeByAddress(address)
      //   .then(results => {
      //     if(results.length > 1){throw('too many results')}
      //     fullAddress = results[0];
      //     getLatLng(results[0]);
      //     onChange(fullAddress);
      //   })
      //   .then(latLng => {
      //     this.setState({badInput:false});
      //   })
      //   .catch((err)=>{
      //     this.setState({badInput:true});
      //   });
        this.setState({ address });
    }

    const handleSelect = (address) => {
      const { input } = this.props;
      const { onChange } = input;
      onChange(address);
      // geocodeByAddress(address)
      //   .then(results => {
      //     if(results.length > 1){throw('too many results')}
      //     getLatLng(results[0]);
      //     onChange(address);
      //   })
      //   .then(latLng => {
      //     this.setState({badInput:false});
      //   })
      //   .catch((err)=>{
      //     this.setState({badInput:true});
      //   });
        this.setState({ address , suggestionSelected: true, badInput:false});
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
            onSelect={handleSelect}
            renderSuggestion={renderSuggestion}

          />
          <div className="text-help places-text-help-destination">Select Valid Destination From List</div>
      </div>
    )
  }
}

export default DestinationField
