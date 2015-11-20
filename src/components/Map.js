import React from 'react';
import loadScript from '../client/loadScript';
import config from '../../config';

export default class Map   extends React.Component {
  
  
  componentDidMount() {
    
    loadScript('https://maps.googleapis.com/maps/api/js?key=' + config.googleMapsKey).then(
      this.displayMap, 
      () => console.log('Maps API script loading error')  
    );
    
  }
  
  displayMap() {
    console.log('displaying map')
    const map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 48.8612802, lng: 2.3522421},
      disableDefaultUI: true,
      zoom: 13
    });
  }
  
  render() {
    return <div>
      <h3>Map</h3>
      <div id="map" style={{height: '700'}}></div>
    </div>;
  }
}
