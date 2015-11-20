import React from 'react';
import Map from './Map.js';
import { Link } from 'react-router';

export default class App extends React.Component {
  
  render() {
    return <div>
      <h1>Oso</h1>
      - <Link to='/'>Home</Link> -
      - <Link to='/data/explore'>Data Explorer</Link> -
      - <Link to='/data/create'>Data Creator</Link> -
      
      {
        this.props.children || <Map />
      }
      
    </div>;
  }
}
