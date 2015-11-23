import React from 'react';
import Map from './Map.js';
import { Link } from 'react-router';
import LoadingBar from './LoadingBar';
import { connect } from 'react-redux';

class App extends React.Component {
  
  render() {
    return <div>
      <LoadingBar records={this.props.records} />
      <div>
        <strong>Oso</strong> -
      - <Link to='/'>Home</Link> -
      - <Link to='/data/explore'>Explore</Link> -
      - <Link to='/data/create'>Create</Link> -
      </div>
      
      {
        this.props.children || <Map />
      }
      
    </div>;
  }
}

export default connect(s => ({ records: s.records }))(App);
