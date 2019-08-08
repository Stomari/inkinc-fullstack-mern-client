  import React, { Component, Fragment } from 'react';

  //Import React Scrit Libraray to load Google object

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
        document.getElementById('autocomplete-address'),
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
    }

    addPlace(event) {
      event.preventDefault()
      this.setState({
        query: '',
        complement: '',
        studioName: '',
        output: this.state.newOutput
      })
      const value = this.state.newOutput
      this.props.placeHandler(value)
    }

    render() {
      return (
        <Fragment>
          <div className="form-group"> 
            <input placeholder="Workplace name"  className="form-control" name="studioName"  value={this.state.studioName} onChange={(event) => this.handleUpdate(event)}/>
          </div>
          <div className="form-group"> 
          <input id="autocomplete-address" placeholder="Workplace address" className="form-control" name="query"  value={this.state.query} onChange={(event) => this.handleUpdate(event)}/>
          </div>
          <div className="form-group"> 
          <input placeholder="Complement" name="complement" className="form-control" value={this.state.complement} onChange={(event) => this.handleUpdate(event)}/>
          </div>
          <input type="hidden" name="workplace" value={this.state.output} onChange={event => this.props.submitPlace(event)} />

          <button className="btn btn-custom mt-0" onClick={(e) => this.addPlace(e)}>+</button>
          {this.state.output.map((el, idx) => <p key={idx}><strong>{el.name}</strong> - {el.address}</p>)}
        </Fragment>
      );
    }
  }

  export default ByPlaceSearch;