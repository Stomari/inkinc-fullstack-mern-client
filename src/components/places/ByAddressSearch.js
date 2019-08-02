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
      studioName: '',
      complement: '', 
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
  }

  handleScriptLoad() {
    // Declare Options For Autocomplete
    var options = {
      componentRestrictions: {country: 'br'},
      types: ['address']
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
    // Check if address is valid
    if (place) {
      // Set State
      const finalAddress = place.formatted_address + this.state.complement;
      const newOutput = [...this.state.output];
      const value = {
        id: place.place_id,
        name: this.state.studioName,
        address: finalAddress,
        lati: place.geometry.location.lat(),
        long: place.geometry.location.lng()
      }
      newOutput.push(value);
      this.setState(
        {
          query: place.formatted_address,
          newOutput: newOutput
        }
      );
    }
    console.log(this.state);
  }

  addPlace() {
    console.log(this.state);
    this.setState({
      query: '',
      complement: '',
      studioName: '',
      output: this.state.newOutput
    })
  }

  render() {
    return (
      <div>
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=AIzaSyC5lG_0f00dNMOelO1DPnp8ZwFMuPEnQTU&libraries=places`}
          onLoad={this.handleScriptLoad}
        />
        <input placeholder="Workplace name..." name="studioName"  value={this.state.studioName} onChange={(event) => this.handleUpdate(event)}
          style={{
            margin: '0 auto',
            width: 800,
          }}
        />
        <input id="autocomplete" placeholder="Workplace address..." name="query"  value={this.state.query} onChange={(event) => this.handleUpdate(event)}
          style={{
            margin: '0 auto',
            width: 800,
          }}
        />
        <input placeholder="Complement..." name="complement"  value={this.state.complement} onChange={(event) => this.handleUpdate(event)}
          style={{
            margin: '0 auto',
            width: 800,
          }}
        />
        <input type="hidden" name="workplace" value={this.state.output} />
        <button onClick={() => this.addPlace()}>+</button>
        {this.state.output.map((el, idx) => <p key={idx}><strong>{el.name}</strong> - {el.address}</p>)}
      </div>
    );
  }
}

export default ByPlaceSearch;