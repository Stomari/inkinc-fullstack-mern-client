import React, { Component } from 'react';

//Import React Scrit Libraray to load Google object
import Script from 'react-load-script';
// import axios from 'axios';



class ByPlaceSearch extends Component {
  // Define Constructor
  constructor(props) {
    super(props);

    // Declare State
    this.state = {
      query: '',
      output: [],
      newOutput: [],
    };

    // Bind Functions
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);

  }

  handleUpdate(event) {
    const {name, value} = event.target;
    this.setState({
      [name]: value,
    })
    console.log('update')
  }

  handleScriptLoad() {
    // Declare Options For Autocomplete
    var options = {
      componentRestrictions: {country: 'br'},
      types: ['establishment']
    };
    
    // Initialize Google Autocomplete
    /*global google*/ // To disable any eslint 'google not defined' errors
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      options,
      );

      
    // Fire Event when a suggested name is selected
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }
  
  handlePlaceSelect() {
    // Extract City From Address Object
    let place = this.autocomplete.getPlace();
    // let address = addressObject.address_components;
    // Check if address is valid
    if (place) {
      // Set State
      const newOutput = [...this.state.output];
      const value = {
        id: place.place_id,
        name: place.name,
        address: place.formatted_address,
        lati: place.geometry.location.lat(),
        long: place.geometry.location.lng()
      }
      newOutput.push(value);
      this.setState(
        {
          query: place.name + ' ' + place.formatted_address,
          newOutput: newOutput
        }
      );
    }
  }

  addPlace(e) {
    e.preventDefault()
    this.setState({
      query: '',
      output: this.state.newOutput
    })
    const value = this.state.newOutput
    this.props.placeHandler(value)
  }

  render() {
    return (
      <div>
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=AIzaSyC5lG_0f00dNMOelO1DPnp8ZwFMuPEnQTU&libraries=places`}
          onLoad={this.handleScriptLoad}
        />
        <input id="autocomplete" placeholder="Find your workplace..." name="query"  value={this.state.query} onChange={(event) => this.handleUpdate(event)}
          style={{
            margin: '0 auto',
            width: 800,
          }}
        />
        <input type="hidden" name="workplace" value={this.state.output} />
        <button onClick={(e) => this.addPlace(e)}>+</button>
        {this.state.output.map((el, idx) => <p key={idx}><strong>{el.name}</strong> - {el.address}</p>)}
      </div>
    );
  }
}

export default ByPlaceSearch;