/*global google*/ // To disable any eslint 'google not defined' errors
import React, {Component} from 'react';
import Script from 'react-load-script';

class Map extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(user) {
    this.handleScriptLoad(user.artist);
  }

  handleScriptLoad(user) {
    this.bounds = new google.maps.LatLngBounds();
    
    const map = new window.google.maps.Map(document.getElementById('map'));
    
    // fit the map to the newly inclusive bounds
    map.fitBounds(this.bounds);
    this.listener = google.maps.event.addListener(map, "idle", function() { 
      if (map.getZoom() > 16) map.setZoom(16); 
      google.maps.event.removeListener(this.listener); 
    });
    
    
    this.marker = '';
    this.markers = [];
    
    this.infowindow = new google.maps.InfoWindow({
      maxWidth: 250
    });

    for (let i = 0; i < user.workplace.length; i++) {  
      this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(user.workplace[i].lati, user.workplace[i].long),
      map
    });

    this.bounds.extend(this.marker.position);

    this.markers.push(this.marker);
    
      google.maps.event.addListener(this.marker, 'click',() => {
        this.infowindow.setContent(`<div><strong>${user.workplace[i].name}</strong><br>${user.workplace[i].address}</div>`);
        this.infowindow.open(map, this.markers[i]);
      });
    }
  }

  render () {
    return (
      <div>
        <Script
            url={`https://maps.googleapis.com/maps/api/js?key=AIzaSyC5lG_0f00dNMOelO1DPnp8ZwFMuPEnQTU`}
            onLoad={(user) => this.handleScriptLoad(this.props.artist)}
            />
        <div style={{ width: '50%', height: 500 }} id="map" />
        <br />
        {
        this.props.artist.workplace.map((el, idx) => {
          return <p key={idx}><strong>{el.name}</strong> - {el.address}</p>
        })
        }
      </div>
    )
  }
}

export default Map;
