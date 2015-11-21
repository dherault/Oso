import React from 'react';
import Map from './Map.js';
import { Link } from 'react-router';
import LoadingBar from './LoadingBar';
import { connect } from 'react-redux';

class App extends React.Component {
  
  render() {
    return <div>
      <LoadingBar records={this.props.records} />
      <h1>Oso</h1>
        <Link to='/'>Home</Link> -
      - <Link to='/data/explore'>Data Explorer</Link> -
      - <Link to='/data/create'>Data Creator</Link> -
      
      {
        this.props.children || <Map />
      }
      
    </div>;
  }
}

const mapState = state => ({
  records: state.records
});

export default connect(mapState)(App);
