import React, { Component } from 'react';

//Import React Scrit Libraray to load Google object
import Script from 'react-load-script';
import axios from 'axios';

require('dotenv').config();


class ByPlaceSearch extends Component {
  // Define Constructor
  constructor(props) {
    super(props);

    // Declare State
    this.state = {
      query: '',
      output: '',
    };

    // Bind Functions
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);

  }

  handleUpdate(event) {
    const {value} = event.target;
    this.setState({
      query: value,
    })
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
      // console.log(place);
      this.setState(
        {
          query: place.name,
          output: {
            id: place.place_id,
            name: place.name,
            address: place.formatted_address,
            lati: place.geometry.location.lat(),
            long: place.geometry.location.lng()
          }
        }
      );
    }
  }

  sendForm(event) {
    event.preventDefault();
    const value = this.state.output;
    
    axios.post('http://localhost:8000/api/signup', {value})
      .then(response => console.log(response))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <form onSubmit={(event) => this.sendForm(event)}>
          <Script
            url={`https://maps.googleapis.com/maps/api/js?key=AIzaSyC5lG_0f00dNMOelO1DPnp8ZwFMuPEnQTU&libraries=places`}
            onLoad={this.handleScriptLoad}
          />
          <input id="autocomplete" placeholder="Find your workplace..." name="maps"  value={this.state.query} onChange={(event) => this.handleUpdate(event)}
            style={{
              margin: '0 auto',
              width: 800,
            }}
          />
          <input type="hidden" name="workplace" value={this.state.output} />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

export default ByPlaceSearch;